export enum RecipeAction {
  SET_CARAT,
  SET_CONTEXT,
  SET_RGB,
  SET_RECT,
  RESET_STATE,
}

export const setCarat = (payload) => ({
  type: RecipeAction.SET_CARAT,
  payload,
});

export const setRGB = (payload) => ({
  type: RecipeAction.SET_RGB,
  payload,
});

export const setRect = (payload) => ({
  type: RecipeAction.SET_RECT,
  payload,
});

export const setContext = (payload) => ({
  type: RecipeAction.SET_CONTEXT,
  payload,
});

export const resetState = () => ({
  type: RecipeAction.RESET_STATE,
});
