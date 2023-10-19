import { PickerAction } from "./actions";
import { Action, State } from "./types";

export const initialState: State = {
  maxCarat: 256 ** 3 - 1,
  carat: 0,
  context: null,
  rgb: { r: 0, g: 0, b: 0 },
  rect: null,
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case PickerAction.SET_CARAT:
      return {
        ...state,
        carat: action.payload,
      };
    case PickerAction.SET_RGB:
      return {
        ...state,
        rgb: action.payload,
      };
    case PickerAction.SET_RECT:
      return {
        ...state,
        rect: action.payload,
      };
    case PickerAction.SET_CONTEXT:
      return {
        ...state,
        context: action.payload,
      };
    case PickerAction.RESET_STATE:
    default:
      return initialState;
  }
};
