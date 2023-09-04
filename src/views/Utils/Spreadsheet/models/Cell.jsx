const { getId } = require("../utils");

export default class Cell {
  constructor(id) {
    this.id = id;
    const { row, column, columnCharCode } = getId(id);
    this.row = row;
    this.column = column;
    this.columnCharCode = columnCharCode;
  }
}
