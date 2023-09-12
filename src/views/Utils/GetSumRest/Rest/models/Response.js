import { DisplayType } from "../sections/response/constants";

export default class Response {
  constructor(obj = {}) {
    const { data, status, statusText, headers } = this.extractValues(obj);

    this.output = data;
    this.json = isObject(data);
    this.status = status;
    this.statusText = statusText;
    this.headers = headers;
    this.size = getDataLength(data, headers);
    this.error = this.status >= 400;
    this.time = obj.time;
    this.displayType = DisplayType.PRETTY;
  }

  extractValues(source) {
    const primary = source ?? {};
    const secondary = source?.response ?? {};

    return {
      data: primary.data ?? secondary.data,
      status: primary.status ?? secondary.status,
      statusText: primary.statusText ?? secondary.statusText,
      headers: primary.headers ?? secondary.headers,
    };
  }

  setTime(time) {
    this.time = time;
    return this;
  }

  setDisplayType(displayType) {
    this.displayType = displayType;
    return this;
  }

  setOutput(obj) {
    const { data, headers } = this.extractValues(obj);

    this.output = data;
    this.json = isObject(data);
    this.size = getDataLength(data, headers);

    return this;
  }
}

const isObject = (value) => value && typeof value === "object";

const getDataLength = (data, headers) => {
  const dataLength = isObject(data)
    ? JSON.stringify(data)?.length
    : String(data).length;

  const headersLength = JSON.stringify(headers)?.length;

  return dataLength + headersLength;
};
