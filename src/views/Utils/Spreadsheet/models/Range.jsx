import Cell from "./Cell";
const { getCellMinMax } = require("../Sheet/utils/cellUtils");

export default class Range {
  constructor(cells, ids, rows, columns) {
    this.cells = cells;
    this.ids = [...new Set(ids)];
    this.rows = [...new Set(rows)];
    this.columns = [...new Set(columns)];
  }

  static createFlat(start, end) {
    const { minC, maxC, minR, maxR } = getCellMinMax([start, end]);

    const cells = [];
    const rows = [];
    const columns = [];
    const ids = [];
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
    return new Range(cells, ids, rows, columns);
  }

  static create(start, end) {
    const { minC, maxC, minR, maxR } = getCellMinMax([start, end]);

    const cells = [];
    const rows = [];
    const columns = [];
    const ids = [];
    for (let row = minR; row <= maxR; row++) {
      const createdRow = [];
      const createdIds = [];
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
    return new Range(cells, ids, rows, columns);
  }

  static createFromCell(startCell, endCell) {
    const { minC, maxC, minR, maxR } = getCellMinMax([
      startCell.id,
      endCell.id,
    ]);

    const cells = [];
    const rows = [];
    const columns = [];
    const ids = [];
    for (let row = minR; row <= maxR; row++) {
      const createdRow = [];
      const createdIds = [];
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
    return new Range(cells, ids, rows, columns);
  }
}
