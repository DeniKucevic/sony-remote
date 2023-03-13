import Axios from "axios";

export type TvResponse = {
  status: string;
  value: Value;
};

export type Value = {
  data: Data;
  status: number;
  statusText: string;
  headers: ValueHeaders;
  config: Config;
  request: Request;
};

export type Config = {
  transitional: Transitional;
  adapter: string[];
  transformRequest: null[];
  transformResponse: null[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  env: Request;
  headers: ConfigHeaders;
  method: string;
  url: string;
  data: string;
};

export type Request = {};

export type ConfigHeaders = {
  Accept: string;
  "X-Auth-PSK": string;
  "Content-Type": string;
  SOAPACTION: string;
};

export type Transitional = {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
};

export type Data = {
  result: Result[];
  id: number;
};

export type Result = {
  productCategory: string;
  productName: string;
  modelName: string;
  serverName: string;
  interfaceVersion: string;
};

export type ValueHeaders = {
  "content-length": string;
  "content-type": string;
};

export const setPowerStatus = (ip: string, auth: string) => {
  Axios.defaults.headers.common["X-Auth-PSK"] = auth;

  getPowerStatus(ip, auth).then((response) => {
    const currentState = response.data.result[0].status;
    // response;
    Axios.post(ip + "/system", {
      method: "setPowerStatus",
      version: "1.0",
      id: 1,
      params: [{ status: currentState === "active" ? false : true }],
    });
  });
};

export const getPowerStatus = async (ip: string, auth: string) => {
  Axios.defaults.headers.common["X-Auth-PSK"] = auth;

  return await Axios.post(ip + "/system", {
    method: "getPowerStatus",
    id: 50,
    params: [],
    version: "1.0",
  });
};

export const getIRCCCodesList = (ip: string, auth: string) => {
  Axios.defaults.headers.common["X-Auth-PSK"] = auth;

  Axios.post(ip + "/system", {
    method: "getRemoteControllerInfo",
    id: 54,
    params: [],
    version: "1.0",
  });
};

export const getDeviceInfo = (ip: string, auth: string) => {
  Axios.defaults.headers.common["X-Auth-PSK"] = auth;

  Axios.post(ip + "/system", {
    method: "getInterfaceInformation",
    id: 33,
    params: [],
    version: "1.0",
  });
};

export const getDeviceInfoUrl = (url: string) => {
  return Axios.post(
    url,
    {
      method: "getInterfaceInformation",
      id: 33,
      params: [],
      version: "1.0",
    },
    { timeout: 3000 }
  );
};

const urls = (ip: string) => {
  const result = [];
  // we send in ip (192.168.1.1) then we remove last digit for search
  const prep_base_url = "http://" + ip.split(".").slice(0, -1).join(".") + ".";
  for (let i = 0; i < 255; i++) {
    result.push(prep_base_url + i + "/sony/system");
  }
  return result;
};

export const scanForTv = async (ip: string) => {
  const promises = urls(ip).map((url) => getDeviceInfoUrl(url));
  const results = await Promise.allSettled(promises);
  const successes = results
    .filter((x) => x.status === "fulfilled")
    .map((x) => (x as PromiseFulfilledResult<any>).value);
  return successes;
};
