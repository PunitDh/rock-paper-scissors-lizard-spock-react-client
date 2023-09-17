import { RecipeAction } from "./actions";
import { Action, State } from "./types";

export const initialState: State = {
  cuisine: null,
  diet: null,
  intolerances: [],
  mealType: null,
  sortingOption: null,
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case RecipeAction.SET_CUISINE:
      return {
        ...state,
        cuisine: action.payload,
      };
    case RecipeAction.SET_DIET:
      return {
        ...state,
        diet: action.payload,
      };
    case RecipeAction.SET_MEAL_TYPE:
      return {
        ...state,
        mealType: action.payload,
      };
    case RecipeAction.SET_INTOLERANCE:
      return {
        ...state,
        intolerances: action.payload,
      };
    case RecipeAction.SET_SORTING_OPTION:
      return {
        ...state,
        sortingOption: action.payload,
      };
    case RecipeAction.RESET:
    default:
      return initialState;
  }
};
