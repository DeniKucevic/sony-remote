import Axios from "axios";

export const incrementVolume = async (
  incrementor: "-1" | "+1",
  ip: string,
  auth: string
) => {
  Axios.defaults.headers.common["X-Auth-PSK"] = auth;
  await Axios.post(ip + "/audio", {
    method: "setAudioVolume",
    id: 98,
    params: [
      {
        volume: incrementor,
        ui: "on",
        target: "speaker",
      },
    ],
    version: "1.2",
  });
};
