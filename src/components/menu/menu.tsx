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
  IonMenuToggle,
} from "@ionic/react";
import {
  helpOutline,
  informationCircleOutline,
  tvOutline,
} from "ionicons/icons";
import { AppsList } from "../apps-list";
import { InputsList } from "../inputs-list";
import { TVsList } from "../tvs-list";

export const Menu = () => {
  return (
    <IonMenu type="overlay" contentId="main">
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
        <IonMenuToggle>
          <IonItem button routerLink="/remote">
            <IonIcon slot="start" icon={tvOutline} />
            Remote
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle>
          <IonItem button routerLink="/how-to">
            <IonIcon slot="start" icon={helpOutline} />
            How to use app
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle>
          <IonItem button routerLink="/about">
            <IonIcon slot="start" icon={informationCircleOutline} />
            About
          </IonItem>
        </IonMenuToggle>
      </IonFooter>
    </IonMenu>
  );
};
