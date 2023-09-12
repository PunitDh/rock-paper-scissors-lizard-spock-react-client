import { initialState } from "./reducer";
import KeyValuePair from "./models/KeyValuePair";
import { AuthorizationType } from "./sections/request/AuthorizationTab/constants";
import { Buffer } from "buffer";

export const initializeState = () => {
  return {
    ...initialState,
    request: {
      ...initialState.request,
      params: [createKeyValue("params")],
      headers: [createKeyValue("headers")],
      body: {
        ...initialState.request.body,
        formData: [createKeyValue("formData")],
        formEncoded: [createKeyValue("formEncoded")],
      },
    },
  };
};

export const createKeyValue = (prefix, include = true) => {
  return new KeyValuePair().setUniqueId(prefix).setInclude(include);
};

export const updateList = (currentList, payload) => {
  const index = currentList.findIndex((it) => it.id === payload.id);
  const updatedList = [...currentList];
  updatedList[index] = payload;
  const prefix = currentList[index].id.split("-")[0];
  if (index === currentList.length - 1 && updatedList[index].filled) {
    updatedList.push(createKeyValue(prefix, true));
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
