import { SheetConfig } from "../constants";
import StateContentData from "./StateContentData";

export default class StateContent {
  constructor(rowHeights = {}, columnWidths = {}, data = {}, namedRanges = {}) {
    this.rowHeights = rowHeights;
    this.columnWidths = columnWidths;
    this.data = data;
    this.namedRanges = namedRanges;
  }

  setData(data) {
    this.data = data;
    return this;
  }

  setCellData(id, data) {
    this.data.setData(id, data);
    return this;
  }

  setRowHeight(row, height) {
    this.rowHeights[row] = height;
    return this;
  }

  setColumnWidth(column, width) {
    this.columnWidths[column] = width;
    return this;
  }

  setNamedRange(name, range) {
    this.namedRanges[name] = range;
  }

  static createFrom(
    initialData,
    defaultRowHeight = 24,
    defaultColumnWidth = 80,
    maxRows = SheetConfig.MAX_ROWS,
    maxColumns = SheetConfig.MAX_COLUMNS
  ) {
    const columnWidths = Array(maxColumns)
      .fill()
      .reduce((acc, _, idx) => {
        acc[SheetConfig.COLUMNS[idx]] = defaultColumnWidth;
        return acc;
      }, {});

    const rowHeights = Array(maxRows + 1)
      .fill()
      .reduce((acc, _, idx) => {
        acc[idx] = defaultRowHeight;
        return acc;
      }, {});

    const data = new StateContentData(initialData);

    return new StateContent(rowHeights, columnWidths, data);
  }
}
