import {
  Cuisine,
  Diet,
  Intolerance,
  MealType,
  SortingOption,
} from "./constants";

export enum RecipeAction {
  SET_CUISINE,
  SET_DIET,
  SET_INTOLERANCE,
  SET_MEAL_TYPE,
  SET_SORTING_OPTION,
  RESET,
}

export const setDiet = (payload: Diet) => ({
  type: RecipeAction.SET_DIET,
  payload,
});

export const setIntolerance = (payload: Intolerance) => ({
  type: RecipeAction.SET_INTOLERANCE,
  payload,
});

export const setCuisine = (payload: Cuisine) => ({
  type: RecipeAction.SET_CUISINE,
  payload,
});

export const setMealType = (payload: MealType) => ({
  type: RecipeAction.SET_MEAL_TYPE,
  payload,
});

export const setSortingOption = (payload: SortingOption) => ({
  type: RecipeAction.SET_SORTING_OPTION,
  payload,
});

export const resetState = () => ({
  type: RecipeAction.RESET,
});
