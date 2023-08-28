export const NotificationAction = Object.freeze({
  RESET_STATE: "RESET_STATE",
  SET_MESSAGE: "SET_MESSAGE",
  SHOW_NOTIFICATION: "SHOW_NOTIFICATION",
  CLOSE_NOTIFICATION: "CLOSE_NOTIFICATION",
});

export const setMessage = (payload) => ({
  type: NotificationAction.SET_MESSAGE,
  payload,
});

export const showNotification = () => ({
  type: NotificationAction.SHOW_NOTIFICATION,
});

export const closeNotification = () => ({
  type: NotificationAction.CLOSE_NOTIFICATION,
});

export const resetState = () => ({
  type: NotificationAction.RESET_STATE,
});
