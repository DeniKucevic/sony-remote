import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonFab,
  IonFabButton,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonNote,
  IonBadge,
} from '@ionic/react';
import { addOutline, checkmarkCircle, tvOutline, trashOutline } from 'ionicons/icons';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { TvInfoContext, TvInfoContextType } from '../../context';

export const Devices: React.FC = () => {
  const { savedDevices, activeDevice, setActiveDevice, removeDevice } = useContext(
    TvInfoContext
  ) as TvInfoContextType;
  const history = useHistory();

  return (
    <IonPage id="main">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Devices</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {savedDevices.length > 0 && (
          <IonNote style={{ display: 'block', textAlign: 'center', padding: '0.5rem', opacity: 0.45, fontSize: '0.75rem' }}>
            Tap to activate · Swipe left to delete
          </IonNote>
        )}

        {savedDevices.length === 0 ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '60%',
              gap: '1rem',
              opacity: 0.5,
            }}
          >
            <IonIcon icon={tvOutline} style={{ fontSize: '4rem' }} />
            <IonLabel>No devices saved yet</IonLabel>
            <IonNote>Tap + to scan for your Sony BRAVIA</IonNote>
          </div>
        ) : (
          <IonList>
            {savedDevices.map((device) => {
              const isActive = device.id === activeDevice?.id;
              return (
                <IonItemSliding key={device.id}>
                  <IonItem button onClick={() => setActiveDevice(device)}>
                    <IonIcon
                      slot="start"
                      icon={isActive ? checkmarkCircle : tvOutline}
                      color={isActive ? 'success' : undefined}
                    />
                    <IonLabel>
                      <h2>{device.name}</h2>
                      <p>{device.url}</p>
                    </IonLabel>
                    {isActive && (
                      <IonBadge slot="end" color="success">
                        Active
                      </IonBadge>
                    )}
                  </IonItem>
                  <IonItemOptions side="end">
                    <IonItemOption color="danger" onClick={() => removeDevice(device.id)}>
                      <IonIcon slot="icon-only" icon={trashOutline} />
                    </IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
              );
            })}
          </IonList>
        )}

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/discovery')}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};
