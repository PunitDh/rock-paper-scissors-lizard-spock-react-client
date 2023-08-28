export const NotificationAction = Object.freeze({
  RESET_STATE: "RESET_STATE",
  SET_MESSAGE: "SET_MESSAGE",
  OPEN_MESSAGE: "OPEN_MESSAGE",
  CLOSE_MESSAGE: "CLOSE_MESSAGE",
});

export const setMessage = (payload) => ({
  type: NotificationAction.SET_MESSAGE,
  payload,
});

export const showNotification = () => ({
  type: NotificationAction.OPEN_MESSAGE,
});

export const closeNotification = () => ({
  type: NotificationAction.CLOSE_MESSAGE,
});

export const resetState = () => ({
  type: NotificationAction.RESET_STATE,
});
