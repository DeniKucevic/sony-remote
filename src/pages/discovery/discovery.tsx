import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFooter,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonNote,
  IonSpinner,
  IonButton,
} from "@ionic/react";
import {
  tvOutline,
  wifiOutline,
  searchOutline,
  stopCircleOutline,
  refreshOutline,
} from "ionicons/icons";
import { useEffect, useState, useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import {
  DiscoveredDevice,
  startDiscovery,
  runSubnetScan,
} from "../../services";

const TEARDOWN_DELAY_MS = 1200;
const WATCHDOG_INTERVAL = 3000;
const MAX_IDLE_TIME = 15000;

export const Discovery: React.FC = () => {
  const [devices, setDevices] = useState<DiscoveredDevice[]>([]);
  const [scanning, setScanning] = useState(false);
  const [subnetScanning, setSubnetScanning] = useState(false);

  const history = useHistory();

  const stopRef = useRef<(() => void) | null>(null);
  const scanningRef = useRef(false);
  const knownIpsRef = useRef(new Set<string>());

  const timerRef = useRef<number | null>(null);
  const watchdogRef = useRef<number | null>(null);

  const lastActivityRef = useRef(Date.now());
  const sessionIdRef = useRef(0);

  const clearTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (watchdogRef.current) clearInterval(watchdogRef.current);

    timerRef.current = null;
    watchdogRef.current = null;
  };

  // 🚀 INSTANT STOP (non-blocking)
  const stopScan = useCallback(() => {
    scanningRef.current = false;
    sessionIdRef.current++;

    clearTimers();
    setScanning(false);

    const stop = stopRef.current;
    stopRef.current = null;

    if (stop) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          try {
            stop();
          } catch (e) {
            console.warn("stopDiscovery failed", e);
          }
        }, 0);
      });
    }
  }, []);

  const addDevice = useCallback((device: DiscoveredDevice) => {
    if (!scanningRef.current) return;

    lastActivityRef.current = Date.now();

    if (knownIpsRef.current.has(device.ip)) return;

    knownIpsRef.current.add(device.ip);
    setDevices((prev) => [...prev, device]);
  }, []);

  const startScan = useCallback(() => {
    const sessionId = ++sessionIdRef.current;

    clearTimers();

    if (stopRef.current) {
      stopRef.current();
      stopRef.current = null;
    }

    scanningRef.current = true;
    setScanning(true);
    lastActivityRef.current = Date.now();

    timerRef.current = window.setTimeout(async () => {
      timerRef.current = null;

      if (!scanningRef.current || sessionId !== sessionIdRef.current) return;

      await new Promise(requestAnimationFrame);

      if (!scanningRef.current || sessionId !== sessionIdRef.current) return;

      stopRef.current = startDiscovery(addDevice);

      // 🧠 watchdog instead of aggressive restart loop
      watchdogRef.current = window.setInterval(() => {
        if (!scanningRef.current || sessionId !== sessionIdRef.current) return;

        const idle = Date.now() - lastActivityRef.current;

        if (idle > MAX_IDLE_TIME) {
          requestAnimationFrame(() => {
            setTimeout(() => {
              if (scanningRef.current) startScan();
            }, 0);
          });
        }
      }, WATCHDOG_INTERVAL);
    }, TEARDOWN_DELAY_MS);
  }, [addDevice]);

  useEffect(() => {
    startScan();
    return stopScan;
  }, []);

  const handleSelect = (device: DiscoveredDevice) => {
    stopScan();

    // ensure navigation is not blocked by anything
    requestAnimationFrame(() => {
      history.push(
        `/pairing/${device.ip}?name=${encodeURIComponent(device.name)}`,
      );
    });
  };

  const handleStop = () => {
    Haptics.impact({ style: ImpactStyle.Medium });
    stopScan();
  };

  const handleStart = () => {
    Haptics.impact({ style: ImpactStyle.Light });
    startScan();
  };

  const handleSubnetScan = async () => {
    setSubnetScanning(true);
    try {
      await runSubnetScan(addDevice);
    } finally {
      setSubnetScanning(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/devices" />
          </IonButtons>
          <IonTitle>Scan for TVs</IonTitle>

          {scanning && (
            <IonButtons slot="end">
              <IonSpinner name="dots" style={{ marginRight: "1rem" }} />
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {scanning && devices.length === 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: "1.5rem",
              opacity: 0.6,
            }}
          >
            <IonSpinner name="crescent" style={{ transform: "scale(2.5)" }} />
            <IonLabel>Scanning for devices…</IonLabel>
            <IonNote style={{ textAlign: "center", padding: "0 3rem" }}>
              Devices appear as they are found
            </IonNote>
          </div>
        )}

        {!scanning && devices.length === 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: "0.75rem",
              opacity: 0.5,
            }}
          >
            <IonIcon icon={wifiOutline} style={{ fontSize: "4rem" }} />
            <IonLabel>No devices found</IonLabel>
            <IonNote style={{ textAlign: "center", padding: "0 3rem" }}>
              Try a full network scan below
            </IonNote>
          </div>
        )}

        {devices.length > 0 && (
          <>
            <IonList>
              {devices.map((device) => (
                <IonItem
                  key={device.ip}
                  button
                  onClick={() => handleSelect(device)}
                >
                  <IonIcon slot="start" icon={tvOutline} />
                  <IonLabel>
                    <h2>{device.name}</h2>
                    <p>{device.ip}</p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>

            {scanning && (
              <div
                style={{
                  textAlign: "center",
                  padding: "1rem",
                  opacity: 0.45,
                  fontSize: "0.85rem",
                }}
              >
                <IonSpinner
                  name="dots"
                  style={{ verticalAlign: "middle", marginRight: "0.5rem" }}
                />
                Scanning for more devices…
              </div>
            )}
          </>
        )}
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <div style={{ padding: "0.5rem 1rem 0.25rem" }}>
            {scanning ? (
              <IonButton expand="block" color="danger" onClick={handleStop}>
                <IonIcon slot="start" icon={stopCircleOutline} />
                Stop scanning
              </IonButton>
            ) : (
              <IonButton expand="block" color="primary" onClick={handleStart}>
                <IonIcon slot="start" icon={refreshOutline} />
                Scan again
              </IonButton>
            )}
          </div>

          <div style={{ padding: "0.25rem 1rem 0.5rem" }}>
            <IonButton
              expand="block"
              fill="outline"
              onClick={handleSubnetScan}
              disabled={subnetScanning}
            >
              {subnetScanning ? (
                <>
                  <IonSpinner name="dots" style={{ marginRight: "0.5rem" }} />
                  Scanning network…
                </>
              ) : (
                <>
                  <IonIcon slot="start" icon={searchOutline} />
                  Scan entire network
                </>
              )}
            </IonButton>
          </div>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};
