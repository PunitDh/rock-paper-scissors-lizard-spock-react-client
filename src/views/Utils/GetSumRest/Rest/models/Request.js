import { uniqueId } from "lodash";
import { createBlankKeyValuePair } from "../utils";
import Authorization from "./Authorization";
import RequestBody from "./RequestBody";
import { ContentType, HttpMethod, KeyValuePairType } from "../constants";

export default class Request {
  constructor(obj = {}) {
    this.id = uniqueId("request-");
    this.name = obj.name || "New Request";
    this.url = obj.url || {};
    this.urlDisplay = obj.urlDisplay || "";
    this.isValidUrl = obj.isValidUrl || false;
    this.method = obj.method || HttpMethod.GET;
    this.params = obj.params || [createBlankKeyValuePair(KeyValuePairType.PARAM)];
    this.authorization = new Authorization();
    this.headers = obj.headers || [createBlankKeyValuePair(KeyValuePairType.HEADER)];
    this.body = obj.body || new RequestBody();
    this.contentType = obj.contentType || ContentType.NONE;
  }

  setId(id) {
    this.id = id;
    return this;
  }

  setName(name) {
    this.name = name;
    return this;
  }

  setUrl(url) {
    this.url = url;
    return this;
  }

  setUrlDisplay(urlDisplay) {
    this.urlDisplay = urlDisplay;
    return this;
  }

  setIsValidUrl(isValidUrl) {
    this.isValidUrl = isValidUrl;
    return this;
  }

  setMethod(method) {
    this.method = method;
    return this;
  }

  setParams(params) {
    this.params = params;
    return this;
  }

  addParam(param) {
    const existing = this.params.findIndex((it) => it.id === param.id);
    if (existing < 0) {
      this.params = [...this.params, param];
    } else {
      this.params[existing] = param;
    }
    return this;
  }

  removeParam(paramId) {
    this.params = this.params.filter((it) => it.id !== paramId);
    return this;
  }

  setAuthorization(authorization) {
    this.authorization = new Authorization(authorization);
    return this;
  }

  setHeaders(headers) {
    this.headers = headers;
    return this;
  }

  addHeader(header) {
    const existing = this.headers.findIndex((it) => it.id === header.id);
    if (existing < 0) {
      this.headers = [...this.headers, header];
    } else {
      this.headers[existing] = header;
    }
    return this;
  }

  removeHeader(headerId) {
    this.headers = this.headers.filter((it) => it.id !== headerId);
    return this;
  }

  setBody(body) {
    this.body = new RequestBody(body);
    return this;
  }

  setContentType(contentType) {
    this.contentType = contentType;
    return this;
  }
}
