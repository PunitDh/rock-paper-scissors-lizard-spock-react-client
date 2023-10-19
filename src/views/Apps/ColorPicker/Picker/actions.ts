import { Action } from "./types";

export enum PickerAction {
  SET_CARAT,
  SET_CONTEXT,
  SET_RGB,
  SET_RECT,
  RESET_STATE,
}

export const setCarat = (payload): Action => ({
  type: PickerAction.SET_CARAT,
  payload,
});

export const setRGB = (payload): Action => ({
  type: PickerAction.SET_RGB,
  payload,
});

export const setRect = (payload): Action => ({
  type: PickerAction.SET_RECT,
  payload,
});

export const setContext = (payload): Action => ({
  type: PickerAction.SET_CONTEXT,
  payload,
});

export const resetState = (): Action => ({
  type: PickerAction.RESET_STATE,
});
