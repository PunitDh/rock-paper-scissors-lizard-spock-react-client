import { uniqueId } from "lodash";
import ApplicationJSON from "./editors/ApplicationJSON";
import None from "./editors/None";
import FormEncoded from "./editors/FormEncoded";
import FormDataComponent from "./editors/FormDataComponent";

export const AuthorizationType = Object.freeze({
  NO_AUTH: "No Auth",
  API_KEY: "API Key",
  BEARER_TOKEN: "Bearer Token",
  BASIC_AUTH: "Basic Auth",
});

export const ContentType = Object.freeze([
  { id: uniqueId(), label: "none", value: null, Component: None },
  {
    id: uniqueId(),
    label: "form-data",
    value: "form-data",
    Component: FormDataComponent,
  },
  {
    id: uniqueId(),
    label: "x-www-form-urlencoded",
    value: "x-www-form-urlencoded",
    Component: FormEncoded,
  },
  {
    id: uniqueId(),
    label: "raw",
    value: "application/json",
    Component: ApplicationJSON,
  },
]);
