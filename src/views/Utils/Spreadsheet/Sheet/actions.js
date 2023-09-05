export const SheetAction = Object.freeze({
  SET_SELECTED: "SET_SELECTED",
  SET_FORMULA_FIELD_TEXT: "SET_FORMULA_FIELD_TEXT",
  SET_FORMULA_FIELD_FOCUSED: "SET_FORMULA_FIELD_FOCUSED",
  SET_EDIT_MODE: "SET_EDIT_MODE",
  SET_FORMULA_MODE: "SET_FORMULA_MODE",
  SET_SHIFT_KEY: "SET_SHIFT_KEY",
  SET_COMMAND_KEY: "SET_COMMAND_KEY",
  SET_CONTROL_KEY: "SET_CONTROL_KEY",
  SET_ALT_KEY: "SET_ALT_KEY",
  SET_HOVERED: "SET_HOVERED",
  SET_SELECTED_ROW: "SET_SELECTED_ROW",
  SET_SELECTED_COLUMN: "SET_SELECTED_COLUMN",
  SELECT_ALL: "SELECT_ALL",
  HIGHLIGHT_CELLS: "HIGHLIGHT_CELLS",
  SET_HIGHLIGHT_ANCHOR: "SET_HIGHLIGHT_ANCHOR",
  SET_HIGHLIGHT_CURRENT: "SET_HIGHLIGHT_CURRENT",
  DELETE_CELL_CONTENT: "DELETE_CELL_CONTENT",
  CUT_CELL_CONTENT: "CUT_CELL_CONTENT",
  COPY_CELL_CONTENT: "COPY_CELL_CONTENT",
  PASTE_CELL_CONTENT: "PASTE_CELL_CONTENT",
  RESET_HIGHLIGHT: "RESET_HIGHLIGHT",
  SET_MOUSEDOWN: "SET_MOUSEDOWN",
  SET_CONTENT: "SET_CONTENT",
  RECALCULATE_FORMULAE: "RECALCULATE_FORMULAE",
  SET_MENU_ANCHOR_ELEMENT: "SET_MENU_ANCHOR_ELEMENT",
  RESET_STATE: "RESET_STATE",
});

export const selectCell = (payload) => ({
  type: SheetAction.SET_SELECTED,
  payload,
});

export const setFormulaFieldText = (payload) => ({
  type: SheetAction.SET_FORMULA_FIELD_TEXT,
  payload,
});

export const setInputTextFocused = (payload) => ({
  type: SheetAction.SET_FORMULA_FIELD_FOCUSED,
  payload,
});

export const setEditMode = (payload) => ({
  type: SheetAction.SET_EDIT_MODE,
  payload,
});

export const setFormulaMode = (payload) => ({
  type: SheetAction.SET_FORMULA_MODE,
  payload,
});

export const setShiftKey = (payload) => ({
  type: SheetAction.SET_SHIFT_KEY,
  payload,
});

export const setCommandKey = (payload) => ({
  type: SheetAction.SET_COMMAND_KEY,
  payload,
});

export const setControlKey = (payload) => ({
  type: SheetAction.SET_CONTROL_KEY,
  payload,
});

export const setAltKey = (payload) => ({
  type: SheetAction.SET_ALT_KEY,
  payload,
});

export const setHovered = (payload) => ({
  type: SheetAction.SET_HOVERED,
  payload,
});

export const setHighlightAnchor = (payload) => ({
  type: SheetAction.SET_HIGHLIGHT_ANCHOR,
  payload,
});

export const setHighlightCurrent = (payload) => ({
  type: SheetAction.SET_HIGHLIGHT_CURRENT,
  payload,
});

export const cutCellContent = () => ({
  type: SheetAction.CUT_CELL_CONTENT,
});

export const copyCellContent = () => ({
  type: SheetAction.COPY_CELL_CONTENT,
});

export const pasteCellContent = (data, anchor) => ({
  type: SheetAction.PASTE_CELL_CONTENT,
  payload: {
    data,
    anchor,
  },
});

export const deleteCellContent = () => ({
  type: SheetAction.DELETE_CELL_CONTENT,
});

export const setSelectedRow = (payload) => ({
  type: SheetAction.SET_SELECTED_ROW,
  payload,
});

export const setSelectedColumn = (payload) => ({
  type: SheetAction.SET_SELECTED_COLUMN,
  payload,
});

export const selectAll = () => ({
  type: SheetAction.SELECT_ALL,
});

export const highlightCells = (start, end) => ({
  type: SheetAction.HIGHLIGHT_CELLS,
  start,
  end,
});

export const setMenuAnchorElement = (payload) => ({
  type: SheetAction.SET_MENU_ANCHOR_ELEMENT,
  payload,
});

export const resetHighlight = () => ({
  type: SheetAction.RESET_HIGHLIGHT,
});

export const setMouseDown = (payload) => ({
  type: SheetAction.SET_MOUSEDOWN,
  payload,
});

export const setContent = (cell, value) => ({
  type: SheetAction.SET_CONTENT,
  payload: { cell, value },
});

export const recalculateFormulae = () => ({
  type: SheetAction.RECALCULATE_FORMULAE,
});

export const resetState = () => ({
  type: SheetAction.RESET_STATE,
});
