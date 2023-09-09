import { SheetConfig } from "../constants";
import CellData from "../models/CellData";

export const getCellOffset = (cell, offsetX, offsetY) => {
  const offsetRow = +cell.row + offsetY;
  const offsetColumn =
    SheetConfig.COLUMNS[+SheetConfig.COLUMNS.indexOf(cell.column) + offsetX];
  return `${offsetColumn}${offsetRow}`;
};

export const generateClipboardContent = (state) => {
  const content = state.highlighted.rows.map((row) =>
    state.highlighted.columns.map((column) => {
      const id = `${column}${row}`;
      return new CellData({
        id,
        value: state.content.data[id]?.value || "",
        display: state.content.data[id]?.display || "",
        formula: state.content.data[id]?.formula || "",
      });
    })
  );
  const type = "_sheet";
  return JSON.stringify({ type, content });
};

function typeInTextField(id, newText, replace) {
  const el = document.getElementById(id);
  if (!el) return;
  const [start, end] = [el.selectionStart, el.selectionEnd];
  el.focus();
  if (replace) {
    el.setRangeText(newText, 0, el.value.length, "preserve");
    return el.value;
  } else {
    el.setRangeText(newText, start, end, "preserve");
    return el.value;
  }
}

export function typeInInputBox(text, replace = false) {
  return typeInTextField("input-box", text, replace);
}

export function addCellToFocusedBox(state, text, replace) {
  const isLastValueRange = /([a-z]+[0-9]+):([a-z]+[0-9]+)$/gi;
  const isLastValueCell = /([a-z]+[0-9]+)$/gi;

  // const currentValue = state.content.data[state.selectedCell.id].formula;
  const element = state.isFormulaFieldFocused
    ? state.formulaFieldRef
    : state.inputRef;

  const [start, end] = [element.selectionStart, element.selectionEnd];
  const currentValue = element.value.slice(0, end);
  element.focus();

  if (isLastValueRange.test(currentValue)) {
    element.setRangeText(
      replace ? currentValue.replace(isLastValueRange, text) : "," + text,
      replace ? 0 : start,
      replace ? element.value.length : end,
      "preserve"
    );
  } else if (isLastValueCell.test(currentValue)) {
    element.setRangeText(
      replace ? currentValue.replace(isLastValueCell, text) : "," + text,
      replace ? 0 : start,
      replace ? element.value.length : end,
      "preserve"
    );
  } else {
    element.setRangeText(text, start, end, "preserve");
  }
  return element.value;
}

// Unused
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
      content[cellId] = new CellData({
        id: cellId,
        value: cellValue,
        formula: "",
      });
    });
  });

  return content;
}

export const generateInitialContent = (
  initialData,
  defaultRowHeight,
  defaultColumnWidth,
  maxRows,
  maxColumns
) => {
  const columnWidths = Array(maxColumns)
    .fill()
    .reduce((acc, _, idx) => {
      acc[SheetConfig.COLUMNS[idx]] = defaultColumnWidth;
      return acc;
    }, {});

  const rowHeights = Array(maxRows + 1)
    .fill()
    .reduce((acc, _, idx) => {
      acc[idx] = defaultRowHeight;
      return acc;
    }, {});

  const data = Object.keys(initialData).reduce((stateContentData, it) => {
    const cell = it.toUpperCase();
    stateContentData[cell] = new CellData({ id: cell });
    if (initialData[it] !== null && typeof initialData[it] !== "object") {
      const isString =
        typeof initialData[it] === "string" ||
        initialData[it] instanceof String;
      if (isString && isFormula(initialData[it])) {
        stateContentData[cell].formula = initialData[it];
      } else {
        stateContentData[cell].value = initialData[it];
      }
      stateContentData[cell].display = initialData[it];
    } else {
      stateContentData[cell] = new CellData({
        id: cell,
        ...initialData[it],
      });
    }

    return stateContentData;
  }, {});

  return {
    rowHeights,
    columnWidths,
    data,
  };
};

export const isFormula = (value) => {
  return value?.startsWith("=");
};
