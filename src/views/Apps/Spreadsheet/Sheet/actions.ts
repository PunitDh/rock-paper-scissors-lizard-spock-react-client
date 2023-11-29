import SetExtended from "../../../../utils/Set";
import { AutoCalculate } from "./components/Toolbar/constants";
import Cell from "./models/Cell";
import SheetContent from "./models/SheetContent";
import SheetContentData from "./models/SheetContentData";
import {
  Action,
  CellId,
  CellValue,
  InsertColumnLocation,
  InsertRowLocation,
  Sheet,
  SheetId,
} from "./types";

export enum SheetAction {
  SET_SELECTED,
  SET_INPUT_REF,
  SET_FILLER_REF,
  SET_FORMULA_FIELD_REF,
  ADD_NAMED_RANGE,
  SET_FORMULA_FIELD_TEXT,
  SET_FORMULA_FIELD_FOCUSED,
  RESET_FORMULA_FIELD,
  SET_FORMULA_MODE,
  SET_HOVERED,
  SET_SELECTED_ROW,
  SET_SELECTED_COLUMN,
  SET_ROW_HEIGHT,
  SET_COLUMN_WIDTH,
  INSERT_ROW,
  INSERT_COLUMN,
  DELETE_ROW,
  DELETE_COLUMN,
  SELECT_ALL,
  HIGHLIGHT_CELLS,
  SET_SHEETS,
  ADD_SHEET,
  RENAME_SHEET,
  MOVE_SHEET,
  DELETE_SHEET,
  PROTECT_SHEET,
  SET_ACTIVE_SHEET,
  SET_SHEET_INDEX,
  FORMULA_HIGHLIGHT_CELL_RANGE,
  FORMULA_HIGHLIGHT_CELLS,
  ADD_CELLS_TO_HIGHLIGHT,
  REMOVE_CELLS_FROM_HIGHLIGHT,
  SET_HIGHLIGHT_CELL_ANCHOR,
  SET_HIGHLIGHT_ROW_ANCHOR,
  SET_HIGHLIGHT_COLUMN_ANCHOR,
  DELETE_CELL_CONTENT,
  PASTE_CELL_CONTENT,
  RESET_HIGHLIGHT,
  SET_MOUSEDOWN,
  SET_DRAGGING,
  SET_FILLER_MODE,
  SET_CELL_CONTENT,
  UPDATE_REFERENCE_CELLS,
  SET_CONTENT_BULK,
  SET_CELL_FORMATTING,
  SET_CELL_FORMATTING_BULK,
  SET_CELL_BORDER_FORMATTING,
  SET_CELL_BORDER_FORMATTING_BULK,
  SET_CELL_OUTSIDE_BORDER_FORMATTING,
  CLEAR_CELL_FORMATTING,
  RECALCULATE_FORMULAE,
  AUTO_CALCULATE,
  OPEN_CONTEXT_MENU,
  SAVE_INITIAL_STATE,
  ADD_MEMENTO,
  UNDO_STATE,
  REDO_STATE,
  RESET_STATE,
}

export const selectCell = (payload: CellId | Cell): Action => ({
  type: SheetAction.SET_SELECTED,
  payload,
});

export const setInputRef = (payload: HTMLInputElement): Action => ({
  type: SheetAction.SET_INPUT_REF,
  payload,
});

export const setFillerRef = (payload: HTMLElement): Action => ({
  type: SheetAction.SET_FILLER_REF,
  payload,
});

export const setFormulaFieldRef = (payload: HTMLInputElement): Action => ({
  type: SheetAction.SET_FORMULA_FIELD_REF,
  payload,
});

export const addNamedRange = (payload: string): Action => ({
  type: SheetAction.ADD_NAMED_RANGE,
  payload,
});

