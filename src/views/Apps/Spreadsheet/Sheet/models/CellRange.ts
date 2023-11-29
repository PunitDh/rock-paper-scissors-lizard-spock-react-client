import { List, listOf, toList } from "../../../../../utils/List";
import { CellId, CellMinMax, ColumnId, RowId } from "../types";
import Cell from "./Cell";

export default class CellRange {
  cells: Cell[] | Cell[][];
  cellIds: CellId[] | CellId[][];
  rows: RowId[];
  columns: ColumnId[];

  constructor(
    cells: Cell[] | Cell[][],
    cellIds: CellId[] | CellId[][],
    rows: RowId[],
    columns: ColumnId[]
  ) {
    this.cells = cells;
    this.cellIds = Array.from(new Set<any>(cellIds));
    this.rows = Array.from(new Set<number>(rows));
    this.columns = Array.from(new Set<string>(columns));
  }

  static createFlat(start: CellId, end: CellId): CellRange {
    const { minC, maxC, minR, maxR } = getCellMinMax(start, end);

    const cells: List<Cell> = listOf();
    const rows: List<RowId> = listOf();
    const columns: List<ColumnId> = listOf();
    const ids: List<CellId> = listOf();

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

  static createHorizontalSliced(start: CellId, end: CellId): CellRange {
    const { minC, maxC, minR, maxR } = getCellMinMax(start, end);

    const cells: Cell[][] = [];
    const rows: List<RowId> = listOf();
    const columns: List<ColumnId> = listOf();
    const ids: CellId[][] = [];

    for (let row = minR; row <= maxR; row++) {
      const createdRow = listOf<Cell>();
      const createdIds = listOf<CellId>();
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

  static createVerticalSliced(start: CellId, end: CellId): CellRange {
    const { minC, maxC, minR, maxR } = getCellMinMax(start, end);

    const cells: List<List<Cell>> = listOf();
    const rows: List<RowId> = listOf();
    const columns: List<ColumnId> = listOf();
    const cellIds: List<List<CellId>> = listOf();

    for (let col = minC; col <= maxC; col++) {
      const createdColumns: List<Cell> = listOf();
      const createdIds: List<CellId> = listOf();
      for (let row = minR; row <= maxR; row++) {
        const column = String.fromCharCode(col);
        const id = `${column}${row}`;
        createdColumns.push(new Cell(id));
        columns.push(column);
        rows.push(row);
        createdIds.push(id);
      }
      cells.push(createdColumns);
      cellIds.push(createdIds);
    }
    // return cells;
    return new CellRange(cells, cellIds, rows, columns);
  }
}

const getCellMinMax = (start: CellId, end: CellId): CellMinMax => {
  const ids: Cell[] = [start, end].map((it) => new Cell(it));

  const columnCharCodes: List<number> = toList<number>(
    ids.map((it) => it.columnCharCode)
  );
  const rows = toList<number>(ids.map((it) => Number(it.row)));

  const { min: minC, max: maxC } = columnCharCodes.minmax();
  const { min: minR, max: maxR } = rows.minmax();

  return {
    minC,
    maxC,
    minR,
    maxR,
  };
};
