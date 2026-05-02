import Axios from 'axios';
import { ZeroConf, ZeroConfService, ZeroConfWatchResult } from 'capacitor-zeroconf';
import { WifiIp } from 'capacitor-plugin-wifi-ip';

export type DiscoveredDevice = {
  name: string;
  hostname: string;
  ip: string;
  port: number;
};

const MDNS_TYPE = '_androidtvremote2._tcp.';
const DOMAIN = 'local.';

// ─── mDNS ────────────────────────────────────────────────────────────────────

export const startDiscovery = (
  onUpdate: (device: DiscoveredDevice) => void
): (() => void) => {
  ZeroConf.watch({ type: MDNS_TYPE, domain: DOMAIN }, (result: ZeroConfWatchResult) => {
    const svc: ZeroConfService = result.service;
    // Ignore 'removed' — ZeroConf.close() fires removed for every tracked service,
    // which would wipe the accumulated list on each rescan.
    if (result.action === 'resolved' && svc.ipv4Addresses[0]) {
      onUpdate({ name: svc.name, hostname: svc.hostname, ip: svc.ipv4Addresses[0], port: svc.port });
    }
  });
  return () => { ZeroConf.close(); };
};

// ─── Subnet scan (fallback) ──────────────────────────────────────────────────

export const runSubnetScan = async (
  onFound: (device: DiscoveredDevice) => void
): Promise<void> => {
  const { ip: deviceIp } = await WifiIp.getIP();
  const base = (deviceIp as string).split('.').slice(0, -1).join('.');

  const probes = Array.from({ length: 255 }, async (_, i) => {
    const ip = `${base}.${i + 1}`;
    return Axios.post(
      `http://${ip}/sony/system`,
      { method: 'getInterfaceInformation', id: 33, params: [], version: '1.0' },
      { timeout: 3000 }
    )
      .then((res) => {
        const name: string = res.data?.result?.[0]?.modelName ?? ip;
        onFound({ name, hostname: ip, ip, port: 80 });
      })
      .catch(() => {});
  });

  await Promise.all(probes);
};
