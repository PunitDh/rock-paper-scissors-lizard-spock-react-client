import { PickerAction } from "./actions";

export const initialState = {
  maxCarat: 256 ** 3 - 1,
  carat: null,
  context: null,
  rgb: { r: 0, g: 0, b: 0 },
  rect: null,
};

export const reducer = (state, action) => {
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
