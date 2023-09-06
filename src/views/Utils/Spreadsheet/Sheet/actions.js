export const SheetAction = Object.freeze({
  SET_SELECTED: "SET_SELECTED",
  SET_FORMULA_FIELD_TEXT: "SET_FORMULA_FIELD_TEXT",
  SET_FORMULA_FIELD_FOCUSED: "SET_FORMULA_FIELD_FOCUSED",
  RESET_FORMULA_FIELD: "RESET_FORMULA_FIELD",
  SET_EDIT_MODE: "SET_EDIT_MODE",
  SET_FORMULA_MODE: "SET_FORMULA_MODE",
  SET_HOVERED: "SET_HOVERED",
  SET_SELECTED_ROW: "SET_SELECTED_ROW",
  SET_SELECTED_COLUMN: "SET_SELECTED_COLUMN",
  SELECT_ALL: "SELECT_ALL",
  HIGHLIGHT_CELLS: "HIGHLIGHT_CELLS",
  ADD_CELLS_TO_HIGHLIGHT: "ADD_CELLS_TO_HIGHLIGHT",
  SET_HIGHLIGHT_ANCHOR: "SET_HIGHLIGHT_ANCHOR",
  SET_HIGHLIGHT_CURRENT: "SET_HIGHLIGHT_CURRENT",
  DELETE_CELL_CONTENT: "DELETE_CELL_CONTENT",
  PASTE_CELL_CONTENT: "PASTE_CELL_CONTENT",
  RESET_HIGHLIGHT: "RESET_HIGHLIGHT",
  SET_MOUSEDOWN: "SET_MOUSEDOWN",
  SET_CONTENT: "SET_CONTENT",
  SET_CONTENT_BULK: "SET_CONTENT_BULK",
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

export const resetFormulaField = () => ({
  type: SheetAction.RESET_FORMULA_FIELD,
});

export const setFormulaFieldFocused = (payload) => ({
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

export const pasteCellContent = (anchor, data) => ({
  type: SheetAction.PASTE_CELL_CONTENT,
  payload: {
    data,
    anchor,
  },
});

export const deleteCellContent = (payload) => ({
  type: SheetAction.DELETE_CELL_CONTENT,
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

export const selectAll = () => ({
  type: SheetAction.SELECT_ALL,
});

export const highlightCells = (start, end) => ({
  type: SheetAction.HIGHLIGHT_CELLS,
  start,
  end,
});

export const addCellsToHighlight = (payload) => ({
  type: SheetAction.ADD_CELLS_TO_HIGHLIGHT,
  payload,
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

export const setContentBulk = (payload) => ({
  type: SheetAction.SET_CONTENT_BULK,
  payload,
});

export const recalculateFormulae = () => ({
  type: SheetAction.RECALCULATE_FORMULAE,
});

export const resetState = () => ({
  type: SheetAction.RESET_STATE,
});
