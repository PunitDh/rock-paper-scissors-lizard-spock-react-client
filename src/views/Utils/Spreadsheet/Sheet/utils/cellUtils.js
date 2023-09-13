import { FILE_TYPE, SheetConfig } from "../constants";
import CellData from "../models/CellData";
import CellFormatting from "../models/CellFormatting";
import { initialState } from "../reducer";

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
  const type = FILE_TYPE;
  return JSON.stringify({ type, content });
};

export const generateJSONContent = (state) => {
  const content = state.content;
  const type = FILE_TYPE;
  return JSON.stringify({ type, content }, null, 2);
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

  if (end > start) {
    element.setRangeText(text, start, end, "preserve");
  } else if (isLastValueRange.test(currentValue)) {
    element.setRangeText(
      replace ? currentValue.replace(isLastValueRange, text) : "," + text,
      replace ? 0 : start,
      replace ? element.value.length : end,
      "preserve"
    );
  } else if (isLastValueCell.test(currentValue)) {
    console.log("Here");
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

export function parseCSV(csvString) {
  const rows = csvString.trim().split("\n");
  let data = {};

  rows.forEach((row, rowIndex) => {
    row.split(",").forEach((cellValue, colIndex) => {
      const colLabel = SheetConfig.COLUMNS[colIndex];
      const cellId = `${colLabel}${rowIndex + 1}`;
      data[cellId] = new CellData({
        id: cellId,
        value: cellValue,
        formula: "",
      });
    });
  });

  return data;
}

export function parseJSON(stringifiedJSON) {
  try {
    const jsonObject = JSON.parse(stringifiedJSON);
    if (jsonObject.type !== FILE_TYPE) {
      throw new Error(`Invalid or unknown JSON file`);
    }

    const data = Object.keys(jsonObject.content.data).reduce((acc, cell) => {
      if (acc[cell].id) {
        return {
          ...acc,
          [cell]: new CellData({
            ...acc[cell],
            formatting: new CellFormatting(acc[cell].formatting),
          }).setDisplay(),
        };
      } else {
        delete acc[cell];
      }
      return acc;
    }, jsonObject.content.data);

    const content = {
      rowHeights: jsonObject.content.rowHeights,
      columnWidths: jsonObject.content.columnWidths,
      data,
    };

    return content;
  } catch (error) {
    return error;
  }
}

export const createInitialState = (
  maxRows = SheetConfig.MAX_ROWS,
  maxColumns = SheetConfig.MAX_COLUMNS,
  maxUndos = 32,
  initialData = {},
  defaultRowHeight = 24,
  defaultColumnWidth = 80
) => ({
  ...initialState,
  defaultRowHeight,
  defaultColumnWidth,
  maxRows,
  maxColumns,
  maxUndos,
  content: generateInitialContent(
    initialData,
    defaultRowHeight,
    defaultColumnWidth,
    maxRows,
    maxColumns
  ),
});

const generateInitialContent = (
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
