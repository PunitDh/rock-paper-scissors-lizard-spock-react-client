import { SheetAction } from "./actions";
import Cell from "./models/Cell";
import Highlight from "./models/Highlight";
import SheetContent from "./models/SheetContent";
import SetExtended from "../../../../utils/Set";
import CellData from "./models/CellData";
import { SheetConfig } from "./constants";

export type SheetId = string; // e.g. sheet-1
export type CellId = string; //CellId1; // e.g. A1
export type ColumnId = (typeof SheetConfig.COLUMNS)[number];
export type RowId = number;
export type CellValue = string | number | null;
export type CellFormula = string | null;
export type InsertColumnLocation = "left" | "right";
export type InsertRowLocation = "above" | "below";

// const columns = SheetConfig.COLUMNS.split("");
// type Column = typeof columns[number];
// const rows = Array(5000).fill(0).map((it: number) => it+1);
// type Row = typeof rows[number];

// type CellId1 = `${Column}${Row}`

export type State = {
  maxRows: number;
  maxColumns: number;
  inputRef: HTMLInputElement | null;
  fillerRef: HTMLElement | null;
  formulaFieldRef: HTMLElement | null;
  defaultRowHeight: number;
  defaultColumnWidth: number;
  maxUndos: number;
  selectedCell: Cell;
  formulaMode: boolean;
  hovered: CellId;
  highlighted: Highlight;
  activeSheet: SheetId;
  sheets: { [key: string]: Sheet };
  formulaTrackedCells: SetExtended<CellId>;
  formulaHighlighted: SetExtended<CellId>;
  mouseDown: boolean;
  dragging: boolean;
  fillerMode: boolean;
  formulaFieldText: string;
  isFormulaFieldFocused: boolean;
  menuAnchorElement: HTMLElement | null;
  memento: Memento[];
  currentMementoId: string | null;
};

export type Action = {
  type: SheetAction;
  payload?: any;
};

export type SheetProps = {
  maxRows?: number;
  maxColumns?: number;
  maxUndos?: number;
  activeSheet?: SheetId | null;
  toolbar?: boolean;
  formulaField?: boolean;
  statusField?: boolean;
  initialData?: { [key: CellId]: CellData };
  defaultRowHeight?: number;
  defaultColumnWidth?: number;
};

export type Sheet = {
  id: SheetId;
  index: number;
  name: string;
  content: SheetContent;
  initialContent: SheetContent;
  protected: boolean;
  password?: string;
};

export type Memento = {
  id: string;
  delta: { [key: string]: any };
};

export type InputData = {
  highlighted: Highlight;
  referenceCells: SetExtended<CellId>;
  rowHeight: {
    value: number;
  };
  column: string;
  formulaBarValue: string | number;
  columnWidth: {
    value: number;
  };
  selectedCellData: CellData;
  selectedId: string;
  selectedCell: Cell;
  currentCellInputValue: string | number;
};

export type CellMinMax = {
  minC: number;
  maxC: number;
  minR: number;
  maxR: number;
};
