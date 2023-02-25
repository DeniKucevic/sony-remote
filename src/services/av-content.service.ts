import Axios from "axios";

export const getAvContentList = async (ip: string, auth: string) => {
  Axios.defaults.headers.common["X-Auth-PSK"] = auth;

  const results = await Axios.post(ip + "/avContent", {
    method: "getSourceList",
    id: 1,
    params: [{ scheme: "extInput" }],
    version: "1.0",
  });
  return results;
};

export const getContentList = async (ip: string, auth: string) => {
  Axios.defaults.headers.common["X-Auth-PSK"] = auth;

  const results = await Axios.post(ip + "/avContent", {
    method: "getContentList",
    id: 88,
    params: [
      {
        stIdx: 0,
        cnt: 50,
        uri: "extInput:hdmi",
      },
    ],
    version: "1.5",
  });
  return results;
};

export const setActiveInput = async (uri: string, ip: string, auth: string) => {
  Axios.defaults.headers.common["X-Auth-PSK"] = auth;

  const results = await Axios.post(ip + "/avContent", {
    method: "setPlayContent",
    id: 101,
    params: [{ uri }],
    version: "1.0",
  });
  return results;
};
