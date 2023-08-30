import { CalculatorAction } from "./actions";

export const initialState = {
  input: "",
  output: 0,
  evaled: false,
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
      };
    case CalculatorAction.SET_EVALED:
      return {
        ...state,
        evaled: action.payload,
      };
    case CalculatorAction.RESET_OUTPUT:
      return {
        ...state,
        output: initialState.output,
      };
    case CalculatorAction.RESET_STATE:
    default:
      return initialState;
  }
};
