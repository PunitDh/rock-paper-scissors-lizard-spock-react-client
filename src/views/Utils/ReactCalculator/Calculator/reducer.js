import { CalculatorAction } from "./actions";

export const initialState = {
  input: "",
  output: 0,
  evaled: false,
  deg: false,
  inv: false,
  ans: 0,
  debugValue: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case CalculatorAction.SET_INPUT:
      return {
        ...state,
        input: action.payload,
      };
    case CalculatorAction.SET_OUTPUT:
      return {
        ...state,
        output: action.payload,
        ans: action.payload,
      };
    case CalculatorAction.SET_EVALED:
      return {
        ...state,
        evaled: action.payload,
      };
    case CalculatorAction.SET_DEBUG_VALUE:
      return {
        ...state,
        debugValue: action.payload,
      };
    case CalculatorAction.SET_ANS:
      return {
        ...state,
        ans: state.output,
      };
    case CalculatorAction.TOGGLE_DEG_MODE:
      return {
        ...state,
        deg: action.payload,
      };
    case CalculatorAction.TOGGLE_INVERSE_MODE:
      return {
        ...state,
        inv: !state.inv,
      };
    case CalculatorAction.RESET_OUTPUT:
      return {
        ...state,
        output: initialState.output,
        evaled: initialState.evaled,
      };
    case CalculatorAction.RESET_STATE:
      return {
        ...initialState,
        deg: state.deg,
      };
    default:
      return initialState;
  }
};
