import { IonGrid, IonRow, IonCol, IonButton, IonIcon } from "@ionic/react";
import {
  enterOutline,
  arrowUpOutline,
  menuOutline,
  arrowBackOutline,
  locateOutline,
  arrowForwardOutline,
  returnDownBackOutline,
  arrowDownOutline,
  homeOutline,
} from "ionicons/icons";
import { IRCCCodesType, sendIRCCCommand } from "../../services";

export const Navigation = () => {
  const handleCommand = (command: IRCCCodesType) => {
    sendIRCCCommand(command);
  };
  return (
    <IonGrid>
      <IonRow className="ion-justify-content-around">
        <IonCol size="auto">
          <IonButton
            shape="round"
            color="secondary"
            onClick={() => handleCommand("input")}
          >
            <IonIcon size="small" slot="icon-only" icon={enterOutline} />
          </IonButton>
        </IonCol>
        <IonCol size="auto">
          <IonButton shape="round" onClick={() => handleCommand("up")}>
            <IonIcon size="small" slot="icon-only" icon={arrowUpOutline} />
          </IonButton>
        </IonCol>
        <IonCol size="auto">
          <IonButton
            shape="round"
            color="secondary"
            onClick={() => handleCommand("options")}
          >
            <IonIcon size="small" slot="icon-only" icon={menuOutline} />
          </IonButton>
        </IonCol>
      </IonRow>
      <IonRow className="ion-justify-content-around">
        <IonCol size="auto">
          <IonButton shape="round" onClick={() => handleCommand("left")}>
            <IonIcon size="small" slot="icon-only" icon={arrowBackOutline} />
          </IonButton>
        </IonCol>
        <IonCol size="auto">
          <IonButton
            shape="round"
            color="success"
            onClick={() => handleCommand("confirm")}
          >
            <IonIcon size="small" slot="icon-only" icon={locateOutline} />
          </IonButton>
        </IonCol>
        <IonCol size="auto">
          <IonButton shape="round" onClick={() => handleCommand("right")}>
            <IonIcon size="small" slot="icon-only" icon={arrowForwardOutline} />
          </IonButton>
        </IonCol>
      </IonRow>
      <IonRow className="ion-justify-content-around">
        <IonCol size="auto">
          <IonButton
            shape="round"
            color="secondary"
            onClick={() => handleCommand("back")}
          >
            <IonIcon
              size="small"
              slot="icon-only"
              icon={returnDownBackOutline}
            />
          </IonButton>
        </IonCol>
        <IonCol size="auto">
          <IonButton shape="round" onClick={() => handleCommand("down")}>
            <IonIcon size="small" slot="icon-only" icon={arrowDownOutline} />
          </IonButton>
        </IonCol>
        <IonCol size="auto">
          <IonButton
            shape="round"
            color="secondary"
            onClick={() => handleCommand("home")}
          >
            <IonIcon size="small" slot="icon-only" icon={homeOutline} />
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
