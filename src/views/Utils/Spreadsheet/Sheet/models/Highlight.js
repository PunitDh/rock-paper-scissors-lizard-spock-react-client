import { isNumber } from "src/utils";

export default class Highlight {
  constructor(obj = {}) {
    this.rowAnchor = obj.rowAnchor || null;
    this.columnAnchor = obj.columnAnchor || null;
    this.cellAnchor = obj.cellAnchor || null;
    this.cells = obj.cells || [];
    this.rows = obj.rows || [];
    this.columns = obj.columns || [];
    this.rangeStart = obj.rangeStart || null;
    this.rangeEnd = obj.rangeEnd || null;
    this.sum = null;
    this.average = null;
    this.count = null;
  }

  /**
   *
   * @param {Number} row
   * @returns {Highlight}
   */
  setRowAnchor(row) {
    this.rowAnchor = row;
    return this;
  }

  /**
   *
   * @param {String} column
   * @returns {Highlight}
   */
  setColumnAnchor(column) {
    this.columnAnchor = column;
    return this;
  }

  /**
   *
   * @param {String} cellId
   * @returns {Highlight}
   */
  setCellAnchor(cellId) {
    this.cellAnchor = cellId;
    return this;
  }

  /**
   *
   * @param {String} cellId
   * @returns {Highlight}
   */
  setRangeStart(cellId) {
    this.rangeStart = cellId;
    return this;
  }

  /**
   *
   * @param {String} cellId
   * @returns {Highlight}
   */
  setRangeEnd(cellId) {
    this.rangeEnd = cellId;
    return this;
  }

  /**
   *
   * @param {Array<String>} cellIds
   * @param {Object} stateContentData
   * @returns {Highlight}
   */
  setCells(cellIds, stateContentData) {
    this.cells = cellIds;
    this.calculateSum(stateContentData);
    this.calculateAverage(stateContentData);
    this.calculateCount(stateContentData);
    return this;
  }

  /**
   *
   * @param {Array<String>} rowIds
   * @returns {Highlight}
   */
  setRows(rowIds) {
    this.rows = rowIds;
    return this;
  }

  /**
   *
   * @param {Array<String>} columnIds
   * @returns {Highlight}
   */
  setColumns(columnIds) {
    this.columns = columnIds;
    return this;
  }

  /**
   *
   * @param {Object} stateContentData
   * @returns {Highlight}
   */
  calculateSum(stateContentData) {
    if (this.cells.length > 1) {
      const sum = this.cells
        .filter((cell) => isNumber(stateContentData[cell]?.value))
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

  /**
   *
   * @param {Object} stateContentData
   * @returns {Highlight}
   */
  calculateAverage(stateContentData) {
    if (this.cells.length > 1) {
      const average =
        this.sum /
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
