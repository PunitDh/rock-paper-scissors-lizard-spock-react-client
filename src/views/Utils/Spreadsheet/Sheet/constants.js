export const MouseButton = Object.freeze({
  LEFT_CLICK: 0,
  RIGHT_CLICK: 1,
});

export const SheetConfig = Object.freeze({
  COLUMNS: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  MAX_ROWS: 12,
  MAX_COLUMNS: 12,
});

export const KeyEvent = Object.freeze({
  ENTER: "Enter",
  ESCAPE: "Escape",
  TAB: "Tab",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  SHIFT: "Shift",
  BACKSPACE: "Backspace",
  COMMAND: "Meta",
  CONTROL: "Control",
  ALT: "Alt",
  LOWERCASE_A: "a",
  LOWERCASE_Z: "z",
});

export const Calc = Object.freeze({
  ANS: "Ans",
  DEG: "Deg",
  OPERATIONS: ["+", "-", "*", "/", "^"],
});

export const Dimension = Object.freeze({
  ROW: "row",
  COLUMN: "column",
});

export const Formula = ["SUM(", "AVG("];

export const getFirstColumnCharCode = () =>
  SheetConfig.COLUMNS[0].charCodeAt(0);
export const getLastColumnCharCode = (maxColumns) =>
  SheetConfig.COLUMNS[maxColumns].charCodeAt(0);
