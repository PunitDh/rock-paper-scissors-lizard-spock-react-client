import { SheetAction } from "./actions";
import Cell from "./models/Cell";
import Highlight from "./models/Highlight";
import StateContent from "./models/StateContent";
import StateContentData from "./models/StateContentData";

export type Memento = {
  id: string;
  content: StateContent;
};

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
  content: StateContent
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
