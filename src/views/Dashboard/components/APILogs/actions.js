export const APILogAction = Object.freeze({
  RESET_STATE: "RESET_STATE",
  SET_TYPE: "SET_TYPE",
  SET_LIMIT: "SET_LIMIT",
  SET_TIME: "SET_TIME",
  SET_LOGS: "SET_LOGS",
});

export const setType = (payload) => ({
  type: APILogAction.SET_TYPE,
  payload,
});

export const setLimit = (payload) => ({
  type: APILogAction.SET_LIMIT,
  payload,
});

export const setTime = (payload) => ({
  type: APILogAction.SET_TIME,
  payload,
});

export const setLogs = (payload) => ({
  type: APILogAction.SET_LOGS,
  payload,
});

export const resetState = () => ({
  type: APILogAction.RESET_STATE,
});
