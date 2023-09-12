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
  NO_AUTH: "No Auth",
  API_KEY: "API Key",
  BEARER_TOKEN: "Bearer Token",
  BASIC_AUTH: "Basic Auth",
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
      prefix: "",
      token: "",
    },
  },
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
