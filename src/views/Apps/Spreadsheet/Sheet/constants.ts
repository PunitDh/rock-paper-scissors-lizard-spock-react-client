export enum MouseButton {
  LEFT_CLICK = 0,
  RIGHT_CLICK = 1,
}

export const SheetConfig = {
  COLUMNS: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  MAX_ROWS: 12,
  MAX_COLUMNS: 12,
  FILE_TYPE: "_sheet",
} as const;

export const defaultInitialStateProps = {
  maxRows: SheetConfig.MAX_ROWS,
  maxColumns: SheetConfig.MAX_COLUMNS,
  activeSheet: "Sheet 1",
  maxUndos: 64,
  toolbar: true,
  formulaField: true,
  statusField: true,
  defaultRowHeight: 24,
  defaultColumnWidth: 80,
} as const;

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

export const getFirstColumnCharCode = (): number =>
  SheetConfig.COLUMNS[0].charCodeAt(0);

export const getLastColumnCharCode = (maxColumns?: number): number =>
  SheetConfig.COLUMNS[maxColumns || SheetConfig.MAX_COLUMNS].charCodeAt(0);
