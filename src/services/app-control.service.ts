import Axios from "axios";
const BASE_URL = "http://192.168.1.35/sony/appControl";

Axios.defaults.headers.common["X-Auth-PSK"] = "1234";

export const getAppList = async () => {
  const results = await Axios.post(BASE_URL, {
    method: "getApplicationList",
    id: 60,
    params: [],
    version: "1.0",
  });
  return results;
};
