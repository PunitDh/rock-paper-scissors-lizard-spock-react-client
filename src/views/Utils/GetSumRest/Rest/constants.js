import { uniqueId } from "lodash";
import None from "./sections/request/BodyTab/editors/None";
import FormDataComponent from "./sections/request/BodyTab/editors/FormDataComponent";
import FormEncoded from "./sections/request/BodyTab/editors/FormEncoded";
import ApplicationJSON from "./sections/request/BodyTab/editors/ApplicationJSON";
import NoAuth from "./sections/request/AuthorizationTab/editors/NoAuth";
import APIKey from "./sections/request/AuthorizationTab/editors/APIKey";
import BasicAuth from "./sections/request/AuthorizationTab/editors/BasicAuth";
import BearerToken from "./sections/request/AuthorizationTab/editors/BearerToken";

export const FormDataFieldType = Object.freeze({
  TEXT: "Text",
  FILE: "File",
});

export const HttpMethod = Object.freeze({
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
});

export const ContentType = Object.freeze({
  NONE: "NONE",
  FORM_DATA: "formData",
  FORM_ENCODED: "formEncoded",
  JSON: "json",
  XML: "xml",
});

export const ContentTypeMenuItems = Object.freeze({
  [ContentType.NONE]: {
    id: uniqueId(),
    label: "none",
    value: null,
    Component: None,
  },
  [ContentType.FORM_DATA]: {
    id: uniqueId(),
    label: "form-data",
    value: "multipart/form-data",
    Component: FormDataComponent,
  },
  [ContentType.FORM_ENCODED]: {
    id: uniqueId(),
    label: "x-www-form-urlencoded",
    value: "x-www-form-urlencoded",
    Component: FormEncoded,
  },
  [ContentType.JSON]: {
    id: uniqueId(),
    label: "json",
    value: "application/json",
    Component: ApplicationJSON,
  },
  // [ContentType.XML]: {
  //   id: uniqueId(),
  //   label: "xml",
  //   value: "application/xml",
  //   Component: ApplicationXML,
  // },
});

export const DisplayType = Object.freeze({
  PRETTY: "Pretty",
  RAW: "Raw",
  PREVIEW: "Preview",
});

export const AuthorizationType = Object.freeze({
  NO_AUTH: "NO_AUTH",
  API_KEY: "API_KEY",
  BEARER_TOKEN: "BEARER_TOKEN",
  BASIC_AUTH: "BASIC_AUTH",
});

export const APIKeyAddTo = Object.freeze({
  HEADER: "Header",
  QUERY_PARAMS: "Query Params",
});

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
    id: uniqueId(),
    label: "No Auth",
    value: null,
    Component: NoAuth,
    initialState: {},
  },
  [AuthorizationType.API_KEY]: {
    id: uniqueId(),
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
    id: uniqueId(),
    label: "Basic Auth",
    value: "Basic",
    Component: BasicAuth,
    initialState: {
      username: "",
      password: "",
    },
  },
  [AuthorizationType.BEARER_TOKEN]: {
    id: uniqueId(),
    label: "Bearer Token",
    value: "Bearer",
    Component: BearerToken,
    initialState: {
      prefix: "Bearer",
      token: "",
    },
  },
});

export const KeyValuePairType = Object.freeze({
  PARAM: "params",
  HEADER: "header",
  FORM_DATA: "formData",
  FORM_ENCODED: "formEncoded",
  API_KEY: "apiKey",
});

export const HttpStatusCode = Object.freeze({
  // 1xx: Informational responses
  100: "Continue",
  101: "Switching Protocols",
  102: "Processing",

  // 2xx: Successful responses
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",
  207: "Multi-Status",
  208: "Already Reported",
  226: "IM Used",

  // 3xx: Redirection messages
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  305: "Use Proxy",
  307: "Temporary Redirect",
  308: "Permanent Redirect",

  // 4xx: Client error responses
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Payload Too Large",
  414: "URI Too Long",
  415: "Unsupported Media Type",
  416: "Range Not Satisfiable",
  417: "Expectation Failed",
  418: "I'm a teapot", // April Fools joke in 1998 by RFC 2324
  421: "Misdirected Request",
  422: "Unprocessable Entity",
  423: "Locked",
  424: "Failed Dependency",
  426: "Upgrade Required",
  428: "Precondition Required",
  429: "Too Many Requests",
  431: "Request Header Fields Too Large",
  451: "Unavailable For Legal Reasons",

  // 5xx: Server error responses
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates",
  507: "Insufficient Storage",
  508: "Loop Detected",
  510: "Not Extended",
  511: "Network Authentication Required",
});

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
