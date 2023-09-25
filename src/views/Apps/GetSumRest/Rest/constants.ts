import { uniqueId } from "lodash";
import None from "./sections/request/BodyTab/editors/None";
import FormDataComponent from "./sections/request/BodyTab/editors/FormDataComponent";
import FormEncoded from "./sections/request/BodyTab/editors/FormEncoded";
import ApplicationJSON from "./sections/request/BodyTab/editors/ApplicationJSON";
import NoAuth from "./sections/request/AuthorizationTab/editors/NoAuth";
import APIKey from "./sections/request/AuthorizationTab/editors/APIKey";
import BasicAuth from "./sections/request/AuthorizationTab/editors/BasicAuth";
import BearerToken from "./sections/request/AuthorizationTab/editors/BearerToken";

export enum FormDataFieldType {
  TEXT = "Text",
  FILE = "File",
}

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export enum ContentType {
  NONE = "NONE",
  FORM_DATA = "formData",
  FORM_ENCODED = "formEncoded",
  JSON = "json",
  XML = "xml",
}

export const ContentTypeMenuItems = {
  [ContentType.NONE]: {
    id: uniqueId("content-type-"),
    label: "none",
    value: null,
    Component: None,
  },
  [ContentType.FORM_DATA]: {
    id: uniqueId("content-type-"),
    label: "form-data",
    value: "multipart/form-data",
    Component: FormDataComponent,
  },
  [ContentType.FORM_ENCODED]: {
    id: uniqueId("content-type-"),
    label: "x-www-form-urlencoded",
    value: "x-www-form-urlencoded",
    Component: FormEncoded,
  },
  [ContentType.JSON]: {
    id: uniqueId("content-type-"),
    label: "json",
    value: "application/json",
    Component: ApplicationJSON,
  },
  // [ContentType.XML]: {
  //   id: uniqueId("content-type-"),
  //   label: "xml",
  //   value: "application/xml",
  //   Component: ApplicationXML,
  // },
} as const;

export enum DisplayType {
  PRETTY = "Pretty",
  RAW = "Raw",
  PREVIEW = "Preview",
}

export enum AuthorizationType {
  NO_AUTH = "NO_AUTH",
  API_KEY = "API_KEY",
  BEARER_TOKEN = "BEARER_TOKEN",
  BASIC_AUTH = "BASIC_AUTH",
}

export enum APIKeyAddTo {
  HEADER = "Header",
  QUERY_PARAMS = "Query Params",
}

export const RequestTabList = Object.freeze([
  {
    type: "Params",
    subLabel: (it) => it.params?.filter((it) => it.key.length)?.length,
  },
  { type: "Authorization", subLabel: () => {} },
  {
    type: "Headers",
    subLabel: (it) => it.headers?.filter((it) => it.key.length)?.length,
  },
  { type: "Body", subLabel: () => {} },
]);

export const ResponseTabList = Object.freeze([
  { type: "Body", subLabel: () => {} },
  { type: "Cookies", subLabel: () => {} },
  {
    type: "Headers",
    subLabel: (it) => it.headers && Object.keys(it.headers).length,
  },
]);

export const tabProps = (index) => ({
  id: `header-tab-${index}`,
  "aria-controls": `rest-tabpanel-${index}`,
});

export const AuthorizationTypeItems = Object.freeze({
  [AuthorizationType.NO_AUTH]: {
    id: uniqueId("auth-type-"),
    label: "No Auth",
    value: null,
    Component: NoAuth,
    initialState: {},
  },
  [AuthorizationType.API_KEY]: {
    id: uniqueId("auth-type-"),
    label: "API Key",
    value: "API",
    Component: APIKey,
    initialState: {
      key: "",
      value: "",
      addTo: "Header",
    },
  },
  [AuthorizationType.BASIC_AUTH]: {
    id: uniqueId("auth-type-"),
    label: "Basic Auth",
    value: "Basic",
    Component: BasicAuth,
    initialState: {
      username: "",
      password: "",
    },
  },
  [AuthorizationType.BEARER_TOKEN]: {
    id: uniqueId("auth-type-"),
    label: "Bearer Token",
    value: "Bearer",
    Component: BearerToken,
    initialState: {
      prefix: "Bearer",
      token: "",
    },
  },
});

export enum KeyValuePairType {
  PARAM = "params",
  HEADER = "header",
  FORM_DATA = "formData",
  FORM_ENCODED = "formEncoded",
  API_KEY = "apiKey",
}

export enum HttpStatusCode {
  // 1xx: Informational responses
  Continue = 100,
  SwitchingProtocols = 101,
  Processing = 102,

  // 2xx: Successful responses
  OK = 200,
  Created = 201,
  Accepted = 202,
  NonAuthoritativeInformation = 203,
  NoContent = 204,
  ResetContent = 205,
  PartialContent = 206,
  MultiStatus = 207,
  AlreadyReported = 208,
  IMUsed = 226,

  // 3xx: Redirection messages
  MultipleChoices = 300,
  MovedPermanently = 301,
  Found = 302,
  SeeOther = 303,
  NotModified = 304,
  UseProxy = 305,
  TemporaryRedirect = 307,
  PermanentRedirect = 308,

  // 4xx: Client error responses
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  ProxyAuthenticationRequired = 407,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  LengthRequired = 411,
  PreconditionFailed = 412,
  PayloadTooLarge = 413,
  URITooLong = 414,
  UnsupportedMediaType = 415,
  RangeNotSatisfiable = 416,
  ExpectationFailed = 417,
  ImATeapot = 418, // April Fools joke in 1998 by RFC 2324
  MisdirectedRequest = 421,
  UnprocessableEntity = 422,
  Locked = 423,
  FailedDependency = 424,
  UpgradeRequired = 426,
  PreconditionRequired = 428,
  TooManyRequests = 429,
  RequestHeaderFieldsTooLarge = 431,
  UnavailableForLegalReasons = 451,

  // 5xx: Server error responses
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  HTTPVersionNotSupported = 505,
  VariantAlsoNegotiates = 506,
  InsufficientStorage = 507,
  LoopDetected = 508,
  NotExtended = 510,
  NetworkAuthenticationRequired = 511,
}

export const JSONEditorColors = Object.freeze({
  default: "#333",
  string: "#bd2c00",
  number: "#009e60",
  // colon: "",
  keys: "#4078c0",
  // keys_whiteSpace: "",
  primitive: "#0053ad",
  // error: "",
  background: "#fafafa",
  // background_warning: "",
});

/*
colors.default	Hex color code for any symbols, like curly braces, and comma.	string	Optional
colors.string	Hex color code for tokens identified as string values.	string	Optional
colors.number	Hex color code for tokens identified as integeter, double, or float values.	string	Optional
colors.colon	Hex color code for tokens identified as colon.	string	Optional
colors.keys	Hex color code for tokens identified as keys or property names.	string	Optional
colors.keys_whiteSpace	Hex color code for tokens identified as keys wrapped in quotes.	string	Optional
colors.primitive	Hex color code for tokens identified as boolean values and null.	string	Optional
colors.error	Hex color code for tokens marked with an error tag.	string	Optional
colors.background	Hex color code for component's background.	string	Optional
colors.background_warning	Hex color code for warning message displaying at the top in component.	string	Optional
*/
