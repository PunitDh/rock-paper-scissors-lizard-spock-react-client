import { Buffer } from "buffer";

const encoder = {
  decodeString: function (base64String: string, privateKey: string): string {
    const strToObj = Buffer.from(base64String, "base64").toString();
    const decoded = (string: string): string => {
      let decodedStr = "";
      for (let i = 0; i < string.length; i++) {
        decodedStr += String.fromCharCode(
          string.charCodeAt(i) ^ privateKey.charCodeAt(i % privateKey.length)
        );
      }
      return decodedStr;
    };
    return decoded(strToObj);
  },
};

export default encoder;
