import Axios from "axios";
const BASE_URL = "http://192.168.1.35/sony/avContent";

Axios.defaults.headers.common["X-Auth-PSK"] = "1234";

export const getAvContentList = () => {
  Axios.post(BASE_URL, {
    method: "getSourceList",
    id: 1,
    params: [{ scheme: "extInput" }],
    version: "1.0",
  }).then((response) => console.log(response));
};
