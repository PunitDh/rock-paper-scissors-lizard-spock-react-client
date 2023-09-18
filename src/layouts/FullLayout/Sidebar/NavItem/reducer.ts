import { NavItemAction } from "./actions";
import { Action, State } from "../types";

export const initialState: State = {
  anchorEl: null,
  confirmRename: false,
  confirmDelete: false,
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case NavItemAction.CONFIRM_RENAME:
      return {
        ...state,
        confirmRename: action.payload,
        anchorEl: action.payload ? state.anchorEl : null,
      };
    case NavItemAction.CONFIRM_DELETE:
      return {
        ...state,
        confirmDelete: action.payload,
        anchorEl: action.payload ? state.anchorEl : null,
      };
    case NavItemAction.SET_ANCHOR_EL:
      return {
        ...state,
        anchorEl: action.payload,
      };
    case NavItemAction.RESET_ANCHOR_EL:
      return {
        ...state,
        anchorEl: null,
      };
    case NavItemAction.RESET_STATE:
      return initialState;
    default:
      return {} as never;
  }
};
