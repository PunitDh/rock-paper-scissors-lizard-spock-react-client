export enum MouseButton {
  LEFT_CLICK,
  RIGHT_CLICK,
}

export enum HighlightMode {
  REGULAR,
  FORMULA,
  FILLER,
}

export const SheetConfig = Object.freeze({
  COLUMNS: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  MAX_ROWS: 12,
  MAX_COLUMNS: 12,
});

export const defaultProps = {
  maxRows: SheetConfig.MAX_ROWS,
  maxColumns: SheetConfig.MAX_COLUMNS,
  maxUndos: 32,
  toolbar: true,
  formulaField: true,
  statusField: true,
  initialData: {},
  defaultRowHeight: 24,
  defaultColumnWidth: 80,
};

export enum KeyEvent {
  ENTER = "Enter",
  ESCAPE = "Escape",
  TAB = "Tab",
  ARROW_UP = "ArrowUp",
  ARROW_DOWN = "ArrowDown",
  ARROW_LEFT = "ArrowLeft",
  ARROW_RIGHT = "ArrowRight",
  SHIFT = "Shift",
  BACKSPACE = "Backspace",
  COMMAND = "Meta",
  CONTROL = "Control",
  ALT = "Alt",
  LOWERCASE_A = "a",
  LOWERCASE_C = "c",
  LOWERCASE_X = "x",
  LOWERCASE_Z = "z",
}

export enum Dimension {
  ROW = "row",
  COLUMN = "column",
}

export const FILE_TYPE = "_sheet";

export const Formula = ["SUM(", "AVG("];

export const getFirstColumnCharCode = () =>
  SheetConfig.COLUMNS[0].charCodeAt(0);
export const getLastColumnCharCode = (maxColumns) =>
  SheetConfig.COLUMNS[maxColumns].charCodeAt(0);
