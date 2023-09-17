import { Action } from "./types";

export enum NotificationAction {
  RESET_STATE = "RESET_STATE",
  SET_MESSAGE = "SET_MESSAGE",
  SHOW_NOTIFICATION = "SHOW_NOTIFICATION",
  CLOSE_NOTIFICATION = "CLOSE_NOTIFICATION",
}

export const setMessage = (payload): Action => ({
  type: NotificationAction.SET_MESSAGE,
  payload,
});

export const showNotification = (): Action => ({
  type: NotificationAction.SHOW_NOTIFICATION,
});

export const closeNotification = (): Action => ({
  type: NotificationAction.CLOSE_NOTIFICATION,
});

export const resetState = (): Action => ({
  type: NotificationAction.RESET_STATE,
});
