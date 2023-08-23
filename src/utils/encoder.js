import { Buffer } from "buffer";

const encoder = {
  decodeString: function (base64String, privateKey) {
    const strToObj = Buffer.from(base64String, "base64").toString();
    const decoded = (string) => {
      let decodedStr = "";
      for (let i = 0; i < string.length; i++) {
        decodedStr += String.fromCharCode(
          string.charCodeAt(i) ^ privateKey.charCodeAt(i % privateKey.length)
        );
      }
      return decodedStr;
    };
    const decodedBase64 = decoded(strToObj);
    return decodedBase64;
  },
};

export default encoder;
