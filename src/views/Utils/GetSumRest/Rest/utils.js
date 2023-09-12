import { initialState } from "./reducer";
import KeyValuePair from "./models/KeyValuePair";
import { Buffer } from "buffer";
import Request from "./models/Request";
import { AuthorizationType } from "./constants";
import RequestBody from "./models/RequestBody";

export const initializeState = () => {
  return {
    ...initialState,
    request: new Request({
      ...initialState.request,
      params: [createKeyValuePair("params")],
      headers: [createKeyValuePair("headers")],
      body: new RequestBody({
        ...initialState.request.body,
        formData: [createKeyValuePair("formData")],
        formEncoded: [createKeyValuePair("formEncoded")],
      }),
    }),
  };
};

export const createKeyValuePair = (prefix, include = true) => {
  return new KeyValuePair().setUniqueId(prefix).setInclude(include);
};

export const updateList = (currentList, payload) => {
  const index = currentList.findIndex((it) => it.id === payload.id);
  const updatedList = [...currentList];
  updatedList[index] = payload;
  const prefix = currentList[index].id.split("-")[0];
  if (index === currentList.length - 1 && updatedList[index].filled) {
    updatedList.push(createKeyValuePair(prefix, true));
  }
  return updatedList;
};

export const createHeaders = (headers) => {
  return headers.reduce(
    (acc, it) => (it.key?.length > 0 ? { ...acc, [it.key]: it.value } : acc),
    {}
  );
};

export const createAuthorization = (authorization) => {
  switch (authorization.type) {
    case AuthorizationType.BASIC_AUTH: {
      const createBasicAuth = (data) => {
        const credentials = Buffer.from(
          `${data.username}:${data.password}`
        ).toString("base64");

        return `Basic ${credentials}`;
      };
      return createBasicAuth(authorization[AuthorizationType.BASIC_AUTH]);
    }
    case AuthorizationType.BEARER_TOKEN: {
      const createBearerToken = (authorization) => {
        return authorization.prefix.length
          ? `${authorization.prefix} ${authorization.token}`
          : authorization.token;
      };
      return createBearerToken(authorization[AuthorizationType.BEARER_TOKEN]);
    }
    default:
      break;
  }
};

export const createSerializedFilename = (name, date) => {
  return name
    .concat(`-${date.toLocaleDateString()}-${date.toLocaleTimeString()}`)
    .replaceAll(/[:/?=."'+*^\\<>|]/g, " ")
    .split(" ")
    .filter(Boolean)
    .join("-")
    .toLowerCase();
};
