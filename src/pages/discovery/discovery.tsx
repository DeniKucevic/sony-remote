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
import { tvOutline, wifiOutline, refreshOutline, stopCircleOutline } from "ionicons/icons";
import { useEffect, useState, useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { DiscoveredDevice, startDiscovery } from "../../services";

const SCAN_DURATION_MS = 10000;

export const Discovery: React.FC = () => {
  const [devices, setDevices] = useState<DiscoveredDevice[]>([]);
  const [scanning, setScanning] = useState(false);

  const history = useHistory();

  const stopRef = useRef<(() => Promise<void>) | null>(null);
  const timerRef = useRef<number | null>(null);
  const knownIpsRef = useRef(new Set<string>());
  const scanningRef = useRef(false); // guard against concurrent startScan calls

  const addDevice = useCallback((device: DiscoveredDevice) => {
    if (knownIpsRef.current.has(device.ip)) return;
    knownIpsRef.current.add(device.ip);
    setDevices((prev) => [...prev, device]);
  }, []);

  const startScan = useCallback(async () => {
    if (scanningRef.current) return; // prevent overlapping restarts
    scanningRef.current = true;

    // Stop the running session first and wait for JmDNS to fully close
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
    if (stopRef.current) { await stopRef.current(); stopRef.current = null; }

    knownIpsRef.current.clear();
    setDevices([]);
    setScanning(true);

    stopRef.current = startDiscovery(addDevice);

    timerRef.current = window.setTimeout(() => {
      setScanning(false);
      timerRef.current = null;
    }, SCAN_DURATION_MS);

    scanningRef.current = false;
  }, [addDevice]);

  useEffect(() => {
    startScan();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      stopRef.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (device: DiscoveredDevice) => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
    setScanning(false);
    stopRef.current?.();
    stopRef.current = null;
    history.push(`/pairing/${device.ip}?name=${encodeURIComponent(device.name)}`);
  };

  const handleStop = () => {
    Haptics.impact({ style: ImpactStyle.Medium });
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
    setScanning(false);
    stopRef.current?.();
    stopRef.current = null;
  };

  const handleStart = () => {
    Haptics.impact({ style: ImpactStyle.Light });
    startScan();
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
            <IonLabel>Scanning for Sony TVs…</IonLabel>
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
            <IonLabel>No Sony TVs found</IonLabel>
            <IonNote style={{ textAlign: "center", padding: "0 3rem" }}>
              Make sure your TV is on and connected to the same Wi-Fi
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
          <div style={{ padding: "0.5rem 1rem 0.75rem" }}>
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
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};
