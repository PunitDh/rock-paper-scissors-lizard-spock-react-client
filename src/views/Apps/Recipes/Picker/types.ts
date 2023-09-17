import { RecipeAction } from "./actions";
import {
  Cuisine,
  Diet,
  Intolerance,
  MealType,
  SortingOption,
} from "./constants";

export type State = {
  cuisine: Cuisine | null;
  diet: Diet | null;
  intolerances: Intolerance[] | [];
  mealType: MealType | null;
  sortingOption: SortingOption | null;
};

export type Action = {
  type: RecipeAction;
  payload?: any;
};

export type Ingredient = {
  id: string;
  name: string;
};

export type Recipe = {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  extendedIngredients: Ingredient[];
};
