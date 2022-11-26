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
  IonMenu,
  IonButtons,
  IonMenuButton,
} from "@ionic/react";

import { powerOutline } from "ionicons/icons";
import {
  VolumeAndChannelControl,
  NumPad,
  Navigation,
  MediaControl,
} from "../components";
import { setPowerStatus } from "../services";

export const Home: React.FC = () => {
  const handlePowerState = () => {
    setPowerStatus();
  };

  return (
    <>
      <IonMenu type="reveal" contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu Content</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          This is the menu content.
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Brixi</IonTitle>
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
    </>
  );
};

export default Home;
