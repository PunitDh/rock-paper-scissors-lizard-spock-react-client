import { SheetConfig } from "../constants";
import CellData from "./CellData";
import StateContentData from "./StateContentData";

export default class StateContent {
  rowHeights: { [key: string]: number };
  columnWidths: { [key: string]: number };
  data: StateContentData;
  namedRanges: { [key: string]: string[] };

  constructor(
    rowHeights = {},
    columnWidths = {},
    data = new StateContentData(),
    namedRanges = {}
  ) {
    this.rowHeights = rowHeights;
    this.columnWidths = columnWidths;
    this.data = data;
    this.namedRanges = namedRanges;
  }

  setData(data: StateContentData) {
    this.data = data;
    return this;
  }

  setCellData(id: string, data: CellData) {
    this.data.setData(id, data);
    return this;
  }

  setRowHeight(row: number, height: number) {
    this.rowHeights[row] = height;
    return this;
  }

  setColumnWidth(column: string, width: number) {
    this.columnWidths[column] = width;
    return this;
  }

  setNamedRange(name: string, range: string[]) {
    this.namedRanges[name] = range;
  }

  static createFrom(
    initialData: { [key: string]: any },
    defaultRowHeight = 24,
    defaultColumnWidth = 80,
    maxRows = SheetConfig.MAX_ROWS,
    maxColumns = SheetConfig.MAX_COLUMNS
  ) {
    const columnWidths = Array(maxColumns)
      .fill(0)
      .reduce((acc, _, idx) => {
        acc[SheetConfig.COLUMNS[idx]] = defaultColumnWidth;
        return acc;
      }, {});

    const rowHeights = Array(maxRows + 1)
      .fill(0)
      .reduce((acc, _, idx) => {
        acc[idx] = defaultRowHeight;
        return acc;
      }, {});

    const data = new StateContentData(initialData);

    return new StateContent(rowHeights, columnWidths, data);
  }
}
