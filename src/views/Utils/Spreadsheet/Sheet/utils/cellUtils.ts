import { cloneDeep } from "lodash";
import { FILE_TYPE, SheetConfig } from "../constants";
import CellData from "../models/CellData";
import CellFormatting from "../models/CellFormatting";
import { initialState } from "../reducer";
import StateContent from "../models/StateContent";
import { isObject, isString } from "../../../../../utils";
import { State } from "../types";
import StateContentData from "../models/StateContentData";

export const generateClipboardContent = (state: {
  highlighted: { rows: any[]; columns: any[] };
  content: { data: { [x: string]: { formula: any } } };
}) => {
  const content = state.highlighted.rows.map((row: any) =>
    state.highlighted.columns.map((column: any) => {
      const id = `${column}${row}`;
      const cellData = state.content.data[id] as CellData;

      return new CellData({
        id,
        value: cellData?.value || "",
        display: cellData?.display || "",
        formula: cellData?.formula || "",
      });
    })
  );
  const type = FILE_TYPE;
  return JSON.stringify({ type, content });
};

export const generateJSONContent = (state: State): string => {
  const type = FILE_TYPE;
  const { content } = state;
  const { data } = content;
  const filtered = Object.keys(data).reduce(
    (acc: StateContentData, cur: string) => {
      if (String((data[cur] as CellData)?.value)?.length > 0) {
        return {
          ...acc,
          [cur]: data[cur],
        } as StateContentData;
      }
      return acc as StateContentData;
    },
    {} as StateContentData
  );
  const filteredContent = {
    ...content,
    data: filtered,
  };
  return JSON.stringify({ type, content: filteredContent }, null, 2);
};

function typeInTextField(id: string, newText: string, replace: boolean) {
  const el: HTMLInputElement = document.getElementById(id) as HTMLInputElement;
  if (!el) return;
  const [start, end] = [
    (el as HTMLInputElement).selectionStart,
    (el as HTMLInputElement).selectionEnd,
  ];
  el.focus({ preventScroll: true });
  if (replace) {
    el.setRangeText(newText, 0, el.value.length, "preserve");
    return el.value;
  } else {
    el.setRangeText(newText, start as number, end as number, "preserve");
    return el.value;
  }
}

export function typeInInputBox(text: any, replace = false) {
  return typeInTextField("input-box", text, replace);
}

export function parseCSV(csvString: string) {
  try {
    const rows = csvString.trim().split("\n");
    let data: { [key: string]: Partial<CellData> } = {};

    rows.forEach((row: string, rowIndex: number) => {
      row.split(",").forEach((cellValue: any, colIndex: string | number) => {
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
  } catch {
    return { error: true };
  }
}

type ParsedJSON = {
  error: boolean;
  content: StateContent | undefined;
  message?: string;
};

export function parseJSON(stringifiedJSON: string): ParsedJSON {
  try {
    const jsonObject = JSON.parse(stringifiedJSON);
    if (jsonObject.type !== FILE_TYPE) {
      return {
        error: true,
        message: `Invalid or unknown JSON file`,
        content: undefined,
      };
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

    const content = new StateContent(
      jsonObject.content.rowHeights,
      jsonObject.content.columnWidths,
      data,
      jsonObject.content.namedRanges
    );

    return { error: false, content };
  } catch (error: any) {
    return { error: true, message: error!.message, content: undefined };
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
  // ...initialState,
  ...cloneDeep(initialState),
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
  initialData: { [x: string]: any },
  defaultRowHeight: number,
  defaultColumnWidth: number,
  maxRows: number,
  maxColumns: number
) => {
  const columnWidths = Array(maxColumns)
    .fill(0)
    .reduce((acc, _, idx) => {
      acc[SheetConfig.COLUMNS[idx]] = defaultColumnWidth;
      return acc;
    }, {});

  const rowHeights = Array(maxRows + 1)
    .fill(0)
    .reduce((acc, _, idx) => {
      acc[idx] = defaultRowHeight;
      return acc;
    }, {});

  const data = Object.keys(initialData).reduce((stateContentData, it) => {
    const cell = it.toUpperCase();
    stateContentData[cell] = new CellData({ id: cell });
    if (isObject(initialData[it])) {
      stateContentData[cell] = new CellData({
        id: cell,
        ...initialData[it],
      });
    } else {
      if (isString(initialData[it]) && isFormula(initialData[it])) {
        stateContentData[cell].formula = initialData[it];
        stateContentData[cell].previousFormula = initialData[it];
      } else {
        stateContentData[cell].value = initialData[it];
        stateContentData[cell].previousValue = initialData[it];
      }
      stateContentData[cell].display = initialData[it];
    }

    return stateContentData;
  }, {});

  return {
    rowHeights,
    columnWidths,
    data,
    namedRanges: {},
  };
};

export const isFormula = (value: string | null) => {
  return Boolean(value?.startsWith("="));
};

export const getWidth = (id: string): string | undefined => {
  const element = document.getElementById(id);
  if (element) {
    return window.getComputedStyle(element).width;
  }
  return undefined;
};
