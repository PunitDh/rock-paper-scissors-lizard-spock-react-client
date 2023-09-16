import { RecipeAction } from "./actions";

export const initialState = {
  maxCarat: 256 ** 3 - 1,
  carat: null,
  context: null,
  rgb: { r: 0, g: 0, b: 0 },
  rect: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case RecipeAction.SET_CARAT:
      return {
        ...state,
        carat: action.payload,
      };
    case RecipeAction.SET_RGB:
      return {
        ...state,
        rgb: action.payload,
      };
    case RecipeAction.SET_RECT:
      return {
        ...state,
        rect: action.payload,
      };
    case RecipeAction.SET_CONTEXT:
      return {
        ...state,
        context: action.payload,
      };
    case RecipeAction.RESET_STATE:
    default:
      return initialState;
  }
};
