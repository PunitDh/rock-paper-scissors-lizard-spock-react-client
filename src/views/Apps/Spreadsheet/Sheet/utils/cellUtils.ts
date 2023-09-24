import { SheetConfig } from "../constants";
import CellData from "../models/CellData";
import CellFormatting from "../models/CellFormatting";
import { initialState } from "../reducer";
import StateContent from "../models/StateContent";
import { isObject, isString } from "../../../../../utils";
import { SheetProps, State } from "../types";
import StateContentData from "../models/StateContentData";

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
    }),
  );
  const type = SheetConfig.FILE_TYPE;
  return JSON.stringify({ type, content });
};

export const generateJSONContent = (state: State): string => {
  const type = SheetConfig.FILE_TYPE;
  const { content } = state.sheets[state.activeSheet];
  const { data } = content;
  const filtered = Object.keys(data).reduce(
    (acc: StateContentData, cur: string) => {
      if (String((data[cur] as CellData)?.value)?.length > 0) {
        return {
          ...acc,
          [cur]: {
            ...data[cur],
            referenceCells: [...data[cur].referenceCells],
          },
        } as StateContentData;
      }
      return acc as StateContentData;
    },
    {} as StateContentData,
  );
  const filteredContent = {
    ...content,
    data: filtered,
  };
  return JSON.stringify({ type, content: filteredContent }, null, 2);
};

function typeInTextField(id: string, newText: string, replace: boolean) {
  const el: HTMLInputElement | null = document.getElementById(
    id,
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
  content: StateContent | undefined;
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
      jsonObject.content.namedRanges,
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
  defaultProps: { [key: string]: any },
): State => {
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
    sheets: {
      ...initialState.sheets,
      [initialState.activeSheet]: {
        ...initialState.sheets[initialState.activeSheet],
        content: generateInitialContent(props, defaultProps),
      },
    },
  };
  return createdState;
};

const generateInitialContent = (
  props: SheetProps,
  defaultProps: { [key: string]: any },
): StateContent => {
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
  }, {}) as Partial<StateContentData>;

  return {
    rowHeights,
    columnWidths,
    data,
    namedRanges: {},
  } as StateContent;
};

export const isFormula = (value: unknown): boolean => {
  return (
    (typeof value === "string" || value instanceof String) &&
    Boolean(value?.startsWith("="))
  );
};

export const getWidth = (id: string): string | undefined => {
  const element = document.getElementById(id);
  if (element) {
    return window.getComputedStyle(element).width;
  }
  return undefined;
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
