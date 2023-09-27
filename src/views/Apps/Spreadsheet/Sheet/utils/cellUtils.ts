import { SheetConfig, defaultInitialStateProps } from "../constants";
import CellData from "../models/CellData";
import CellFormatting from "../models/CellFormatting";
import { initialState } from "../reducer";
import SheetContent from "../models/SheetContent";
import { isObject, isString } from "../../../../../utils";
import { SheetProps, State } from "../types";
import StateContentData from "../models/StateContentData";
import { setOf } from "../../../../../utils/Set";

export const generateClipboardContent = (state: State): string => {
  const content = state.highlighted.rows.toArray().map((row: number) =>
    state.highlighted.columns.toArray().map((column: string) => {
      const id = `${column}${row}`;
      const cellData = state.sheets[state.activeSheet].content.data[
        id
      ] as CellData;

      return new CellData({
        id,
        value: cellData?.value || "",
        display: cellData?.display || "",
        formula: cellData?.formula || "",
      });
    })
  );
  const type = SheetConfig.FILE_TYPE;
  return stringifyJSON({ type, content });
};

export const generateJSONContent = (state: State): string => {
  const type = SheetConfig.FILE_TYPE;
  const { content } = state.sheets[state.activeSheet];

  return stringifyJSON({ type, content });
};

function stringifyJSON(object: { [key: string]: any }): string {
  return JSON.stringify(
    object,
    (_key, value) => (value instanceof Set ? [...value] : value),
    2
  );
}

function typeInTextField(id: string, newText: string, replace: boolean) {
  const el: HTMLInputElement | null = document.getElementById(
    id
  ) as HTMLInputElement;
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

export function typeInInputBox(text: string, replace = false) {
  return typeInTextField("input-box", text, replace);
}

export function parseCSV(csvString: string) {
  try {
    const rows = csvString.trim().split("\n");
    let data: { [key: string]: Partial<CellData> } = {};

    rows.forEach((row: string, rowIndex: number) => {
      row.split(",").forEach((cellValue: string, colIndex: number) => {
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
  content: SheetContent | undefined;
  message?: string;
};

export function parseJSON(stringifiedJSON: string): ParsedJSON {
  try {
    const jsonObject = JSON.parse(stringifiedJSON);
    if (jsonObject.type !== SheetConfig.FILE_TYPE) {
      return {
        error: true,
        message: `Invalid or unknown JSON file`,
        content: undefined,
      };
    }

    const data = { ...jsonObject.content.data };
    const namedRanges = {};

    for (const cell in data) {
      if (data[cell].id) {
        data[cell] = {
          ...data[cell],
          formatting: new CellFormatting(data[cell].formatting),
        }.setDisplay();
      } else {
        delete data[cell];
      }
    }

    for (const rangeName in jsonObject.content.namedRanges) {
      namedRanges[rangeName] = setOf(jsonObject.content.namedRanges[rangeName]);
    }

    const content = new SheetContent(
      jsonObject.content.rowHeights,
      jsonObject.content.columnWidths,
      data,
      namedRanges
    );

    return { error: false, content };
  } catch (error: unknown) {
    return {
      error: true,
      message: (error as Error).message,
      content: undefined,
    };
  }
}

export const createInitialState = (
  props: SheetProps,
  defaultProps: typeof defaultInitialStateProps
): State => {
  const activeSheet = Object.keys(initialState.sheets).find((it) =>
    [props.activeSheet, defaultProps.activeSheet].includes(
      initialState.sheets[it].name
    )
  )!;

  console.log({ activeSheet });

  const createdState = {
    ...initialState,
    maxRows: props.maxRows || defaultProps.maxRows,
    maxColumns: props.maxColumns || defaultProps.maxColumns,
    maxUndos: props.maxUndos || defaultProps.maxUndos,
    toolbar: props.toolbar || defaultProps.toolbar,
    formulaField: props.formulaField || defaultProps.formulaField,
    statusField: props.statusField || defaultProps.statusField,
    defaultRowHeight: props.defaultRowHeight || defaultProps.defaultRowHeight,
    defaultColumnWidth:
      props.defaultColumnWidth || defaultProps.defaultColumnWidth,
    activeSheet,
    sheets: {
      ...initialState.sheets,
      [activeSheet]: {
        ...initialState.sheets[activeSheet],
        content: generateInitialContent(props, defaultProps),
      },
    },
  };
  return createdState;
};

const generateInitialContent = (
  props: SheetProps,
  defaultProps: { [key: string]: any }
): SheetContent => {
  const columnWidths = Array(props.maxColumns)
    .fill(0)
    .reduce((acc, _, idx) => {
      acc[SheetConfig.COLUMNS[idx]] = props.defaultColumnWidth;
      return acc;
    }, {});

  const rowHeights = Array((props.maxRows || defaultProps.maxRows) + 1)
    .fill(0)
    .reduce((acc, _, idx) => {
      acc[idx] = props.defaultRowHeight;
      return acc;
    }, {});

  const initialData = props.initialData || defaultProps.initialData;

  const data = Object.keys(initialData).reduce((stateContentData, cellId) => {
    const cell = cellId.toUpperCase();
    const cellData = new CellData({ id: cell });
    if (isObject(initialData[cellId])) {
      Object.assign(cellData, initialData[cellId]);
    } else {
      if (isFormula(initialData[cellId])) {
        cellData.formula = initialData[cellId];
        cellData.previousFormula = initialData[cellId];
      } else {
        cellData.value = initialData[cellId];
        cellData.previousValue = initialData[cellId];
      }
      cellData.display = initialData[cellId];
    }
    stateContentData[cell] = cellData;
    return stateContentData;
  }, {}) as Partial<StateContentData>;

  return {
    rowHeights,
    columnWidths,
    data,
    namedRanges: {},
  } as SheetContent;
};

export const isFormula = (value: unknown): boolean => {
  return (
    (typeof value === "string" || value instanceof String) &&
    Boolean(value?.startsWith("="))
  );
};

export const cellSorter = (cellIdA: string, cellIdB: string): number => {
  const aMatch = cellIdA.match(/([A-Z]+)(\d+)/);
  const bMatch = cellIdB.match(/([A-Z]+)(\d+)/);

  if (aMatch && bMatch) {
    const [aLetters, aNumbers] = aMatch.slice(1);
    const [bLetters, bNumbers] = bMatch.slice(1);

    const lettersComparison = bLetters.localeCompare(aLetters);
    if (lettersComparison !== 0) return lettersComparison;

    return parseInt(bNumbers) - parseInt(aNumbers);
  }
  return -1;
};
