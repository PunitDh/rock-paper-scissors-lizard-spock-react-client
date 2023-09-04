import Cell from "./Cell";
const { getCellMinMax } = require("../utils");

export default class Range {
  constructor(cells, ids, rows, columns) {
    this.cells = cells;
    this.ids = [...new Set(ids)];
    this.rows = [...new Set(rows)];
    this.columns = [...new Set(columns)];
  }

  static create(start, end) {
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
}
