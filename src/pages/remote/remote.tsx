import {
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonCol,
  IonButton,
  IonIcon,
  IonButtons,
  IonMenuButton,
} from "@ionic/react";

import { powerOutline } from "ionicons/icons";
import { useContext } from "react";
import {
  VolumeAndChannelControl,
  NumPad,
  Navigation,
  MediaControl,
} from "../../components";
import { TvInfoContext, TvInfoContextType } from "../../context";
import { setPowerStatus } from "../../services";

export const Remote: React.FC = () => {
  const { tvInfo } = useContext(TvInfoContext) as TvInfoContextType;
  const handlePowerState = () => {
    setPowerStatus(tvInfo.tvUrl, tvInfo.auth);
  };

  return (
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Remote</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div
          style={{
            width: "264px",
            margin: "auto",
            border: "1px solid white",
            borderRadius: "3rem",
          }}
        >
          <IonGrid>
            <IonRow className="ion-justify-content-around">
              <IonCol size="auto">
                <IonButton
                  shape="round"
                  color="danger"
                  onClick={() => handlePowerState()}
                >
                  <IonIcon slot="icon-only" icon={powerOutline} />
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
          <NumPad />
          <VolumeAndChannelControl />
          <Navigation />
          <MediaControl />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Remote;
