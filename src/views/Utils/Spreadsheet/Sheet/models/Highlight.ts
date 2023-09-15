import { isNumber } from "../../../../../utils";
import StateContentData from "./StateContentData";

type Props = {
  rowAnchor?: null | number;
  columnAnchor?: null | string;
  cellAnchor?: null | string;
  cells?: string[];
  rows?: number[];
  columns?: string[];
  rangeStart?: null | string;
  rangeEnd?: null | string;
  sum?: number | null;
  average?: number | null;
  count?: number | null;
};

export default class Highlight {
  rowAnchor: null | number = null;
  columnAnchor: null | string = null;
  cellAnchor: null | string = null;
  cells: string[] = [];
  rows: number[] = [];
  columns: string[] = [];
  rangeStart: null | string = null;
  rangeEnd: null | string = null;
  sum: number | null = null;
  average: number | null = null;
  count: number | null = null;

  constructor({
    rowAnchor = null,
    columnAnchor = null,
    cellAnchor = null,
    cells = [],
    rows = [],
    columns = [],
    rangeStart = null,
    rangeEnd = null,
  }: Partial<Props> = {}) {
    this.rowAnchor = rowAnchor;
    this.columnAnchor = columnAnchor;
    this.cellAnchor = cellAnchor;
    this.cells = cells;
    this.rows = rows;
    this.columns = columns;
    this.rangeStart = rangeStart;
    this.rangeEnd = rangeEnd;
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

  setCells(
    cellIds: Array<string>,
    stateContentData: StateContentData
  ): Highlight {
    this.cells = cellIds;
    this.calculateSum(stateContentData);
    this.calculateAverage(stateContentData);
    this.calculateCount(stateContentData);
    return this;
  }

  setRows(rowIds: Array<number>): Highlight {
    this.rows = rowIds;
    return this;
  }

  setColumns(columnIds: string[]): Highlight {
    this.columns = columnIds;
    return this;
  }

  calculateSum(stateContentData: StateContentData): Highlight {
    if (this.cells.length > 1) {
      const sum = this.cells
        .filter((cell) => isNumber(stateContentData[cell]?.value))
        .reduce(
          (acc, cell) =>
            acc + parseFloat(String(stateContentData[cell]?.value || 0)),
          0 // Set initial value to 0
        );
      this.sum = Number(sum);
    } else {
      this.sum = null;
    }
    return this;
  }

  /**
   *
   * @param {Object} stateContentData
   * @returns {Highlight}
   */
  calculateAverage(stateContentData: StateContentData): Highlight {
    if (this.cells.length > 1) {
      const average =
        Number(this.sum) /
        (this.cells.filter((cell) => isNumber(stateContentData[cell]?.value))
          .length || 1);
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
    if (this.cells.length > 1) {
      const count = this.cells.filter((cell) =>
        Boolean(stateContentData[cell]?.value?.toString())
      ).length;
      this.count = count;
    } else {
      this.count = null;
    }
    return this;
  }
}
