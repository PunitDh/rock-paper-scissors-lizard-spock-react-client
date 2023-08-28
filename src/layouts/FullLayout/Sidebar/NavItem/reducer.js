import { NavItemAction } from "./actions";

export const initialState = {
  anchorEl: null,
  confirmRename: false,
  confirmDelete: false,
};

export const reducer = (state, action) => {
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
      return initialState;
  }
};
