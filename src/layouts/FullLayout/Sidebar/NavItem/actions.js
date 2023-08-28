export const NavItemAction = Object.freeze({
  CONTEXT_MENU_OPEN: "CONTEXT_MENU_OPEN",
  CONFIRM_RENAME: "CONFIRM_RENAME",
  CONFIRM_DELETE: "CONFIRM_DELETE",
  SET_ANCHOR_EL: "SET_ANCHOR_EL",
  RESET_ANCHOR_EL: "RESET_ANCHOR_EL",
  RESET_STATE: "RESET_STATE",
});

export const setAnchorEl = (payload) => ({
  type: NavItemAction.SET_ANCHOR_EL,
  payload,
});

export const showConfirmRename = (payload) => ({
  type: NavItemAction.CONFIRM_RENAME,
  payload,
});

export const showConfirmDelete = (payload) => ({
  type: NavItemAction.CONFIRM_DELETE,
  payload,
});

export const resetAnchorEl = () => ({
  type: NavItemAction.RESET_ANCHOR_EL,
});

export const resetState = () => ({
  type: NavItemAction.RESET_STATE,
});
