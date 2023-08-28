export const APILogsAction = Object.freeze({
  RESET_STATE: "RESET_STATE",
  SET_TYPE: "SET_TYPE",
  SET_LIMIT: "SET_LIMIT",
  SET_TIME: "SET_TIME",
  SET_LOGS: "SET_LOGS",
});

export const setType = (payload) => ({
  type: APILogsAction.SET_TYPE,
  payload,
});

export const setLimit = (payload) => ({
  type: APILogsAction.SET_LIMIT,
  payload,
});

export const setTime = (payload) => ({
  type: APILogsAction.SET_TIME,
  payload,
});

export const setLogs = (payload) => ({
  type: APILogsAction.SET_LOGS,
  payload,
});

export const resetState = () => ({
  type: APILogsAction.RESET_STATE,
});
