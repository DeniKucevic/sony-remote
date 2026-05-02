import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton, IonIcon, IonInput,
  IonItem, IonLabel, IonNote, IonSpinner, IonToast,
} from '@ionic/react';
import { keyOutline, tvOutline, checkmarkOutline } from 'ionicons/icons';
import { useContext, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { TvInfoContext, TvInfoContextType, SavedDevice } from '../../context';
import { requestPairingPin, confirmPairingPin, getPowerStatus } from '../../services';

type Step = 'idle' | 'requesting' | 'enter_pin' | 'confirming' | 'psk';

export const Pairing: React.FC = () => {
  const { host } = useParams<{ host: string }>();
  const location = useLocation();
  const history = useHistory();
  const { saveDevice, setActiveDevice } = useContext(TvInfoContext) as TvInfoContextType;

  const discoveredName = new URLSearchParams(location.search).get('name') ?? host;

  const [step, setStep] = useState<Step>('idle');
  const [deviceName, setDeviceName] = useState(discoveredName);
  const [pin, setPin] = useState('');
  const [psk, setPsk] = useState('');
  const [clientId, setClientId] = useState('');
  const [error, setError] = useState('');

  const handleRequestPin = async () => {
    setStep('requesting');
    try {
      const id = await requestPairingPin(host);
      setClientId(id);
      setStep('enter_pin');
    } catch {
      setError('Could not reach TV. Make sure you are on the same Wi-Fi.');
      setStep('idle');
    }
  };

  const handleConfirmPin = async () => {
    if (!pin.trim()) return;
    setStep('confirming');
    try {
      const credential = await confirmPairingPin(host, pin.trim(), clientId);
      const device: SavedDevice = {
        id: host,
        name: deviceName || host,
        url: `http://${host}/sony`,
        auth: credential,
        authType: 'token',
      };
      saveDevice(device);
      setActiveDevice(device);
      history.replace('/remote');
    } catch {
      setError('Wrong PIN or connection failed. Try again.');
      setStep('enter_pin');
    }
  };

  const handleSavePsk = async () => {
    if (!psk.trim()) return;
    try {
      await getPowerStatus(`http://${host}/sony`, psk.trim());
    } catch {
      setError('Could not connect with this PSK. Check the value on your TV.');
      return;
    }
    const device: SavedDevice = {
      id: host,
      name: deviceName || host,
      url: `http://${host}/sony`,
      auth: psk.trim(),
      authType: 'psk',
    };
    saveDevice(device);
    setActiveDevice(device);
    history.replace('/remote');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/discovery" />
          </IonButtons>
          <IonTitle>Pair Device</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Device header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <IonIcon icon={tvOutline} style={{ fontSize: '2.5rem' }} />
          <div>
            <IonItem lines="none" style={{ '--padding-start': 0 }}>
              <IonInput
                value={deviceName}
                onIonChange={(e) => setDeviceName(e.detail.value ?? '')}
                style={{ fontWeight: 600, fontSize: '1.1rem' }}
              />
            </IonItem>
            <IonNote>{host}</IonNote>
          </div>
        </div>

        {/* ── PIN flow ── */}
        {step === 'idle' && (
          <>
            <IonButton expand="block" onClick={handleRequestPin}>
              <IonIcon slot="start" icon={keyOutline} />
              Connect — show PIN on TV
            </IonButton>
            <IonNote style={{ display: 'block', textAlign: 'center', margin: '1rem 0', opacity: 0.5 }}>
              The TV will display a 4-digit PIN for you to enter
            </IonNote>
            <IonButton expand="block" fill="outline" onClick={() => setStep('psk')}>
              Use Pre-Shared Key instead
            </IonButton>
          </>
        )}

        {step === 'requesting' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
            <IonSpinner name="crescent" style={{ transform: 'scale(2)' }} />
            <IonLabel>Contacting TV…</IonLabel>
          </div>
        )}

        {step === 'enter_pin' && (
          <>
            <IonNote style={{ display: 'block', marginBottom: '1rem' }}>
              A PIN is now shown on your TV screen. Enter it below:
            </IonNote>
            <IonItem>
              <IonLabel position="stacked">PIN</IonLabel>
              <IonInput
                type="number"
                value={pin}
                onIonChange={(e) => setPin(e.detail.value ?? '')}
                placeholder="e.g. 1234"
                autofocus
              />
            </IonItem>
            <div style={{ marginTop: '1rem' }}>
              <IonButton expand="block" onClick={handleConfirmPin} disabled={!pin.trim()}>
                <IonIcon slot="start" icon={checkmarkOutline} />
                Confirm
              </IonButton>
            </div>
          </>
        )}

        {step === 'confirming' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
            <IonSpinner name="crescent" style={{ transform: 'scale(2)' }} />
            <IonLabel>Verifying PIN…</IonLabel>
          </div>
        )}

        {/* ── PSK fallback ── */}
        {step === 'psk' && (
          <>
            <IonNote style={{ display: 'block', marginBottom: '1rem' }}>
              Set a PSK on your TV: Settings › Network › Home network setup › IP control › Authentication › Pre-Shared Key
            </IonNote>
            <IonItem>
              <IonLabel position="stacked">Pre-Shared Key</IonLabel>
              <IonInput
                type="password"
                value={psk}
                onIonChange={(e) => setPsk(e.detail.value ?? '')}
                placeholder="Enter your PSK"
              />
            </IonItem>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <IonButton fill="outline" onClick={() => setStep('idle')}>Back</IonButton>
              <IonButton expand="block" onClick={handleSavePsk} disabled={!psk.trim()}>
                <IonIcon slot="start" icon={checkmarkOutline} />
                Save
              </IonButton>
            </div>
          </>
        )}
      </IonContent>

      <IonToast
        isOpen={!!error}
        message={error}
        color="danger"
        duration={3500}
        onDidDismiss={() => setError('')}
      />
    </IonPage>
  );
};
