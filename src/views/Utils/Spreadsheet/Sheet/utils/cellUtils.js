import { SheetConfig } from "../constants";
import CellContent from "../models/CellContent";

// export const getId = (id) => {
//   const row = id?.match(/\d+/g);
//   const column = id?.match(/[A-Z]/g);
//   const columnCharCode = id?.match(/[A-Z]/g);

//   if (row && column && columnCharCode)
//     return {
//       row: row[0],
//       column: column[0],
//       columnCharCode: columnCharCode[0].charCodeAt(0),
//     };
//   return {};
// };

// export const getCellMinMax = (highlighted) => {
//   const ids = highlighted.map(getId);
//   const columnCharCodes = ids.map((it) => it.columnCharCode);
//   const rows = ids.map((it) => Number(it.row));
//   const minC = Math.min(...columnCharCodes);
//   const maxC = Math.max(...columnCharCodes);
//   const minR = Math.min(...rows);
//   const maxR = Math.max(...rows);

//   return {
//     minC,
//     maxC,
//     minR,
//     maxR,
//   };
// };

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
      return new CellContent({
        id,
        value: state.content[id]?.value || "",
        display: state.content[id]?.display || "",
        formula: state.content[id]?.formula || "",
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

  // const currentValue = state.content[state.selectedCell.id].formula;
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
      content[cellId] = new CellContent({
        id: cellId,
        value: cellValue,
        formula: "",
      });
    });
  });

  return content;
}

export const generateInitialContent = (
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
      stateContent[cell] = new CellContent({ id: cell });
      if (content[it] !== null && typeof content[it] !== "object") {
        const isString =
          typeof content[it] === "string" || content[it] instanceof String;
        if (isString && isFormula(content[it])) {
          stateContent[cell].formula = content[it];
        } else {
          stateContent[cell].value = content[it];
        }
        stateContent[cell].display = content[it];
      } else {
        stateContent[cell] = new CellContent({ id: cell, ...content[it] });
      }

      return stateContent;
    },
    { ...defaultRowHeightsSet }
  );
};

export const isFormula = (value) => {
  return value.startsWith("=");
};
