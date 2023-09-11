import { uniqueId } from "lodash";
import None from "./editors/None";
import FormDataComponent from "./editors/FormDataComponent";
import FormEncoded from "./editors/FormEncoded";
import ApplicationJSON from "./editors/ApplicationJSON";

export const AuthorizationType = Object.freeze({
  NO_AUTH: "No Auth",
  API_KEY: "API Key",
  BEARER_TOKEN: "Bearer Token",
  BASIC_AUTH: "Basic Auth",
});

export const ContentType = Object.freeze({
  NONE: "NONE",
  FORM_DATA: "formData",
  FORM_ENCODED: "formEncoded",
  JSON: "json",
  XML: "xml"
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
    value: "form-data",
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
    label: "raw",
    value: "application/json",
    Component: ApplicationJSON,
  },
  // [BodyType.JSON]: {
  //   id: uniqueId(),
  //   label: "xml",
  //   value: "application/xml",
  //   Component: ApplicationJSON,
  // },
});

export const jsonEditorColors = Object.freeze({
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
