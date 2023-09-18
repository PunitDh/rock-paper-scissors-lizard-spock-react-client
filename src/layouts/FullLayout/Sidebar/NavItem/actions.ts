import { Action } from "../types";

export enum NavItemAction {
  CONTEXT_MENU_OPEN,
  CONFIRM_RENAME,
  CONFIRM_DELETE,
  SET_ANCHOR_EL,
  RESET_ANCHOR_EL,
  RESET_STATE,
}

export const setAnchorEl = (payload: HTMLElement | null): Action => ({
  type: NavItemAction.SET_ANCHOR_EL,
  payload,
});

export const showConfirmRename = (payload: boolean): Action => ({
  type: NavItemAction.CONFIRM_RENAME,
  payload,
});

export const showConfirmDelete = (payload: boolean): Action => ({
  type: NavItemAction.CONFIRM_DELETE,
  payload,
});

export const resetAnchorEl = (): Action => ({
  type: NavItemAction.RESET_ANCHOR_EL,
});

export const resetState = (): Action => ({
  type: NavItemAction.RESET_STATE,
});
