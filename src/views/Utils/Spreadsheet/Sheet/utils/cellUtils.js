import { MAX_COLUMN, MIN_COLUMN, SheetConfig } from "../../constants";

export const getId = (id) => ({
  row: id?.match(/\d+/g)[0],
  column: id?.match(/[A-Z]/g)[0],
  columnCharCode: id?.match(/[A-Z]/g)[0].charCodeAt(0),
});

export const getCellMinMax = (highlighted) => {
  const ids = highlighted.map(getId);
  const columnCharCodes = ids.map((it) => it.columnCharCode);
  const rows = ids.map((it) => Number(it.row));
  const minC = Math.min(...columnCharCodes);
  const maxC = Math.max(...columnCharCodes);
  const minR = Math.min(...rows);
  const maxR = Math.max(...rows);

  return {
    minC,
    maxC,
    minR,
    maxR,
  };
};

export const getCellOffset = (cell, offsetX, offsetY) => {
  const offsetRow = +cell.row + offsetY;
  const offsetColumn =
    SheetConfig.COLUMNS[+SheetConfig.COLUMNS.indexOf(cell.column) + offsetX];
  return `${offsetColumn}${offsetRow}`;
};

export const generateClipboardContent = (state) => {
  const content = state.highlighted.rows.map((row) =>
    state.highlighted.columns.map((column) => ({
      value: state.content[`${column}${row}`]?.value || "",
      display: state.content[`${column}${row}`]?.display || "",
      formula: state.content[`${column}${row}`]?.formula || "",
    }))
  );
  const type = "_sheet";
  return JSON.stringify({ type, content });
};

export function typeInTextField(id, newText) {
  const el = document.getElementById(id);
  if (!el) return;
  const [start, end] = [el.selectionStart, el.selectionEnd];
  el.focus();
  el.setRangeText(newText, start, end, "end");
  return el.value;
}

export const getNextColumn = (id, maxRows = SheetConfig.MAX_ROWS) => {
  const { row, columnCharCode } = getId(id);
  const nextRow =
    columnCharCode + 1 === MAX_COLUMN
      ? parseInt(row) === maxRows
        ? 1
        : +row + 1
      : row;
  return `${
    columnCharCode + 1 === MAX_COLUMN
      ? String.fromCharCode(MIN_COLUMN)
      : String.fromCharCode(columnCharCode + 1)
  }${nextRow}`;
};

export const getNextRow = (id, maxRows = SheetConfig.MAX_ROWS) => {
  const { row, column } = getId(id);
  return `${column}${+row === maxRows ? +row : +row + 1}`;
};

export const getPreviousColumn = (id) => {
  const { row, columnCharCode } = getId(id);

  const nextRow =
    columnCharCode === MIN_COLUMN ? (+row === 1 ? row : row - 1) : row;
  return `${
    columnCharCode === MIN_COLUMN
      ? String.fromCharCode(MAX_COLUMN - 1)
      : String.fromCharCode(columnCharCode - 1)
  }${nextRow}`;
};

export const getPreviousRow = (id) => {
  const { row, column } = getId(id);
  return `${column}${+row === 1 ? +row : +row - 1}`;
};
