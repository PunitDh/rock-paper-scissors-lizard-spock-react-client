import { CalculatorAction } from "./actions";

export const initialState = {
  // input: "4sin(90)+8cos(10)+9tan(80)+4log(4)+2.5ln(5)+24atan(4)+14Ans+14E-4π-2√3",
  input: [],
  output: 0,
  evaled: false,
  degrees: false,
  inverse: false,
  answer: 0,
  debugValue: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case CalculatorAction.ADD_INPUT:
      return {
        ...state,
        input: [...state.input, ...action.payload],
      };
    case CalculatorAction.SET_OUTPUT:
      return {
        ...state,
        output: action.payload,
        answer: action.payload,
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
        answer: state.output,
      };
    case CalculatorAction.TOGGLE_DEG_MODE:
      return {
        ...state,
        degrees: action.payload,
      };
    case CalculatorAction.TOGGLE_INVERSE_MODE:
      return {
        ...state,
        inverse: !state.inverse,
      };
    case CalculatorAction.BACKSPACE:
      return {
        ...state,
        input: state.input.slice(0, -1),
      };
    case CalculatorAction.RESET_OUTPUT:
      return {
        ...state,
        evaled: initialState.evaled,
        input: initialState.input,
      };
    case CalculatorAction.RESET_STATE:
      return {
        ...initialState,
        degrees: state.degrees,
      };
    default:
      return initialState;
  }
};
