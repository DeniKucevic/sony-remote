import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

export const HowTo = () => {
  return (
    <IonPage id="main">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>How to</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard style={{ borderRadius: "1rem" }}>
          <IonCardHeader>
            <IonTitle>Setting up</IonTitle>
          </IonCardHeader>
          <IonCardHeader
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></IonCardHeader>
          <IonCardContent>
            For security reasons authentication is required for app to work.
            <br />
            You will need to open:
            <br />
            <code style={{ color: "lightblue" }}>
              [HOME] Settings &gt; Network and Internet &gt; Home network setup
              &gt; IP control &gt; Authentication
            </code>
            <br />
            and set the pre shared key.
            <br />
            You will also need to allow remote device control:
            <br />
            <code style={{ color: "lightblue" }}>
              [HOME] Settings &gt; Network and Internet &gt; Remote device
              settings &gt; Control remotely &gt; Enable [Default: Enable]
            </code>
            <br />
          </IonCardContent>
        </IonCard>
        <IonCard style={{ borderRadius: "1rem" }}>
          <IonCardHeader>
            <IonTitle>Using the app</IonTitle>
          </IonCardHeader>
          <IonCardHeader
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></IonCardHeader>
          <IonCardContent>
            Once you have pre shared key and remote control sorted out you just
            choose "Select TV" from the list and you should be able to see your
            tv in the list. If you don't see the TV make sure you are on the
            same network as the TV. Select the TV and put your pre shared key in
            the pin input.
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};
