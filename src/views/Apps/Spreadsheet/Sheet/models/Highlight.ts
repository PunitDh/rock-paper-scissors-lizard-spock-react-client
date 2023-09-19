import { isNumber } from "../../../../../utils";
import SetExtended, { setOf } from "../../../../../utils/SetExtended";
import Cell from "./Cell";
import StateContentData from "./StateContentData";

type Props = {
  rowAnchor?: null | number;
  columnAnchor?: null | string;
  cellAnchor?: null | string;
  cells?: SetExtended<string>;
  rows?: SetExtended<number>;
  columns?: SetExtended<string>;
  rangeStart?: null | string;
  rangeEnd?: null | string;
  multiSelect?: boolean;
  sum?: number | null;
  average?: number | null;
  count?: number | null;
};

export default class Highlight {
  rowAnchor: null | number = null;
  columnAnchor: null | string = null;
  cellAnchor: null | string = null;
  cells: SetExtended<string> = setOf<string>();
  rows: SetExtended<number> = setOf<number>();
  columns: SetExtended<string> = setOf<string>();
  rangeStart: null | string = null;
  rangeEnd: null | string = null;
  sum: number | null = null;
  average: number | null = null;
  count: number | null = null;
  max: number | null = null;
  min: number | null = null;
  multiSelect: boolean;

  constructor({
    rowAnchor = null,
    columnAnchor = null,
    cellAnchor = null,
    cells = setOf<string>(),
    rows = setOf<number>(),
    columns = setOf<string>(),
    rangeStart = null,
    rangeEnd = null,
    multiSelect = false,
  }: Partial<Props> = {}) {
    this.rowAnchor = rowAnchor;
    this.columnAnchor = columnAnchor;
    this.cellAnchor = cellAnchor;
    this.cells = cells;
    this.rows = rows;
    this.columns = columns;
    this.rangeStart = rangeStart;
    this.rangeEnd = rangeEnd;
    this.multiSelect = multiSelect;
  }

  get length(): number {
    return this.cells.length;
  }

  get hasLength(): Boolean {
    return this.cells.length > 1;
  }

  get first(): string {
    return this.cells.first();
  }

  get second(): string {
    return this.cells.second();
  }

  get last(): string {
    return this.cells.last();
  }

  includes(cellId: string): Boolean {
    return this.cells.has(cellId);
  }

  setRowAnchor(row: number): Highlight {
    this.rowAnchor = row;
    return this;
  }

  setColumnAnchor(column: string): Highlight {
    this.columnAnchor = column;
    return this;
  }

  setCellAnchor(cellId: string | null): Highlight {
    this.cellAnchor = cellId;
    return this;
  }

  setRangeStart(cellId: string): Highlight {
    this.rangeStart = cellId;
    return this;
  }

  setRangeEnd(cellId: string): Highlight {
    this.rangeEnd = cellId;
    return this;
  }

  setMultiSelect(multiSelect: boolean): Highlight {
    this.multiSelect = multiSelect;
    return this;
  }

  setCells(
    cellIds: SetExtended<string>,
    stateContentData: StateContentData
  ): Highlight {
    this.cells = setOf<string>(cellIds);
    this.recalculate(stateContentData);
    return this;
  }

  recalculate(stateContentData: StateContentData): Highlight {
    const numbers = this.getNumbers(stateContentData);
    this.calculateSum(numbers);
    this.calculateAverage(numbers);
    this.calculateCount(stateContentData);
    this.calculateMax(numbers);
    this.calculateMin(numbers);
    return this;
  }

  setRows(rowIds: SetExtended<number>): Highlight {
    this.rows = rowIds;
    return this;
  }

  setColumns(columnIds: SetExtended<string>): Highlight {
    this.columns = columnIds;
    return this;
  }

  addCellAndRecalculate(
    cellId: string,
    stateContentData: StateContentData
  ): Highlight {
    const cell = new Cell(cellId);
    const rowsSet = setOf<number>(this.rows);
    const columnsSet = setOf<string>(this.columns);
    const cellsSet = setOf<string>(this.cells);
    cellsSet.add(cell.id);
    rowsSet.add(cell.row);
    columnsSet.add(cell.column);
    this.cells = cellsSet;
    this.rows = rowsSet;
    this.columns = columnsSet;
    this.recalculate(stateContentData);
    return this;
  }

  calculateSum(numbers: number[]): Highlight {
    if (this.hasLength) {
      const sum = numbers.reduce((acc, cur) => acc + cur || 0, 0);
      this.sum = Number(sum);
    } else {
      this.sum = null;
    }
    return this;
  }

  calculateAverage(numbers: number[]): Highlight {
    if (this.hasLength) {
      const average = Number(this.sum) / (numbers.length || 1);
      this.average = average;
    } else {
      this.average = null;
    }
    return this;
  }

  /**
   *
   * @param {Object} stateContentData
   * @returns {Highlight}
   */
  calculateCount(stateContentData: StateContentData): Highlight {
    if (this.hasLength) {
      const count = this.cells
        .toArray()
        .filter((cell) =>
          Boolean(stateContentData[cell]?.value?.toString())
        ).length;
      this.count = count;
    } else {
      this.count = null;
    }
    return this;
  }

  calculateMax(numbers: number[]) {
    if (this.hasLength) {
      this.max = Math.max(...numbers);
    } else {
      this.count = null;
    }
    return this;
  }

  calculateMin(numbers: number[]) {
    if (this.hasLength) {
      this.min = Math.min(...numbers);
    } else {
      this.min = null;
    }
    return this;
  }

  private getNumbers(stateContentData: StateContentData): number[] {
    return this.cells
      .toArray()
      .filter((cell) => isNumber(stateContentData[cell]?.value))
      .map((cell) => parseFloat(stateContentData[cell]?.value));
  }
}
