import { isObject } from "../../../../../utils";
import { SheetConfig } from "../constants";
import CellData from "./CellData";
import SheetContentData from "./SheetContentData";

export default class SheetContent {
  rowHeights: { [key: string]: number };
  columnWidths: { [key: string]: number };
  data: SheetContentData;
  namedRanges: { [key: string]: string[] };

  constructor(
    rowHeights = {},
    columnWidths = {},
    data = new SheetContentData(),
    namedRanges = {}
  ) {
    this.rowHeights = rowHeights;
    this.columnWidths = columnWidths;
    this.data = data;
    this.namedRanges = namedRanges;
  }

  setData(data: SheetContentData) {
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

  static findDelta(
    obj1?: { [key: string]: any },
    obj2?: { [key: string]: any }
  ): { [key: string]: any } {
    if (!obj1 || !obj2) return {};
    const compare = (
      thisObj: { [key: string]: any },
      otherObj: { [key: string]: any }
    ) => {
      const diff = {};

      for (const key in otherObj) {
        if (!(key in thisObj)) {
          diff[key] = otherObj[key];
        } else if (
          Array.isArray(thisObj[key]) &&
          Array.isArray(otherObj[key])
        ) {
          if (!arraysEqual(thisObj[key], otherObj[key])) {
            diff[key] = otherObj[key];
          }
        } else if (isObject(thisObj[key]) && isObject(otherObj[key])) {
          const nestedDiff = compare(thisObj[key], otherObj[key]);
          if (Object.keys(nestedDiff).length > 0) {
            diff[key] = nestedDiff;
          }
        } else if (thisObj[key] !== otherObj[key]) {
          diff[key] = otherObj[key];
        }
      }

      return diff;
    };

    const arraysEqual = (
      arr1: string | any[],
      arr2: string | any[]
    ): boolean => {
      if (arr1.length !== arr2.length) {
        return false;
      }

      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
          return false;
        }
      }

      return true;
    };

    return compare(obj1, obj2);
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
      .reduce(
        (acc, _, idx) => ({
          ...acc,
          [SheetConfig.COLUMNS[idx]]: defaultColumnWidth,
        }),
        {}
      );

    const rowHeights = Array(maxRows + 1)
      .fill(0)
      .reduce(
        (acc, _, idx) => ({
          ...acc,
          [idx]: defaultRowHeight,
        }),
        {}
      );

    const data = new SheetContentData(initialData);

    return new SheetContent(rowHeights, columnWidths, data);
  }
}
