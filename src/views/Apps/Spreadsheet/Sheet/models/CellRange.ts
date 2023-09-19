import { List, listOf } from "../../../../../utils/List";
import Cell from "./Cell";

type CellId = {
  row?: number;
  column?: string;
  columnCharCode?: number;
};

export default class CellRange {
  cells: Cell[] | Cell[][];
  cellIds: string[] | string[][];
  rows: number[];
  columns: string[];

  constructor(
    cells: Cell[] | Cell[][],
    cellIds: string[] | string[][],
    rows: number[],
    columns: string[]
  ) {
    this.cells = cells;
    this.cellIds = Array.from(new Set<any>(cellIds));
    this.rows = Array.from(new Set<number>(rows));
    this.columns = Array.from(new Set<string>(columns));
  }

  static createFlat(start: string, end: string): CellRange {
    const { minC, maxC, minR, maxR } = getCellMinMax([start, end]);

    const cells: List<Cell> = listOf();
    const rows: List<number> = listOf();
    const columns: List<string> = listOf();
    const ids: List<string> = listOf();
    for (let col = minC; col <= maxC; col++) {
      for (let row = minR; row <= maxR; row++) {
        const column = String.fromCharCode(col);
        const id = `${column}${row}`;
        columns.push(column);
        rows.push(row);
        ids.push(id);
        cells.push(new Cell(id));
      }
    }
    // return cells;
    return new CellRange(cells, ids, rows, columns);
  }

  static createHorizontalSliced(start: string, end: string): CellRange {
    const { minC, maxC, minR, maxR } = getCellMinMax([start, end]);

    const cells: Cell[][] = [];
    const rows: List<number> = listOf();
    const columns: List<string> = listOf();
    const ids: string[][] = [];

    for (let row = minR; row <= maxR; row++) {
      const createdRow: List<Cell> = listOf();
      const createdIds: List<string> = listOf();
      for (let col = minC; col <= maxC; col++) {
        const column = String.fromCharCode(col);
        const id = `${column}${row}`;
        createdRow.push(new Cell(id));
        columns.push(column);
        rows.push(row);
        createdIds.push(id);
      }
      cells.push(createdRow);
      ids.push(createdIds);
    }
    // return cells;
    return new CellRange(cells, ids, rows, columns);
  }

  static createVerticalSliced(start: string, end: string): CellRange {
    const { minC, maxC, minR, maxR } = getCellMinMax([start, end]);

    const cells: List<List<Cell>> = listOf();
    const rows: List<number> = listOf();
    const columns: List<string> = listOf();
    const ids: List<List<string>> = listOf();

    for (let col = minC; col <= maxC; col++) {
      const createdColumns: List<Cell> = listOf();
      const createdIds: List<string> = listOf();
      for (let row = minR; row <= maxR; row++) {
        const column = String.fromCharCode(col);
        const id = `${column}${row}`;
        createdColumns.push(new Cell(id));
        columns.push(column);
        rows.push(row);
        createdIds.push(id);
      }
      cells.push(createdColumns);
      ids.push(createdIds);
    }
    // return cells;
    return new CellRange(cells, ids, rows, columns);
  }
}

const getId = (id: string): CellId => {
  const row = id?.match(/\d+/g);
  const column = id?.match(/[A-Z]/g);
  const columnCharCode = id?.match(/[A-Z]/g);

  if (row && column && columnCharCode)
    return {
      row: Number(row[0]),
      column: column[0],
      columnCharCode: columnCharCode[0].charCodeAt(0),
    };
  return {};
};

const getCellMinMax = (highlighted: string[]) => {
  const ids = highlighted.map(getId);

  const columnCharCodes: number[] = ids.map((it) => it.columnCharCode!);
  const rows = ids.map((it) => Number(it.row));
  const minC = Math.min(...columnCharCodes);
  const maxC = Math.max(...columnCharCodes);
  const minR = Math.min(...rows);
  const maxR = Math.max(...rows);

  return {
    minC,
    maxC,
    minR,
    maxR,
  };
};
