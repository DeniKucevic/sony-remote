import { ZeroConf } from 'capacitor-zeroconf';
import type { ZeroConfWatchResult, ZeroConfService } from 'capacitor-zeroconf';

export type DiscoveredDevice = {
  name: string;
  hostname: string;
  ip: string;
  port: number;
};

const MDNS_TYPE = '_androidtvremote2._tcp.';
const DOMAIN = 'local.';

// Returns a stop function that resolves once JmDNS is fully closed.
// Awaiting stop() before calling startDiscovery() again prevents races.
export const startDiscovery = (
  onUpdate: (device: DiscoveredDevice) => void
): (() => Promise<void>) => {
  let active = true;

  ZeroConf.watch({ type: MDNS_TYPE, domain: DOMAIN }, (result: ZeroConfWatchResult) => {
    if (!active) return;
    const svc: ZeroConfService = result.service;
    if (result.action !== 'removed' && svc.ipv4Addresses?.[0]) {
      onUpdate({
        name: svc.name,
        hostname: svc.hostname,
        ip: svc.ipv4Addresses[0],
        port: svc.port,
      });
    }
  }).catch(() => {});

  return async () => {
    active = false;
    try { await ZeroConf.unwatch({ type: MDNS_TYPE, domain: DOMAIN }); } catch {}
    try { await ZeroConf.close(); } catch {}
  };
};
