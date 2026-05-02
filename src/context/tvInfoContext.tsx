import Axios from 'axios';
import { createContext, useState, useMemo, useCallback, useEffect } from 'react';

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
  setActiveDevice: (device: SavedDevice) => void;
  saveDevice: (device: SavedDevice) => void;
  removeDevice: (id: string) => void;
};

const DEVICES_KEY = 'savedDevices';
const ACTIVE_KEY = 'activeDeviceId';

export const TvInfoContext = createContext<TvInfoContextType | null>(null);

export const TvInfoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedDevices, setSavedDevices] = useState<SavedDevice[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(DEVICES_KEY) ?? '[]');
    } catch {
      return [];
    }
  });

  const [activeDeviceId, setActiveDeviceId] = useState<string | null>(
    () => localStorage.getItem(ACTIVE_KEY)
  );

  useEffect(() => {
    localStorage.setItem(DEVICES_KEY, JSON.stringify(savedDevices));
  }, [savedDevices]);

  useEffect(() => {
    if (activeDeviceId) localStorage.setItem(ACTIVE_KEY, activeDeviceId);
    else localStorage.removeItem(ACTIVE_KEY);
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
      value={{ tvInfo, activeDevice, savedDevices, setActiveDevice, saveDevice, removeDevice }}
    >
      {children}
    </TvInfoContext.Provider>
  );
};
