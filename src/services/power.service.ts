import Axios from "axios";
const BASE_URL = "http://192.168.1.35/sony/system";

Axios.defaults.headers.common["X-Auth-PSK"] = "1234";

export const setPowerStatus = () => {
  getPowerStatus().then((response) => {
    const currentState = response.data.result[0].status;
    // response;
    Axios.post(BASE_URL, {
      method: "setPowerStatus",
      version: "1.0",
      id: 1,
      params: [{ status: currentState === "active" ? false : true }],
    });
  });
};

export const getPowerStatus = async () =>
  await Axios.post(BASE_URL, {
    method: "getPowerStatus",
    id: 50,
    params: [],
    version: "1.0",
  });

export const getIRCCCodesList = () => {
  Axios.post(BASE_URL, {
    method: "getRemoteControllerInfo",
    id: 54,
    params: [],
    version: "1.0",
  }).then((response) => console.log(response));
};
