import { IonList, IonLabel, IonItem, IonImg } from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { TvInfoContext, TvInfoContextType } from "../../context";
import { getAppList, setActiveApp } from "../../services";

export const AppsList = () => {
  const { tvInfo } = useContext(TvInfoContext) as TvInfoContextType;

  const [apps, setApps] = useState<
    { title: string; icon: string; uri: string }[]
  >([]);

  useEffect(() => {
    getAppList(tvInfo.tvUrl, tvInfo.auth).then((response) => {
      setApps(response.data.result[0]);
    });
  }, [tvInfo]);

  const handleAppSet = (uri: string) => {
    setActiveApp(uri, tvInfo.tvUrl, tvInfo.auth);
  };

  return (
    <IonList>
      {apps.map((app) => (
        <IonItem key={app.uri} button onClick={() => handleAppSet(app.uri)}>
          <IonImg slot="start" src={app.icon} style={{ width: "2rem" }} />
          <IonLabel>{app.title}</IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
};
