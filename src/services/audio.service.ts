import Axios from "axios";
const BASE_URL = "http://192.168.1.35/sony/audio";

Axios.defaults.headers.common["X-Auth-PSK"] = "1234";

export const incrementVolume = async (incrementor: "-1" | "+1") => {
  await Axios.post(BASE_URL, {
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
