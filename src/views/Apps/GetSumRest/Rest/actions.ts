import { AuthorizationType, DisplayType, HttpMethod } from "./constants";
import KeyValuePair from "./models/KeyValuePair";
import { Action } from "./types";

export enum RestAction {
  SET_URL,
  SET_REQUEST_NAME,
  SET_METHOD,
  SET_PARAMS,
  DELETE_PARAMS,
  SET_AUTHORIZATION_TYPE,
  SET_AUTHORIZATION,
  SET_HEADERS,
  DELETE_HEADERS,
  SET_CONTENT_TYPE,
  SET_BODY_CONTENT,
  DELETE_BODY_CONTENT,
  SET_RESPONSE,
  SET_RESPONSE_TIME,
  SET_OUTPUT_DISPLAY_TYPE,
  RESET_OUTPUT,
  RESET_STATE,
}

export const setUrl = (payload: string): Action => ({
  type: RestAction.SET_URL,
  payload,
});

export const setRequestName = (payload: string): Action => ({
  type: RestAction.SET_REQUEST_NAME,
  payload,
});

export const setParams = (payload: KeyValuePair): Action => ({
  type: RestAction.SET_PARAMS,
  payload,
});

export const deleteParams = (payload: KeyValuePair): Action => ({
  type: RestAction.DELETE_PARAMS,
  payload,
});

export const setMethod = (payload: HttpMethod): Action => ({
  type: RestAction.SET_METHOD,
  payload,
});

export const setAuthorizationType = (payload: string): Action => ({
  type: RestAction.SET_AUTHORIZATION_TYPE,
  payload,
});

export const setAuthorization = (
  type: AuthorizationType,
  key: string,
  value: string
): Action => ({
  type: RestAction.SET_AUTHORIZATION,
  payload: {
    type,
    key,
    value,
  },
});

export const setHeaders = (payload: KeyValuePair): Action => ({
  type: RestAction.SET_HEADERS,
  payload,
});

export const removeHeader = (payload): Action => ({
  type: RestAction.SET_HEADERS,
  payload,
});

export const deleteHeaders = (payload: KeyValuePair): Action => ({
  type: RestAction.DELETE_HEADERS,
  payload,
});

export const setContentType = (payload): Action => ({
  type: RestAction.SET_CONTENT_TYPE,
  payload,
});

export const setBodyContent = (type, value): Action => ({
  type: RestAction.SET_BODY_CONTENT,
  payload: { type, value },
});

export const deleteBodyContent = (type, value): Action => ({
  type: RestAction.DELETE_BODY_CONTENT,
  payload: { type, value },
});

export const setResponse = (payload): Action => ({
  type: RestAction.SET_RESPONSE,
  payload,
});

export const setResponseTime = (payload): Action => ({
  type: RestAction.SET_RESPONSE_TIME,
  payload,
});

export const setOutputDisplayType = (payload: DisplayType): Action => ({
  type: RestAction.SET_OUTPUT_DISPLAY_TYPE,
  payload,
});

export const resetOutput = (): Action => ({
  type: RestAction.RESET_OUTPUT,
});

export const resetState = (): Action => ({
  type: RestAction.RESET_STATE,
});
