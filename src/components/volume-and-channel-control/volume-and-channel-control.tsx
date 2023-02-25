import {
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonText,
  IonIcon,
} from "@ionic/react";
import { addOutline, removeOutline, volumeMuteOutline } from "ionicons/icons";
import { useContext } from "react";
import { TvInfoContext, TvInfoContextType } from "../../context";
import { IRCCCodesType, sendIRCCCommand } from "../../services";

export const VolumeAndChannelControl = () => {
  const { tvInfo } = useContext(TvInfoContext) as TvInfoContextType;
  const handleCommand = (command: IRCCCodesType) => {
    sendIRCCCommand(command, tvInfo.tvUrl, tvInfo.auth);
  };

  return (
    <IonGrid>
      <IonRow className="ion-justify-content-around">
        <IonCol size="auto">
          <IonButton shape="round" onClick={() => handleCommand("volumeUp")}>
            <IonIcon size="small" slot="icon-only" icon={addOutline} />
          </IonButton>
        </IonCol>
        <IonCol size="auto">
          <IonButton shape="round" onClick={() => handleCommand("channelUp")}>
            <IonIcon size="small" slot="icon-only" icon={addOutline} />
          </IonButton>
        </IonCol>
      </IonRow>
      <IonRow className="ion-justify-content-around">
        <IonCol size="auto" className="ion-padding">
          <IonText>VOL</IonText>
        </IonCol>
        <IonCol size="auto">
          <IonButton
            shape="round"
            color="warning"
            onClick={() => handleCommand("mute")}
          >
            <IonIcon size="small" slot="icon-only" icon={volumeMuteOutline} />
          </IonButton>
        </IonCol>
        <IonCol size="auto" className="ion-padding">
          <IonText>CH</IonText>
        </IonCol>
      </IonRow>
      <IonRow className="ion-justify-content-around">
        <IonCol size="auto">
          <IonButton shape="round" onClick={() => handleCommand("volumeDown")}>
            <IonIcon size="small" slot="icon-only" icon={removeOutline} />
          </IonButton>
        </IonCol>
        <IonCol size="auto">
          <IonButton shape="round" onClick={() => handleCommand("channelDown")}>
            <IonIcon size="small" slot="icon-only" icon={removeOutline} />
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
