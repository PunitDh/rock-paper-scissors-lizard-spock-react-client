export const PickerAction = Object.freeze({
  SET_CARAT: "SET_VIDEO",
  SET_CONTEXT: "SET_LOADING",
  SET_RGB: "SET_OPTION",
  SET_RECT: "TOGGLE_DEBUG_MODE",
  RESET_STATE: "RESET_STATE",
});

export const setCarat = (payload) => ({
  type: PickerAction.SET_CARAT,
  payload,
});

export const setRGB = (payload) => ({
  type: PickerAction.SET_RGB,
  payload,
});

export const setRect = (payload) => ({
  type: PickerAction.SET_RECT,
  payload
});

export const setContext = (payload) => ({
  type: PickerAction.SET_CONTEXT,
  payload,
});

export const resetState = () => ({
  type: PickerAction.RESET_STATE,
});
