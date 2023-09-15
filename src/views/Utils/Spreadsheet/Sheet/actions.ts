import Cell from "./models/Cell";
import CellData from "./models/CellData";
import StateContent from "./models/StateContent";
import StateContentData from "./models/StateContentData";
import { Action } from "./types";

export const SheetAction = Object.freeze({
  SET_SELECTED: "SET_SELECTED",
  SET_INPUT_REF: "SET_INPUT_REF",
  SET_FILLER_REF: "SET_FILLER_REF",
  SET_FORMULA_FIELD_REF: "SET_FORMULA_FIELD_REF",
  ADD_NAMED_RANGE: "ADD_NAMED_RANGE",
  SET_FORMULA_FIELD_TEXT: "SET_FORMULA_FIELD_TEXT",
  SET_FORMULA_FIELD_FOCUSED: "SET_FORMULA_FIELD_FOCUSED",
  RESET_FORMULA_FIELD: "RESET_FORMULA_FIELD",
  SET_FORMULA_MODE: "SET_FORMULA_MODE",
  SET_HOVERED: "SET_HOVERED",
  SET_SELECTED_ROW: "SET_SELECTED_ROW",
  SET_SELECTED_COLUMN: "SET_SELECTED_COLUMN",
  SET_ROW_HEIGHT: "SET_ROW_HEIGHT",
  SET_COLUMN_WIDTH: "SET_COLUMN_WIDTH",
  SELECT_ALL: "SELECT_ALL",
  HIGHLIGHT_CELLS: "HIGHLIGHT_CELLS",
  FORMULA_HIGHLIGHT_CELL_RANGE: "FORMULA_HIGHLIGHT_CELL_RANGE",
  FORMULA_HIGHLIGHT_CELLS: "FORMULA_HIGHLIGHT_CELLS",
  ADD_CELLS_TO_HIGHLIGHT: "ADD_CELLS_TO_HIGHLIGHT",
  REMOVE_CELLS_FROM_HIGHLIGHT: "REMOVE_CELLS_FROM_HIGHLIGHT",
  SET_HIGHLIGHT_CELL_ANCHOR: "SET_HIGHLIGHT_CELL_ANCHOR",
  SET_HIGHLIGHT_ROW_ANCHOR: "SET_HIGHLIGHT_ROW_ANCHOR",
  SET_HIGHLIGHT_COLUMN_ANCHOR: "SET_HIGHLIGHT_COLUMN_ANCHOR",
  DELETE_CELL_CONTENT: "DELETE_CELL_CONTENT",
  PASTE_CELL_CONTENT: "PASTE_CELL_CONTENT",
  RESET_HIGHLIGHT: "RESET_HIGHLIGHT",
  SET_MOUSEDOWN: "SET_MOUSEDOWN",
  SET_DRAGGING: "SET_DRAGGING",
  SET_FILLER_MODE: "SET_FILLER_MODE",
  SET_CONTENT_DATA: "SET_CONTENT_DATA",
  UPDATE_REFERENCE_CELLS: "UPDATE_REFERENCE_CELLS",
  SET_CONTENT_BULK: "SET_CONTENT_BULK",
  SET_CELL_FORMATTING: "SET_CELL_FORMATTING",
  SET_CELL_FORMATTING_BULK: "SET_CELL_FORMATTING_BULK",
  SET_CELL_BORDER_FORMATTING: "SET_CELL_BORDER_FORMATTING",
  SET_CELL_BORDER_FORMATTING_BULK: "SET_CELL_BORDER_FORMATTING_BULK",
  SET_CELL_OUTSIDE_BORDER_FORMATTING: "SET_CELL_OUTSIDE_BORDER_FORMATTING",
  CLEAR_CELL_FORMATTING: "CLEAR_CELL_FORMATTING",
  RECALCULATE_FORMULAE: "RECALCULATE_FORMULAE",
  OPEN_CONTEXT_MENU: "OPEN_CONTEXT_MENU",
  ADD_MEMENTO: "ADD_MEMENTO",
  UNDO_STATE: "UNDO_STATE",
  REDO_STATE: "REDO_STATE",
  RESET_STATE: "RESET_STATE",
});

export const selectCell = (payload: string | Cell) => ({
  type: SheetAction.SET_SELECTED,
  payload,
});

export const setInputRef = (payload: HTMLInputElement) => ({
  type: SheetAction.SET_INPUT_REF,
  payload,
});

export const setFillerRef = (payload: HTMLElement) => ({
  type: SheetAction.SET_FILLER_REF,
  payload,
});

export const setFormulaFieldRef = (payload: HTMLInputElement) => ({
  type: SheetAction.SET_FORMULA_FIELD_REF,
  payload,
});

export const addNamedRange = (payload: string): Action => ({
  type: SheetAction.ADD_NAMED_RANGE,
  payload,
});

export const setFormulaFieldText = (payload: string): Action => ({
  type: SheetAction.SET_FORMULA_FIELD_TEXT,
  payload,
});

export const resetFormulaField = (): Action => ({
  type: SheetAction.RESET_FORMULA_FIELD,
});

export const setFormulaFieldFocused = (payload: boolean): Action => ({
  type: SheetAction.SET_FORMULA_FIELD_FOCUSED,
  payload,
});

