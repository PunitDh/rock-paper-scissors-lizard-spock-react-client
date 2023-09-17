export enum APILogsAction {
  RESET_STATE = "RESET_STATE",
  SET_FILTER = "SET_FILTER",
  SET_CONFIRM_CLEAR = "SET_CONFIRM_CLEAR",
  SET_LOGS = "SET_LOGS",
}

export const setFilter = (payload) => ({
  type: APILogsAction.SET_FILTER,
  payload,
});

export const setConfirmClear = (payload) => ({
  type: APILogsAction.SET_CONFIRM_CLEAR,
  payload,
});

export const setLogs = (payload) => ({
  type: APILogsAction.SET_LOGS,
  payload,
});

export const resetState = () => ({
  type: APILogsAction.RESET_STATE,
});
