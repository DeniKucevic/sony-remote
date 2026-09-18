import Axios from 'axios';
import { Preferences } from '@capacitor/preferences';
import { createContext, useState, useMemo, useCallback, useEffect, useRef } from 'react';

export type SavedDevice = {
  id: string;
  name: string;
  url: string;
  auth: string;
  /** 'psk' = X-Auth-PSK header, 'token' = Cookie from actRegister PIN flow */
  authType: 'psk' | 'token';
};

export type TvInfoContextType = {
  tvInfo: { tvUrl: string; auth: string };
  activeDevice: SavedDevice | null;
  savedDevices: SavedDevice[];
  /** false until persisted state has been loaded from native storage */
  hydrated: boolean;
  setActiveDevice: (device: SavedDevice) => void;
  saveDevice: (device: SavedDevice) => void;
  removeDevice: (id: string) => void;
};

const DEVICES_KEY = 'savedDevices';
const ACTIVE_KEY = 'activeDeviceId';

export const TvInfoContext = createContext<TvInfoContextType | null>(null);

export const TvInfoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedDevices, setSavedDevices] = useState<SavedDevice[]>([]);
  const [activeDeviceId, setActiveDeviceId] = useState<string | null>(null);
  // Exposed so consumers (e.g. the default route redirect) can wait for the
  // async load before deciding what to render.
  const [hydrated, setHydrated] = useState(false);

  // Guards persistence so we don't overwrite stored data with the initial
  // empty state before the async load from Preferences has finished.
  const hydratedRef = useRef(false);

  // Load persisted state on mount, migrating any legacy localStorage data
  // written by older (pre-Preferences) versions of the app.
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      let devicesRaw = (await Preferences.get({ key: DEVICES_KEY })).value;
      let activeRaw = (await Preferences.get({ key: ACTIVE_KEY })).value;

      // One-time migration: WebView localStorage could be evicted by the OS,
      // so move anything left there into durable native storage.
      try {
        const legacyDevices = localStorage.getItem(DEVICES_KEY);
        const legacyActive = localStorage.getItem(ACTIVE_KEY);
        if (devicesRaw == null && legacyDevices != null) {
          devicesRaw = legacyDevices;
          await Preferences.set({ key: DEVICES_KEY, value: legacyDevices });
        }
        if (activeRaw == null && legacyActive != null) {
          activeRaw = legacyActive;
          await Preferences.set({ key: ACTIVE_KEY, value: legacyActive });
        }
        localStorage.removeItem(DEVICES_KEY);
        localStorage.removeItem(ACTIVE_KEY);
      } catch {
        // localStorage may be unavailable; ignore.
      }

      if (cancelled) return;

      try {
        setSavedDevices(devicesRaw ? JSON.parse(devicesRaw) : []);
      } catch {
        setSavedDevices([]);
      }
      setActiveDeviceId(activeRaw ?? null);
      hydratedRef.current = true;
      setHydrated(true);
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydratedRef.current) return;
    Preferences.set({ key: DEVICES_KEY, value: JSON.stringify(savedDevices) });
  }, [savedDevices]);

  useEffect(() => {
    if (!hydratedRef.current) return;
    if (activeDeviceId) Preferences.set({ key: ACTIVE_KEY, value: activeDeviceId });
    else Preferences.remove({ key: ACTIVE_KEY });
  }, [activeDeviceId]);

  const activeDevice = savedDevices.find((d) => d.id === activeDeviceId) ?? null;

  // Keep Axios auth headers in sync with the active device
  useEffect(() => {
    if (!activeDevice) return;
    if (activeDevice.authType === 'token') {
      delete Axios.defaults.headers.common['X-Auth-PSK'];
      Axios.defaults.headers.common['Cookie'] = `auth=${activeDevice.auth}`;
    } else {
      delete Axios.defaults.headers.common['Cookie'];
      Axios.defaults.headers.common['X-Auth-PSK'] = activeDevice.auth;
    }
  }, [activeDevice]);

  const tvInfo = useMemo(
    () => ({ tvUrl: activeDevice?.url ?? '', auth: activeDevice?.auth ?? '' }),
    [activeDevice]
  );

  const setActiveDevice = useCallback((device: SavedDevice) => {
    setActiveDeviceId(device.id);
  }, []);

  const saveDevice = useCallback((device: SavedDevice) => {
    setSavedDevices((prev) => {
      const idx = prev.findIndex((d) => d.id === device.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = device;
        return next;
      }
      return [...prev, device];
    });
  }, []);

  const removeDevice = useCallback(
    (id: string) => {
      setSavedDevices((prev) => prev.filter((d) => d.id !== id));
      if (activeDeviceId === id) setActiveDeviceId(null);
    },
    [activeDeviceId]
  );

  return (
    <TvInfoContext.Provider
      value={{ tvInfo, activeDevice, savedDevices, hydrated, setActiveDevice, saveDevice, removeDevice }}
    >
      {children}
    </TvInfoContext.Provider>
  );
};
