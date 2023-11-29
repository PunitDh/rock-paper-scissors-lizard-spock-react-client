import {
  SheetConfig,
  getLastColumnCharCode,
  getFirstColumnCharCode,
} from "../constants";
import { CellId, ColumnId, RowId } from "../types";

export default class Cell {
  id: CellId;
  row: RowId;
  column: ColumnId;
  columnCharCode: number;

  constructor(id: CellId) {
    this.id = id;
    const rowMatch = id?.match(/\d+/g);
    const columnMatch = id?.match(/[A-Z]+/g);
    this.row = Number(rowMatch![0]);
    this.column = columnMatch![0];
    this.columnCharCode = Number(this.column.charCodeAt(0));
    if (!rowMatch || !columnMatch || !rowMatch[0] || !columnMatch[0]) {
      console.error(`Invalid cell id: ${id}`);
      return;
    }
  }

  static isValidId(id: CellId): boolean {
    return /[A-Z]+\d+/gi.test(id);
  }

  getOffset(
    offsetX: number,
    offsetY: number,
    wrap: boolean = true,
    maxRows: number = SheetConfig.MAX_ROWS,
    maxColumns: number = SheetConfig.MAX_COLUMNS
  ): Cell {
    let offsetRow = +this.row + offsetY;
    let columnIndex = SheetConfig.COLUMNS.indexOf(this.column) + offsetX;

    if (wrap && maxRows && maxColumns) {
      offsetRow = ((offsetRow - 1 + maxRows) % maxRows) + 1; // The -1 and +1 are to make it 1-indexed
      columnIndex =
        (columnIndex + SheetConfig.COLUMNS.length) % SheetConfig.COLUMNS.length;
    }

    const offsetColumn = SheetConfig.COLUMNS[columnIndex];

    // Ensure the resulting cell is valid, otherwise, you might want to throw an error or handle differently
    if (!offsetColumn || offsetRow <= 0) {
      console.error(`Invalid cell id: ${offsetColumn}${offsetRow}`);
      return this; // or throw new Error("Invalid cell position");
    }

    return new Cell(`${offsetColumn}${offsetRow}`);
  }

  equals(cell: Cell): boolean {
    return (
      cell.id === this.id &&
      cell.row === this.row &&
      cell.column === this.column &&
      cell.columnCharCode === this.columnCharCode
    );
  }

  getNextColumn(
    maxRows: number = SheetConfig.MAX_ROWS,
    maxColumns: number = SheetConfig.MAX_COLUMNS
  ): Cell {
    const lastColumnCharCode = getLastColumnCharCode(maxColumns);
    const newRow =
      this.columnCharCode! + 1 > lastColumnCharCode && this.row === maxRows
        ? 1
        : this.row + (this.columnCharCode! + 1 > lastColumnCharCode ? 1 : 0);

    const newColumnCharCode =
      this.columnCharCode! + 1 > lastColumnCharCode
        ? getFirstColumnCharCode()
        : this.columnCharCode! + 1;

    const newColumn = String.fromCharCode(newColumnCharCode);
    const newCellId = `${newColumn}${newRow}`;
    return new Cell(newCellId);
  }

  getNextRow(maxRows: number = SheetConfig.MAX_ROWS): Cell {
    const nextRow = +this.row === maxRows ? +this.row : +this.row + 1;
    const newCellId = `${this.column}${nextRow}`;
    return new Cell(newCellId);
  }

  getPreviousColumn(maxColumns: number = SheetConfig.MAX_COLUMNS): Cell {
    const firstColumnCharCode = getFirstColumnCharCode();
    const nextRow =
      this.columnCharCode! - 1 < firstColumnCharCode && this.row > 1
        ? this.row - 1
        : this.row;

    const nextColumnCharCode =
      this.columnCharCode! - 1 < firstColumnCharCode
        ? getLastColumnCharCode(maxColumns)
        : this.columnCharCode! - 1;

    const newCellId = `${String.fromCharCode(nextColumnCharCode)}${nextRow}`;
    return new Cell(newCellId);
  }

  getPreviousRow(): Cell {
    const nextRow = +this.row === 1 ? +this.row : +this.row - 1;
    const newCellId = `${this.column}${nextRow}`;
    return new Cell(newCellId);
  }
}
