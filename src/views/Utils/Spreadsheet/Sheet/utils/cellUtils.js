import { SheetConfig, getMaxColumn, getMinColumn } from "../constants";
import Cell from "../models/Cell";
import CellContent from "../models/CellContent";

export const getId = (id) => {
  const row = id?.match(/\d+/g);
  const column = id?.match(/[A-Z]/g);
  const columnCharCode = id?.match(/[A-Z]/g);

  if (row && column && columnCharCode)
    return {
      row: row[0],
      column: column[0],
      columnCharCode: columnCharCode[0].charCodeAt(0),
    };
  return {};
};

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
    state.highlighted.columns.map(
      (column) =>
        new CellContent({
          value: state.content[`${column}${row}`]?.value || "",
          display: state.content[`${column}${row}`]?.display || "",
          formula: state.content[`${column}${row}`]?.formula || "",
        })
    )
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

export function setCaretPosition(elemId, caretPos) {
  const elem = document.getElementById(elemId);

  if (elem != null) {
    if (elem.createTextRange) {
      const range = elem.createTextRange();
      range.move("character", caretPos);
      range.select();
    } else {
      if (elem.selectionStart) {
        elem.focus();
        elem.setSelectionRange(caretPos, caretPos);
      } else elem.focus();
    }
  }
}

export function getCaretPosition(input) {
  // Internet Explorer Caret Position (TextArea)
  if (document.selection && document.selection.createRange) {
    const range = document.selection.createRange();
    const bookmark = range.getBookmark();
    return bookmark.charCodeAt(2) - 2;
  } else {
    // Firefox Caret Position (TextArea)
    if (input.setSelectionRange) return input.selectionEnd;
  }
}

export const getNextColumn = (
  id,
  maxRows = SheetConfig.MAX_ROWS,
  maxColumns = SheetConfig.MAX_COLUMNS
) => {
  const { row, columnCharCode } = getId(id);
  const maxColumn = getMaxColumn(maxColumns);
  const nextRow =
    columnCharCode + 1 === maxColumn
      ? parseInt(row) === maxRows
        ? 1
        : +row + 1
      : row;
  return `${
    columnCharCode + 1 === maxColumn
      ? String.fromCharCode(getMinColumn())
      : String.fromCharCode(columnCharCode + 1)
  }${nextRow}`;
};

export const getNextRow = (id, maxRows = SheetConfig.MAX_ROWS) => {
  const { row, column } = getId(id);
  return `${column}${+row === maxRows ? +row : +row + 1}`;
};

export const isCtrlKeyPressed = (e) => {
  return /mac/i.test(navigator.platform) ? e.metaKey : e.ctrlKey;
};

export function parseCSV(csvString) {
  const rows = csvString.trim().split("\n");
  let content = {};

  rows.forEach((row, rowIndex) => {
    row.split(",").forEach((cellValue, colIndex) => {
      const colLabel = SheetConfig.COLUMNS[colIndex];
      const cellId = `${colLabel}${rowIndex + 1}`;
      content[cellId] = new CellContent({ value: cellValue, formula: "" });
    });
  });

  return content;
}

export const parseInitialStateContent = (
  content,
  defaultRowHeight,
  defaultColumnWidth,
  maxRows,
  maxColumns
) => {
  const defaultColumnWidthsSet = Array(maxColumns)
    .fill()
    .reduce(
      (acc, _, idx) => {
        acc.columnWidths[SheetConfig.COLUMNS[idx]] = defaultColumnWidth;
        return acc;
      },
      { columnWidths: {} }
    );

  const defaultRowHeightsSet = Array(maxRows + 1)
    .fill()
    .reduce(
      (acc, _, idx) => {
        acc.rowHeights[idx] = defaultRowHeight;
        return acc;
      },
      { ...defaultColumnWidthsSet, rowHeights: {} }
    );

  return Object.keys(content).reduce(
    (stateContent, it) => {
      const cell = it.toUpperCase();
      stateContent[cell] = {};
      if (content[it] !== null && typeof content[it] !== "object") {
        const isString =
          typeof content[it] === "string" || content[it] instanceof String;
        if (isString && content[it].startsWith("=")) {
          stateContent[cell].formula = content[it];
        } else {
          stateContent[cell].value = content[it];
        }
        stateContent[cell].display = content[it];
      } else {
        stateContent[cell].value = new CellContent(content[it]);
      }

      return stateContent;
    },
    { ...defaultRowHeightsSet }
  );
};

export const getPreviousColumn = (id, maxColumns = SheetConfig.MAX_COLUMNS) => {
  const { row, columnCharCode } = getId(id);

  const nextRow =
    columnCharCode === getMinColumn() ? (+row === 1 ? row : row - 1) : row;
  return `${
    columnCharCode === getMinColumn()
      ? String.fromCharCode(getMaxColumn(maxColumns) - 1)
      : String.fromCharCode(columnCharCode - 1)
  }${nextRow}`;
};

export const getPreviousRow = (id) => {
  const { row, column } = getId(id);
  return `${column}${+row === 1 ? +row : +row - 1}`;
};
