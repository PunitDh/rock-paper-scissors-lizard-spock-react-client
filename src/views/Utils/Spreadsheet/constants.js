export const MouseButton = {
  LEFT_CLICK: 0,
  RIGHT_CLICK: 1,
};

export const SheetConfig = {
  COLUMNS: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  MAX_ROWS: 12,
  MAX_COLUMNS: 12,
};

export const KeyboardEvent = {
  ENTER: "Enter",
  ESCAPE: "Escape",
  TAB: "Tab",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  SHIFT: "Shift",
  BACKSPACE: "Backspace",
};

export const Calc = {
  ANS: "Ans",
  DEG: "Deg",
  OPERATIONS: ["+", "-", "*", "/", "^"],
};

export const Formula = [
  "SUM(",
  "AVG(",
  
]

export const MIN_COLUMN = SheetConfig.COLUMNS[0].charCodeAt(0);
export const MAX_COLUMN =
  SheetConfig.COLUMNS[SheetConfig.MAX_COLUMNS].charCodeAt(0);
