import { createContext, useState } from "react";

type TvInfoType = {
  tvUrl: string;
  auth: string;
};

export type TvInfoContextType = {
  tvInfo: TvInfoType;
  setTvInfo: (tvInfo: TvInfoType) => void;
};

type TvInfoProviderProps = {
  children: React.ReactNode;
};

export const TvInfoContext = createContext<TvInfoContextType | null>(null);

export const TvInfoProvider: React.FC<TvInfoProviderProps> = ({ children }) => {
  const localStorage = window.localStorage;

  const [tvInfo, setTvInfo] = useState<TvInfoType>({
    tvUrl: "",
    auth: localStorage.getItem("auth") ?? "",
  });
  localStorage.setItem("auth", tvInfo.auth);
  return (
    <TvInfoContext.Provider value={{ tvInfo, setTvInfo }}>
      {children}
    </TvInfoContext.Provider>
  );
};