export const setFormulaFieldText = (payload: CellValue): Action => ({
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

export const setHovered = (payload: CellId): Action => ({
  type: SheetAction.SET_HOVERED,
  payload,
});

export const setHighlightCellAnchor = (payload: CellId | null): Action => ({
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
  anchor: CellId | undefined,
  data: SheetContentData | string
): Action => ({
  type: SheetAction.PASTE_CELL_CONTENT,
  payload: {
    anchor,
    data,
  },
});

export const deleteCellContent = (payload?: CellId): Action => ({
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

export const insertRow = (payload: InsertRowLocation): Action => ({
  type: SheetAction.INSERT_ROW,
  payload,
});

export const insertColumn = (payload: InsertColumnLocation): Action => ({
  type: SheetAction.INSERT_COLUMN,
  payload,
});

export const deleteRow = (): Action => ({
  type: SheetAction.DELETE_ROW,
});

export const deleteColumn = (): Action => ({
  type: SheetAction.DELETE_COLUMN,
});

export const selectAll = (): Action => ({
  type: SheetAction.SELECT_ALL,
});

export const highlightCells = (start: CellId, end?: CellId): Action => ({
  type: SheetAction.HIGHLIGHT_CELLS,
  payload: { start, end },
});

export const setSheets = (payload: { [key: SheetId]: Sheet }): Action => ({
  type: SheetAction.SET_SHEETS,
  payload,
});

export const addSheet = (): Action => ({
  type: SheetAction.ADD_SHEET,
});

export const renameSheet = (sheetId: SheetId, sheetName: string): Action => ({
  type: SheetAction.RENAME_SHEET,
  payload: {
    sheetId,
    sheetName,
  },
});

export const moveSheet = (sheetId: SheetId, offset: number): Action => ({
  type: SheetAction.MOVE_SHEET,
  payload: {
    sheetId,
    offset,
  },
});

export const deleteSheet = (payload: SheetId): Action => ({
  type: SheetAction.DELETE_SHEET,
  payload,
});

export const protectSheet = (sheetId: SheetId, password: string): Action => ({
  type: SheetAction.PROTECT_SHEET,
  payload: {
    sheetId,
    password,
  },
});

export const setActiveSheet = (payload: SheetId): Action => ({
  type: SheetAction.SET_ACTIVE_SHEET,
  payload,
});

export const setSheetIndex = (sheetId: SheetId, index: number): Action => ({
  type: SheetAction.SET_SHEET_INDEX,
  payload: {
    sheetId,
    index,
  },
});

export const highlightFormulaCellRange = (
  start: CellId,
  end: CellId
): Action => ({
  type: SheetAction.FORMULA_HIGHLIGHT_CELL_RANGE,
  payload: {
    start,
    end,
  },
});

export const highlightFormulaCells = (
  payload: SetExtended<string>
): Action => ({
  type: SheetAction.FORMULA_HIGHLIGHT_CELLS,
  payload,
});

export const addCellsToHighlight = (
  cellIds: CellId[],
  multiSelect: boolean = false
): Action => ({
  type: SheetAction.ADD_CELLS_TO_HIGHLIGHT,
  payload: {
    cellIds,
    multiSelect,
  },
});

export const removeCellsFromHighlight = (payload: CellId[]): Action => ({
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

export const setCellContent = (cellId: CellId, value: string): Action => ({
  type: SheetAction.SET_CELL_CONTENT,
  payload: { cell: cellId, value },
});

export const updateReferenceCells = (
  cellId: CellId,
  values: CellId[],
  replace: boolean
): Action => ({
  type: SheetAction.UPDATE_REFERENCE_CELLS,
  payload: { cell: cellId, values, replace },
});

export const setContentBulk = (payload: SheetContent): Action => ({
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

export const autoCalculate = (payload: AutoCalculate): Action => ({
  type: SheetAction.AUTO_CALCULATE,
  payload,
});

export const recalculateFormulae = (): Action => ({
  type: SheetAction.RECALCULATE_FORMULAE,
});

export const saveInitialState = (): Action => ({
  type: SheetAction.SAVE_INITIAL_STATE,
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
