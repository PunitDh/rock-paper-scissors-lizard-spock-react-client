export const SheetAction = Object.freeze({
  SET_SELECTED: "SET_SELECTED",
  SET_INPUT_TEXT: "SET_INPUT_TEXT",
  SET_EDIT_MODE: "SET_EDIT_MODE",
  SET_SHIFT_KEY: "SET_SHIFT_KEY",
  SET_HOVERED: "SET_HOVERED",
  SET_SELECTED_ROW: "SET_SELECTED_ROW",
  SET_SELECTED_COLUMN: "SET_SELECTED_COLUMN",
  SET_HIGHLIGHTED_CELLS: "SET_HIGHLIGHTED_CELLS",
  SET_HIGHLIGHTED_ANCHOR: "SET_HIGHLIGHTED_ANCHOR",
  SET_HIGHLIGHTED_CURRENT: "SET_HIGHLIGHTED_CURRENT",
  RESET_HIGHLIGHTED: "RESET_HIGHLIGHTED",
  SET_MOUSEDOWN: "SET_MOUSEDOWN",
  SET_CONTENT: "SET_CONTENT",
  SET_MENU_ANCHOR_ELEMENT: "SET_MENU_ANCHOR_ELEMENT",
  RESET_STATE: "RESET_STATE",
});

export const setSelected = (payload) => ({
  type: SheetAction.SET_SELECTED,
  payload,
});

export const setInputText = (payload) => ({
  type: SheetAction.SET_INPUT_TEXT,
  payload,
});

export const setEditMode = (payload) => ({
  type: SheetAction.SET_EDIT_MODE,
  payload,
});

export const setShiftKey = (payload) => ({
  type: SheetAction.SET_SHIFT_KEY,
  payload,
});

export const setHovered = (payload) => ({
  type: SheetAction.SET_HOVERED,
  payload,
});

export const setHighlightedAnchor = (payload) => ({
  type: SheetAction.SET_HIGHLIGHTED_ANCHOR,
  payload,
});

export const setHighlightedCurrent = (payload) => ({
  type: SheetAction.SET_HIGHLIGHTED_CURRENT,
  payload,
});

export const setSelectedRow = (payload) => ({
  type: SheetAction.SET_SELECTED_ROW,
  payload,
});

export const setSelectedColumn = (payload) => ({
  type: SheetAction.SET_SELECTED_COLUMN,
  payload,
});

export const setHighlightedCells = (payload) => ({
  type: SheetAction.SET_HIGHLIGHTED_CELLS,
  payload,
});

export const setMenuAnchorElement = (payload) => ({
  type: SheetAction.SET_MENU_ANCHOR_ELEMENT,
  payload,
});

export const resetHighlighted = () => ({
  type: SheetAction.RESET_HIGHLIGHTED,
});

export const setMouseDown = (payload) => ({
  type: SheetAction.SET_MOUSEDOWN,
  payload,
});

export const setContent = (payload) => ({
  type: SheetAction.SET_CONTENT,
  payload,
});

export const resetState = () => ({
  type: SheetAction.RESET_STATE,
});
