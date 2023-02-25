import { useState, useEffect, useContext } from "react";
import { NetworkInterface } from "@awesome-cordova-plugins/network-interface";
import { scanForTv, TvResponse } from "../../services";
import { searchOutline } from "ionicons/icons";
import {
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonInput,
  IonCheckbox,
} from "@ionic/react";
import { TvInfoContext, TvInfoContextType } from "../../context";

export const TVsList = () => {
  const { tvInfo, setTvInfo } = useContext(TvInfoContext) as TvInfoContextType;
  const [checked, setChecked] = useState<number | null>(null);

  const [tvsList, setTvsList] = useState<any>([]);
  const [auth, setAuth] = useState(tvInfo.auth);

  useEffect(() => {
    NetworkInterface.getWiFiIPAddress().then((res) =>
      scanForTv(res.ip as string).then((res) => setTvsList(res))
    );
  }, []);

  useEffect(() => {
    setTvInfo({ tvUrl: tvInfo.tvUrl, auth: auth });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const handleTvScan = () => {
    setTvsList([]);
    NetworkInterface.getWiFiIPAddress().then((res) =>
      scanForTv(res.ip as string).then((res) => setTvsList(res))
    );
  };

  const handleTvSelect = (url: string, auth: string, e: any) => {
    setChecked(e.target.value);
    setTvInfo({ tvUrl: url, auth: auth });
  };

  return (
    <IonList>
      {tvsList.map((tv: TvResponse) => (
        <IonItem key={tv.value.data.id}>
          <IonCheckbox
            value={tv.value.data.id}
            checked={tv.value.data.id === checked}
            onIonChange={(e) =>
              handleTvSelect(
                tv.value.config.url.split("/").slice(0, -1).join("/"),
                auth,
                e
              )
            }
          />
          <IonLabel>
            {tv.value.data.result.map((tv: any) => tv.modelName)}
          </IonLabel>
        </IonItem>
      ))}
      <IonItem button onClick={handleTvScan}>
        <IonIcon slot="start" icon={searchOutline} style={{ width: "2rem" }} />
        <IonLabel>Scan for TV</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Pin</IonLabel>
        <IonInput
          value={auth}
          onIonChange={(e) => setAuth(e.detail.value ?? "")}
        />
      </IonItem>
    </IonList>
  );
};
