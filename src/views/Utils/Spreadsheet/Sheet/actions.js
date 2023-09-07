export const SheetAction = Object.freeze({
  SET_SELECTED: "SET_SELECTED",
  SET_FORMULA_FIELD_TEXT: "SET_FORMULA_FIELD_TEXT",
  SET_FORMULA_FIELD_FOCUSED: "SET_FORMULA_FIELD_FOCUSED",
  SET_INPUT_BOX_FOCUSED: "SET_INPUT_BOX_FOCUSED",
  RESET_FORMULA_FIELD: "RESET_FORMULA_FIELD",
  SET_EDIT_MODE: "SET_EDIT_MODE",
  SET_FORMULA_MODE: "SET_FORMULA_MODE",
  SET_HOVERED: "SET_HOVERED",
  SET_SELECTED_ROW: "SET_SELECTED_ROW",
  SET_ROW_HEIGHT: "SET_ROW_HEIGHT",
  SET_SELECTED_COLUMN: "SET_SELECTED_COLUMN",
  SET_COLUMN_WIDTH: "SET_COLUMN_WIDTH",
  SELECT_ALL: "SELECT_ALL",
  HIGHLIGHT_CELLS: "HIGHLIGHT_CELLS",
  FORMULA_HIGHLIGHT_CELL_RANGE: "FORMULA_HIGHLIGHT_CELL_RANGE",
  FORMULA_HIGHLIGHT_CELLS: "FORMULA_HIGHLIGHT_CELLS",
  ADD_CELLS_TO_HIGHLIGHT: "ADD_CELLS_TO_HIGHLIGHT",
  SET_HIGHLIGHT_ANCHOR: "SET_HIGHLIGHT_ANCHOR",
  SET_HIGHLIGHT_CURRENT: "SET_HIGHLIGHT_CURRENT",
  DELETE_CELL_CONTENT: "DELETE_CELL_CONTENT",
  PASTE_CELL_CONTENT: "PASTE_CELL_CONTENT",
  RESET_HIGHLIGHT: "RESET_HIGHLIGHT",
  SET_MOUSEDOWN: "SET_MOUSEDOWN",
  SET_CONTENT: "SET_CONTENT",
  SET_CONTENT_BULK: "SET_CONTENT_BULK",
  SET_CELL_FORMATTING: "SET_CELL_FORMATTING",
  SET_CELL_FORMATTING_BULK: "SET_CELL_FORMATTING_BULK",
  RECALCULATE_FORMULAE: "RECALCULATE_FORMULAE",
  OPEN_CONTEXT_MENU: "OPEN_CONTEXT_MENU",
  ADD_MEMENTO: "ADD_MEMENTO",
  UNDO_STATE: "UNDO_STATE",
  REDO_STATE: "REDO_STATE",
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

export const setInputBoxFocused = (payload) => ({
  type: SheetAction.SET_INPUT_BOX_FOCUSED,
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

export const setRowHeight = (row, height) => ({
  type: SheetAction.SET_ROW_HEIGHT,
  payload: {
    row,
    height,
  },
});

export const setSelectedColumn = (payload) => ({
  type: SheetAction.SET_SELECTED_COLUMN,
  payload,
});

export const setColumnWidth = (column, width) => ({
  type: SheetAction.SET_COLUMN_WIDTH,
  payload: {
    column,
    width,
  },
});

export const selectAll = () => ({
  type: SheetAction.SELECT_ALL,
});

export const highlightCells = (start, end) => ({
  type: SheetAction.HIGHLIGHT_CELLS,
  start,
  end,
});

export const formulaHighlightCellRange = (start, end) => ({
  type: SheetAction.FORMULA_HIGHLIGHT_CELL_RANGE,
  payload: {
    start,
    end,
  },
});

export const formulaHighlightCells = (payload) => ({
  type: SheetAction.FORMULA_HIGHLIGHT_CELLS,
  payload,
});

export const addCellsToHighlight = (payload) => ({
  type: SheetAction.ADD_CELLS_TO_HIGHLIGHT,
  payload,
});

export const openContextMenu = (payload) => ({
  type: SheetAction.OPEN_CONTEXT_MENU,
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

export const setSelectedCellFormatting = (payload) => ({
  type: SheetAction.SET_CELL_FORMATTING,
  payload,
});

export const setCellFormattingBulk = (payload) => ({
  type: SheetAction.SET_CELL_FORMATTING_BULK,
  payload,
});

export const recalculateFormulae = () => ({
  type: SheetAction.RECALCULATE_FORMULAE,
});

export const addMemento = () => ({
  type: SheetAction.ADD_MEMENTO,
});

export const undoState = () => ({
  type: SheetAction.UNDO_STATE,
});

export const redoState = () => ({
  type: SheetAction.REDO_STATE,
});

export const resetState = () => ({
  type: SheetAction.RESET_STATE,
});
