const { getId } = require("../utils/cellUtils");

export default class Cell {
  constructor(id) {
    this.id = id;
    const { row, column, columnCharCode } = getId(id);
    this.row = Number(row);
    this.column = column;
    this.columnCharCode = columnCharCode;
  }
}
