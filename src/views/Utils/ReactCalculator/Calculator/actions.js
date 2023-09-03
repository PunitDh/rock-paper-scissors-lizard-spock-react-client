export const CalculatorAction = Object.freeze({
  ADD_INPUT: "ADD_INPUT",
  SET_OUTPUT: "SET_OUTPUT",
  SET_EVALED: "SET_EVALED",
  SET_DEBUG_VALUE: "SET_DEBUG_VALUE",
  SET_INVERSE_MODE: "SET_INVERSE_MODE",
  ADD_MEMORY: "ADD_MEMORY",
  REMOVE_MEMORY: "REMOVE_MEMORY",
  CLEAR_MEMORY: "CLEAR_MEMORY",
  BACKSPACE: "BACKSPACE",
  TOGGLE_DEG_MODE: "TOGGLE_DEG_MODE",
  TOGGLE_INVERSE_MODE: "TOGGLE_INVERSE_MODE",
  RESET_OUTPUT: "RESET_OUTPUT",
  RESET_STATE: "RESET_STATE",
});

export const addInput = (...payload) => ({
  type: CalculatorAction.ADD_INPUT,
  payload,
});

export const setOutput = (payload) => ({
  type: CalculatorAction.SET_OUTPUT,
  payload,
});

export const setDegreesMode = (payload) => ({
  type: CalculatorAction.TOGGLE_DEG_MODE,
  payload,
});

export const addMemory = (payload) => ({
  type: CalculatorAction.ADD_MEMORY,
  payload,
});

export const removeMemory = (payload) => ({
  type: CalculatorAction.REMOVE_MEMORY,
  payload,
});

export const clearMemory = (payload) => ({
  type: CalculatorAction.CLEAR_MEMORY,
  payload,
});

export const setInverseMode = () => ({
  type: CalculatorAction.SET_INVERSE_MODE,
});

export const toggleInverseMode = () => ({
  type: CalculatorAction.TOGGLE_INVERSE_MODE,
});

export const backspace = () => ({
  type: CalculatorAction.BACKSPACE,
});

export const resetOutput = () => ({
  type: CalculatorAction.RESET_OUTPUT,
});

export const resetState = () => ({
  type: CalculatorAction.RESET_STATE,
});
