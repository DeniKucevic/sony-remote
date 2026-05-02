import Axios from 'axios';

const buildRegisterBody = (clientId: string) => ({
  method: 'actRegister',
  id: 8,
  version: '1.0',
  params: [
    { clientid: clientId, nickname: 'Sony Remote', level: 'private' },
    [{ value: 'yes', function: 'WOL' }],
  ],
});

// Fresh unique ID each pairing attempt so the TV always shows a PIN,
// even if this app was paired before with the same device.
export const requestPairingPin = async (host: string): Promise<string> => {
  const clientId = `sony-remote:${Date.now()}`;
  try {
    await Axios.post(`http://${host}/sony/accessControl`, buildRegisterBody(clientId));
  } catch (e: any) {
    if (e.response?.status === 401) return clientId; // expected — TV is now showing PIN
    throw e;
  }
  return clientId;
};

export const confirmPairingPin = async (host: string, pin: string, clientId: string): Promise<string> => {
  const response = await Axios.post(
    `http://${host}/sony/accessControl`,
    buildRegisterBody(clientId),
    { headers: { Authorization: `Basic ${btoa(`:${pin}`)}` } }
  );
  return response.data?.result?.[0]?.credential ?? pin;
};
