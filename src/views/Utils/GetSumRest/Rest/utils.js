import { initialState } from "./reducer";
import KeyValuePair from "./models/KeyValuePair";
import { Buffer } from "buffer";
import Request from "./models/Request";
import { AuthorizationType, KeyValuePairType } from "./constants";
import RequestBody from "./models/RequestBody";
import Authorization from "./models/Authorization";

export const initializeState = () => {
  return {
    ...initialState,
    request: new Request({
      ...initialState.request,
      params: [createBlankKeyValuePair(KeyValuePairType.PARAM)],
      headers: [createBlankKeyValuePair(KeyValuePairType.HEADER)],
      body: new RequestBody({
        ...initialState.request.body,
        formData: [createBlankKeyValuePair(KeyValuePairType.FORM_DATA)],
        formEncoded: [createBlankKeyValuePair(KeyValuePairType.FORM_ENCODED)],
      }),
    }),
  };
};

/**
 *
 * @param {String} prefix
 * @param {Boolean} include
 * @returns {KeyValuePair}
 */
export const createBlankKeyValuePair = (prefix, include = true) => {
  return new KeyValuePair().setUniqueId(prefix).setInclude(include);
};

/**
 *
 * @param {Array} currentList
 * @param {KeyValuePair} keyValuePair
 * @returns {Array}
 */
export const updateList = (currentList, keyValuePair) => {
  const index = currentList.findIndex((it) => it.id === keyValuePair.id);
  let updatedList = [...currentList];
  if (index < 0) {
    updatedList = [...currentList, keyValuePair]; // If not found, add new
  } else {
    updatedList[index] = keyValuePair;
  }
  const prefix = keyValuePair.id.split("-")[0];
  if (index === currentList.length - 1 && updatedList[index].filled) {
    updatedList.push(createBlankKeyValuePair(prefix, true));
  }
  return updatedList;
};

export const createHeaders = (headers) => {
  return headers.reduce(
    (acc, it) => (it.key?.length > 0 ? { ...acc, [it.key]: it.value } : acc),
    {}
  );
};

/**
 *
 * @param {Authorization} stateAuthorization
 * @returns {String}
 */
export const createAuthorizationHeader = (stateAuthorization) => {
  switch (stateAuthorization.type) {
    case AuthorizationType.BASIC_AUTH: {
      const createBasicAuth = (data) => {
        const credentials = Buffer.from(
          `${data.username}:${data.password}`
        ).toString("base64");

        return `Basic ${credentials}`;
      };
      return createBasicAuth(stateAuthorization[AuthorizationType.BASIC_AUTH]);
    }
    case AuthorizationType.BEARER_TOKEN: {
      const createBearerToken = (authorization) => {
        return authorization.prefix.length
          ? `${authorization.prefix} ${authorization.token}`
          : authorization.token;
      };
      return createBearerToken(
        stateAuthorization[AuthorizationType.BEARER_TOKEN]
      );
    }
    default:
      break;
  }
};

/**
 *
 * @param {String} name
 * @returns {String}
 */
export const createSerializedFilename = (name) => {
  const date = new Date();
  return name
    .concat(`-${date.toLocaleDateString()}-${date.toLocaleTimeString()}`)
    .replaceAll(/[:/?=."'+*^\\<>|]/g, " ")
    .split(" ")
    .filter(Boolean)
    .join("-")
    .toLowerCase();
};
