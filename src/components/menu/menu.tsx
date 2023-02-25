import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel,
  IonFooter,
  IonIcon,
} from "@ionic/react";
import { informationCircleOutline, tvOutline } from "ionicons/icons";
import { AppsList } from "../apps-list";
import { InputsList } from "../inputs-list";
import { TVsList } from "../tvs-list";

export const Menu = () => {
  return (
    <IonMenu type="reveal" contentId="main">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonAccordionGroup>
          <IonAccordion value="apps">
            <IonItem slot="header" color="light">
              <IonLabel>Apps</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              <AppsList />
            </div>
          </IonAccordion>
          <IonAccordion value="inputs">
            <IonItem slot="header" color="light">
              <IonLabel>Inputs</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              <InputsList />
            </div>
          </IonAccordion>
          <IonAccordion value="tvs">
            <IonItem slot="header" color="light">
              <IonLabel>Select TV</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              <TVsList />
            </div>
          </IonAccordion>
        </IonAccordionGroup>
      </IonContent>
      <IonFooter className="ion-padding">
        <IonItem button routerLink="/remote">
          <IonIcon slot="start" icon={tvOutline} />
          Remote
        </IonItem>
        <IonItem button routerLink="/about">
          <IonIcon slot="start" icon={informationCircleOutline} />
          About
        </IonItem>
      </IonFooter>
    </IonMenu>
  );
};