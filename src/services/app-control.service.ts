import Axios from "axios";

export const getAppList = async (ip: string, auth: string) => {
  Axios.defaults.headers.common["X-Auth-PSK"] = auth;

  const results = await Axios.post(ip + "/appControl", {
    method: "getApplicationList",
    id: 60,
    params: [],
    version: "1.0",
  });
  return results;
};

export const setActiveApp = async (uri: string, ip: string, auth: string) => {
  Axios.defaults.headers.common["X-Auth-PSK"] = auth;

  const results = await Axios.post(ip + "/appControl", {
    method: "setActiveApp",
    id: 601,
    params: [
      {
        uri,
      },
    ],
    version: "1.0",
  });
  return results;
};
