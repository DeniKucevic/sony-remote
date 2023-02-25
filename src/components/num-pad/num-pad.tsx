import { IonGrid, IonRow, IonCol, IonButton } from "@ionic/react";
import { useContext } from "react";
import { TvInfoContext, TvInfoContextType } from "../../context";
import { IRCCCodesType, sendIRCCCommand } from "../../services";

export const NumPad = () => {
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
            color="medium"
            onClick={() => handleCommand("num1")}
          >
            1
          </IonButton>
        </IonCol>
        <IonCol size="auto">
          <IonButton
            shape="round"
            color="medium"
            onClick={() => handleCommand("num2")}
          >
            2
          </IonButton>
        </IonCol>
        <IonCol size="auto">
          <IonButton
            shape="round"
            color="medium"
            onClick={() => handleCommand("num3")}
          >
            3
          </IonButton>
        </IonCol>
      </IonRow>
      <IonRow className="ion-justify-content-around">
        <IonCol size="auto">
          <IonButton
            shape="round"
            color="medium"
            onClick={() => handleCommand("num4")}
          >
            4
          </IonButton>
        </IonCol>
        <IonCol size="auto">
          <IonButton
            shape="round"
            color="medium"
            onClick={() => handleCommand("num5")}
          >
            5
          </IonButton>
        </IonCol>
        <IonCol size="auto">
          <IonButton
            shape="round"
            color="medium"
            onClick={() => handleCommand("num6")}
          >
            6
          </IonButton>
        </IonCol>
      </IonRow>
      <IonRow className="ion-justify-content-around">
        <IonCol size="auto">
          <IonButton
            shape="round"
            color="medium"
            onClick={() => handleCommand("num7")}
          >
            7
          </IonButton>
        </IonCol>
        <IonCol size="auto">
          <IonButton
            shape="round"
            color="medium"
            onClick={() => handleCommand("num8")}
          >
            8
          </IonButton>
        </IonCol>
        <IonCol size="auto">
          <IonButton
            shape="round"
            color="medium"
            onClick={() => handleCommand("num9")}
          >
            9
          </IonButton>
        </IonCol>
      </IonRow>
      <IonRow className="ion-justify-content-around">
        <IonCol size="auto">
          <IonButton
            shape="round"
            color="medium"
            onClick={() => handleCommand("num0")}
          >
            0
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
