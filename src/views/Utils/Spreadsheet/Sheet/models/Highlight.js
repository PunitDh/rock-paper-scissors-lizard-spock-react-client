export default class Highlight {
  constructor(obj = {}) {
    this.rowAnchor = obj.rowAnchor || null;
    this.columnAnchor = obj.columnAnchor || null;
    this.cellAnchor = obj.cellAnchor || null;
    this.cells = obj.cells || [];
    this.rows = obj.rows || [];
    this.columns = obj.columns || [];
    this.sum = null;
    this.average = null;
    this.count = null;
  }

  setRowAnchor(rowAnchor) {
    this.rowAnchor = rowAnchor;
    return this;
  }

  setColumnAnchor(columnAnchor) {
    this.columnAnchor = columnAnchor;
    return this;
  }

  setCellAnchor(cellAnchor) {
    this.cellAnchor = cellAnchor;
    return this;
  }

  setCells(cells, stateContentData) {
    this.cells = cells;
    this.calculateSum(stateContentData);
    this.calculateAverage(stateContentData);
    this.calculateCount(stateContentData);
    return this;
  }

  setRows(rows) {
    this.rows = rows;
    return this;
  }

  setColumns(columns) {
    this.columns = columns;
    return this;
  }

  calculateSum(stateContentData) {
    if (this.cells.length > 1) {
      const sum = this.cells
        .filter((cell) => !isNaN(parseFloat(stateContentData[cell]?.value)))
        .reduce(
          (acc, cell) => acc + parseFloat(stateContentData[cell]?.value),
          null
        );
      this.sum = sum;
    } else {
      this.sum = null;
    }
    return this;
  }

  calculateAverage(stateContentData) {
    if (this.cells.length > 1) {
      const average =
        this.sum /
        (this.cells.filter(
          (cell) => !isNaN(parseFloat(stateContentData[cell]?.value))
        ).length || 1);
      this.average = average;
    } else {
      this.average = null;
    }
    return this;
  }

  calculateCount(stateContentData) {
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
