import { CalculatorAction } from "./actions";

export const initialState = {
  // input: "4sin(90)+8cos(10)+9tan(80)+4log(4)+2.5ln(5)+24atan(4)+14Ans+14E-4π-2√3",
  input: [],
  output: 0,
  evaled: false,
  degrees: false,
  inverse: false,
  answer: 0,
  parsedInput: "",
  memory: {
    M1: { value: 0, filled: false },
    M2: { value: 0, filled: false },
    M3: { value: 0, filled: false },
    M4: { value: 0, filled: false },
    M5: { value: 0, filled: false },
    M6: { value: 0, filled: false },
    M7: { value: 0, filled: false },
    M8: { value: 0, filled: false },
  },
  history: [],
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
        output: action.payload.value,
        answer: action.payload.value,
        parsedInput: action.payload.parsedInput,
        evaled: true,
        history: [
          ...state.history,
          {
            input: state.input,
            output: action.payload.value,
          },
        ],
      };
    case CalculatorAction.SET_EVALED:
      return {
        ...state,
        evaled: action.payload,
      };
    case CalculatorAction.SET_DEBUG_VALUE:
      return {
        ...state,
        parsedInput: action.payload,
      };
    case CalculatorAction.SET_INVERSE_MODE:
      return {
        ...state,
        inverse: action.payload,
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
        evaled: false,
      };
    case CalculatorAction.ADD_MEMORY:
      return {
        ...state,
        memory: {
          ...state.memory,
          [action.payload.address]: {
            value: action.payload.value,
            filled: true,
          },
        },
      };
    case CalculatorAction.REMOVE_MEMORY:
      return {
        ...state,
        memory: {
          ...state.memory,
          [action.payload]: { filled: false, value: 0 },
        },
      };
    case CalculatorAction.CLEAR_MEMORY:
      return {
        ...state,
        memory: initialState.memory,
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
        history: state.history,
        memory: state.memory,
        degrees: state.degrees,
      };
    default:
      return initialState;
  }
};
