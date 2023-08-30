export const CalculatorAction = Object.freeze({
  SET_INPUT: "SET_VIDEO",
  SET_OUTPUT: "SET_LOADING",
  SET_EVALED: "SET_OPTION",
  RESET_OUTPUT: "RESET_OUTPUT",
  RESET_STATE: "RESET_STATE",
});

export const setInput = (payload) => ({
  type: CalculatorAction.SET_INPUT,
  payload,
});

export const setOutput = (payload) => ({
  type: CalculatorAction.SET_OUTPUT,
  payload,
});

export const setEvaled = (payload) => ({
  type: CalculatorAction.SET_EVALED,
  payload,
});

export const resetOutput = () => ({
  type: CalculatorAction.RESET_OUTPUT,
});

export const resetState = () => ({
  type: CalculatorAction.RESET_STATE,
});
