import Cell from "./Cell";
const { getCellMinMax } = require("../utils");

export default class Range {
  static create(start, end) {
    const { minC, maxC, minR, maxR } = getCellMinMax([start, end]);

    let range = [];
    for (let c = minC; c <= maxC; c++) {
      for (let r = minR; r <= maxR; r++) {
        range.push(new Cell(`${String.fromCharCode(c)}${r}`));
      }
    }
    return range;
  }
}
