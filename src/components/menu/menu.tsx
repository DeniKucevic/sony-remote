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
  IonRouterLink,
} from '@ionic/react';
import {
  helpOutline,
  informationCircleOutline,
  logoGithub,
  tvOutline,
  phonePortraitOutline,
} from 'ionicons/icons';
import { AppsList } from '../apps-list';
import { InputsList } from '../inputs-list';

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
        </IonAccordionGroup>
      </IonContent>
      <IonFooter className="ion-padding">
        <IonRouterLink href="https://github.com/DeniKucevic/sony-remote">
          <IonItem button>
            <IonIcon slot="start" icon={logoGithub} />
            Source-code
          </IonItem>
        </IonRouterLink>
        <IonMenuToggle>
          <IonItem button routerLink="/remote">
            <IonIcon slot="start" icon={tvOutline} />
            Remote
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle>
          <IonItem button routerLink="/devices">
            <IonIcon slot="start" icon={phonePortraitOutline} />
            Devices
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
        <div style={{ padding: '1rem 1rem 0.5rem', textAlign: 'center', opacity: 0.45, fontSize: '0.75rem' }}>
          Made by{' '}
          <a href="https://deniskucevic.com" target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>
            Denis Kucevic
          </a>
        </div>
      </IonFooter>
    </IonMenu>
  );
};
