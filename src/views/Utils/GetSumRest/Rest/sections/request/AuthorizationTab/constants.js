import { uniqueId } from "lodash";
import NoAuth from "./editors/NoAuth";
import APIKey from "./editors/APIKey";
import BasicAuth from "./editors/BasicAuth";
import BearerToken from "./editors/BearerToken";

export const AuthorizationType = Object.freeze({
  NO_AUTH: "No Auth",
  API_KEY: "API Key",
  BEARER_TOKEN: "Bearer Token",
  BASIC_AUTH: "Basic Auth",
});

export const AuthorizationTypeMenuItems = Object.freeze({
  [AuthorizationType.NO_AUTH]: {
    id: uniqueId(),
    label: "No Auth",
    value: null,
    Component: NoAuth,
  },
  [AuthorizationType.API_KEY]: {
    id: uniqueId(),
    label: "API Key",
    value: "API",
    Component: APIKey,
  },
  [AuthorizationType.BASIC_AUTH]: {
    id: uniqueId(),
    label: "Basic Auth",
    value: "Basic",
    Component: BasicAuth,
  },
  [AuthorizationType.BEARER_TOKEN]: {
    id: uniqueId(),
    label: "Bearer Token",
    value: "Bearer",
    Component: BearerToken,
  },
});
