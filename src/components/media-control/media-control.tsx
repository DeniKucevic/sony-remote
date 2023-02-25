import { IonGrid, IonRow, IonCol, IonButton, IonIcon } from "@ionic/react";
import {
  playBackOutline,
  playOutline,
  playForwardOutline,
  pauseOutline,
} from "ionicons/icons";
import { useContext } from "react";
import { TvInfoContext, TvInfoContextType } from "../../context";
import { IRCCCodesType, sendIRCCCommand } from "../../services";

export const MediaControl = () => {
  const { tvInfo } = useContext(TvInfoContext) as TvInfoContextType;
  const handleCommand = (command: IRCCCodesType) => {
    sendIRCCCommand(command, tvInfo.tvUrl, tvInfo.auth);
  };
  return (
    <IonGrid>
      <IonRow className="ion-justify-content-around">
        <IonCol size="auto">
          <IonButton
            shape="round"
            color="tertiary"
            onClick={() => handleCommand("flashMinus")}
          >
            <IonIcon size="small" slot="icon-only" icon={playBackOutline} />
          </IonButton>
        </IonCol>
        <IonCol size="auto">
          <IonButton
            shape="round"
            color="tertiary"
            onClick={() => handleCommand("play")}
          >
            <IonIcon size="small" slot="icon-only" icon={playOutline} />
          </IonButton>
        </IonCol>
        <IonCol size="auto">
          <IonButton
            shape="round"
            color="tertiary"
            onClick={() => handleCommand("flashPlus")}
          >
            <IonIcon size="small" slot="icon-only" icon={playForwardOutline} />
          </IonButton>
        </IonCol>
      </IonRow>
      <IonRow className="ion-justify-content-around">
        <IonCol size="auto">
          <IonButton
            shape="round"
            color="tertiary"
            onClick={() => handleCommand("pause")}
          >
            <IonIcon size="small" slot="icon-only" icon={pauseOutline} />
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
