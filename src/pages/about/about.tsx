import {
  IonAvatar,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { logoGithub, logoLinkedin } from "ionicons/icons";

import { remote } from "../../assets";

export const About = () => {
  return (
    <IonPage id="main">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard style={{ borderRadius: "1rem" }}>
          <IonCardHeader>
            <IonTitle>About the app</IonTitle>
          </IonCardHeader>
          <IonCardHeader
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IonAvatar style={{ width: "10rem", height: "10rem" }}>
              <IonImg src={remote} />
            </IonAvatar>
          </IonCardHeader>
          <IonCardContent>
            <IonCardTitle>Sony remote</IonCardTitle>
            was made when my remote batteries died and when I went on app store
            to get some remote app I was annoyed that all of them had too many
            ads and are completely unusable... so I decided to make my own 😊
          </IonCardContent>
        </IonCard>
        <IonCard style={{ borderRadius: "1rem" }}>
          <IonCardHeader>
            <IonTitle>Contact the author:</IonTitle>
          </IonCardHeader>
          <IonCardContent className="ion-text-center">
            <IonCardTitle>
              <a href="mailto:denikucevic@gmail.com">denikucevic@gmail.com</a>
            </IonCardTitle>
            <IonCardSubtitle>---OR---</IonCardSubtitle>
            <a
              href="https://www.linkedin.com/in/denis-kucevic/"
              target="_blank"
              rel="noreferrer"
            >
              <IonIcon size="large" icon={logoLinkedin} />
            </a>
            <a
              href="https://github.com/DeniKucevic"
              target="_blank"
              rel="noreferrer"
            >
              <IonIcon color="dark" size="large" icon={logoGithub} />
            </a>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};
