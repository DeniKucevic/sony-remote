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
            <IonTitle>Before you start</IonTitle>
          </IonCardHeader>
          <IonCardContent>
            Enable remote device control on your TV:
            <br />
            <br />
            <code style={{ color: "lightblue" }}>
              [HOME] Settings &gt; Network and Internet &gt; Remote device
              settings &gt; Control remotely &gt; Enable
            </code>
            <br />
            <br />
            Make sure your phone and TV are on the same Wi-Fi network.
          </IonCardContent>
        </IonCard>

        <IonCard style={{ borderRadius: "1rem" }}>
          <IonCardHeader>
            <IonTitle>Pairing</IonTitle>
          </IonCardHeader>
          <IonCardContent>
            1. Open the menu and tap <strong>Devices</strong>.
            <br />
            2. Tap <strong>+</strong> — the app scans for your TV automatically.
            <br />
            3. Tap your TV in the list. If it doesn't appear, tap{" "}
            <strong>Scan again</strong> to retry.
            <br />
            4. On the pairing screen tap{" "}
            <strong>Connect — show PIN on TV</strong>. A 4-digit PIN will appear
            on your TV screen.
            <br />
            5. Enter the PIN in the app and tap <strong>Confirm</strong>.
            <br />
            <br />
            Your TV is now saved. The app remembers it — you only need to pair
            once.
          </IonCardContent>
        </IonCard>

        <IonCard style={{ borderRadius: "1rem" }}>
          <IonCardHeader>
            <IonTitle>PIN not showing?</IonTitle>
          </IonCardHeader>
          <IonCardContent>
            Your TV may be set to Pre-Shared Key mode. Either switch it back to
            Normal:
            <br />
            <code style={{ color: "lightblue" }}>
              Settings &gt; Network and Internet &gt; Home network setup &gt; IP
              control &gt; Authentication &gt; Normal
            </code>
            <br />
            <br />
            Or tap <strong>Use Pre-Shared Key instead</strong> on the pairing
            screen and enter the PSK you set on the TV.
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};
