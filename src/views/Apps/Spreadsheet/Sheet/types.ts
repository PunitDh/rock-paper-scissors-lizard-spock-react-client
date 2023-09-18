import { SheetAction } from "./actions";
import Cell from "./models/Cell";
import Highlight from "./models/Highlight";
import StateContent from "./models/StateContent";

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
  hovered: string;
  highlighted: Highlight;
  formulaTrackedCells: string[];
  formulaHighlighted: string[];
  content: StateContent;
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
  toolbar?: boolean;
  formulaField?: boolean;
  statusField?: boolean;
  initialData?: { [key: string]: any };
  defaultRowHeight?: number;
  defaultColumnWidth?: number;
};

export type Memento = {
  id: string;
  content: StateContent;
};

export type CellValue = string | number | null;

export type CellFormula = string | null;