export const setFormulaMode = (payload: boolean): Action => ({
  type: SheetAction.SET_FORMULA_MODE,
  payload,
});

export const setHovered = (payload: string): Action => ({
  type: SheetAction.SET_HOVERED,
  payload,
});

export const setHighlightCellAnchor = (payload: string | null): Action => ({
  type: SheetAction.SET_HIGHLIGHT_CELL_ANCHOR,
  payload,
});

export const setHighlightRowAnchor = (payload: string): Action => ({
  type: SheetAction.SET_HIGHLIGHT_ROW_ANCHOR,
  payload,
});

export const setHighlightColumnAnchor = (payload: string): Action => ({
  type: SheetAction.SET_HIGHLIGHT_COLUMN_ANCHOR,
  payload,
});

export const pasteCellContent = (
  anchor: string | undefined,
  data: StateContentData
): Action => ({
  type: SheetAction.PASTE_CELL_CONTENT,
  payload: {
    anchor,
    data,
  },
});

export const deleteCellContent = (payload?: string) => ({
  type: SheetAction.DELETE_CELL_CONTENT,
  payload,
});

export const setSelectedRow = (payload: string): Action => ({
  type: SheetAction.SET_SELECTED_ROW,
  payload,
});

export const setRowHeight = (row: number, height: number): Action => ({
  type: SheetAction.SET_ROW_HEIGHT,
  payload: {
    row,
    height,
  },
});

export const setSelectedColumn = (payload: string): Action => ({
  type: SheetAction.SET_SELECTED_COLUMN,
  payload,
});

export const setColumnWidth = (column: string, width: number): Action => ({
  type: SheetAction.SET_COLUMN_WIDTH,
  payload: {
    column,
    width,
  },
});

export const selectAll = (): Action => ({
  type: SheetAction.SELECT_ALL,
});

export const highlightCells = (start: string, end?: string): Action => ({
  type: SheetAction.HIGHLIGHT_CELLS,
  payload: { start, end },
});

export const highlightFormulaCellRange = (
  start: string,
  end: string
): Action => ({
  type: SheetAction.FORMULA_HIGHLIGHT_CELL_RANGE,
  payload: {
    start,
    end,
  },
});

export const highlightFormulaCells = (payload: string[]): Action => ({
  type: SheetAction.FORMULA_HIGHLIGHT_CELLS,
  payload,
});

export const addCellsToHighlight = (payload: string[]): Action => ({
  type: SheetAction.ADD_CELLS_TO_HIGHLIGHT,
  payload,
});

export const removeCellsFromHighlight = (payload: string[]): Action => ({
  type: SheetAction.REMOVE_CELLS_FROM_HIGHLIGHT,
  payload,
});

export const openContextMenu = (payload: HTMLElement | null): Action => ({
  type: SheetAction.OPEN_CONTEXT_MENU,
  payload,
});

export const resetHighlight = (): Action => ({
  type: SheetAction.RESET_HIGHLIGHT,
});

export const setMouseDown = (payload: boolean): Action => ({
  type: SheetAction.SET_MOUSEDOWN,
  payload,
});

export const setDragging = (payload: boolean): Action => ({
  type: SheetAction.SET_DRAGGING,
  payload,
});

export const setFillerMode = (payload: boolean): Action => ({
  type: SheetAction.SET_FILLER_MODE,
  payload,
});

export const setCellContent = (cellId: string, value: string): Action => ({
  type: SheetAction.SET_CONTENT_DATA,
  payload: { cell: cellId, value },
});

export const updateReferenceCells = (
  cell: string,
  values: string[],
  replace: boolean
): Action => ({
  type: SheetAction.UPDATE_REFERENCE_CELLS,
  payload: { cell, values, replace },
});

export const setContentBulk = (payload: StateContent): Action => ({
  type: SheetAction.SET_CONTENT_BULK,
  payload,
});

export const setSelectedCellFormatting = (payload: any): Action => ({
  type: SheetAction.SET_CELL_FORMATTING,
  payload,
});

export const setCellFormattingBulk = (payload: any): Action => ({
  type: SheetAction.SET_CELL_FORMATTING_BULK,
  payload,
});

export const setCellBorderFormatting = (payload: any): Action => ({
  type: SheetAction.SET_CELL_BORDER_FORMATTING,
  payload,
});

export const setCellBorderFormattingBulk = (payload: any): Action => ({
  type: SheetAction.SET_CELL_BORDER_FORMATTING_BULK,
  payload,
});

export const setCellOutsideBorderFormatting = (payload: any): Action => ({
  type: SheetAction.SET_CELL_OUTSIDE_BORDER_FORMATTING,
  payload,
});

export const clearCellFormatting = (): Action => ({
  type: SheetAction.CLEAR_CELL_FORMATTING,
});

export const recalculateFormulae = (): Action => ({
  type: SheetAction.RECALCULATE_FORMULAE,
});

export const addMemento = (): Action => ({
  type: SheetAction.ADD_MEMENTO,
});

export const undoState = (): Action => ({
  type: SheetAction.UNDO_STATE,
});

export const redoState = (): Action => ({
  type: SheetAction.REDO_STATE,
});

export const resetState = (): Action => ({
  type: SheetAction.RESET_STATE,
});
