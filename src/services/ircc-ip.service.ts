import Axios from "axios";
const BASE_URL = "http://192.168.1.35/sony/ircc";

export type IRCCCodesType = keyof typeof IRCCCodes;

Axios.defaults.headers.post = {
  Accept: "*/*",
  "Content-Type": "text/xml; charset=UTF-8",
  SOAPACTION: '"urn:schemas-sony-com:service:IRCC:1#X_SendIRCC"',
  "X-Auth-PSK": "1234",
};

export const sendIRCCCommand = (code: keyof typeof IRCCCodes) => {
  let body = `<?xml version="1.0"?>
  <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
      <s:Body>
          <u:X_SendIRCC xmlns:u="urn:schemas-sony-com:service:IRCC:1">
              <IRCCCode>${IRCCCodes[code]}</IRCCCode>
          </u:X_SendIRCC>
      </s:Body>
  </s:Envelope>`;

  Axios.post(BASE_URL, body)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const IRCCCodes = {
  power: "AAAAAQAAAAEAAAAVAw==",
  input: "AAAAAQAAAAEAAAAlAw==",
  syncMenu: "AAAAAgAAABoAAABYAw==",
  hdmi1: "AAAAAgAAABoAAABaAw==",
  hdmi2: "AAAAAgAAABoAAABbAw==",
  hdmi3: "AAAAAgAAABoAAABcAw==",
  hdmi4: "AAAAAgAAABoAAABdAw==",
  num1: "AAAAAQAAAAEAAAAAAw==",
  num2: "AAAAAQAAAAEAAAABAw==",
  num3: "AAAAAQAAAAEAAAACAw==",
  num4: "AAAAAQAAAAEAAAADAw==",
  num5: "AAAAAQAAAAEAAAAEAw==",
  num6: "AAAAAQAAAAEAAAAFAw==",
  num7: "AAAAAQAAAAEAAAAGAw==",
  num8: "AAAAAQAAAAEAAAAHAw==",
  num9: "AAAAAQAAAAEAAAAIAw==",
  num0: "AAAAAQAAAAEAAAAJAw==",
  dot: "AAAAAgAAAJcAAAAdAw==",
  cC: "AAAAAgAAAJcAAAAoAw==",
  red: "AAAAAgAAAJcAAAAlAw==",
  green: "AAAAAgAAAJcAAAAmAw==",
  yellow: "AAAAAgAAAJcAAAAnAw==",
  blue: "AAAAAgAAAJcAAAAkAw==",
  up: "AAAAAQAAAAEAAAB0Aw==",
  down: "AAAAAQAAAAEAAAB1Aw==",
  right: "AAAAAQAAAAEAAAAzAw==",
  left: "AAAAAQAAAAEAAAA0Aw==",
  confirm: "AAAAAQAAAAEAAABlAw==",
  help: "AAAAAgAAAMQAAABNAw==",
  display: "AAAAAQAAAAEAAAA6Aw==",
  options: "AAAAAgAAAJcAAAA2Aw==",
  back: "AAAAAgAAAJcAAAAjAw==",
  home: "AAAAAQAAAAEAAABgAw==",
  volumeUp: "AAAAAQAAAAEAAAASAw==",
  volumeDown: "AAAAAQAAAAEAAAATAw==",
  mute: "AAAAAQAAAAEAAAAUAw==",
  audio: "AAAAAQAAAAEAAAAXAw==",
  channelUp: "AAAAAQAAAAEAAAAQAw==",
  channelDown: "AAAAAQAAAAEAAAARAw==",
  play: "AAAAAgAAAJcAAAAaAw==",
  pause: "AAAAAgAAAJcAAAAZAw==",
  stop: "AAAAAgAAAJcAAAAYAw==",
  flashPlus: "AAAAAgAAAJcAAAB4Aw==",
  flashMinus: "AAAAAgAAAJcAAAB5Aw==",
  prev: "AAAAAgAAAJcAAAA8Aw==",
  next: "AAAAAgAAAJcAAAA9Aw==",
};
