import { isObject, isString } from "../../../../../utils";
import { Dimension } from "../constants";
import { isFormula } from "../utils/cellUtils";
import Cell from "./Cell";
import CellData from "./CellData";
import Highlight from "./Highlight";

type StateContentDataShape = {
  [key: string]: any;
};

export default class SheetContentData {
  [key: string]: any;

  constructor(initialData: Partial<StateContentDataShape> = {}) {
    Object.keys(initialData).reduce<Partial<StateContentDataShape>>(
      (sheetContentData, it) => {
        const cell = it.toUpperCase();
        const cellData = new CellData({ id: cell });
        if (!isObject(initialData[it])) {
          if (isString(initialData[it]) && isFormula(initialData[it])) {
            cellData.previousFormula = initialData[it];
            cellData.formula = initialData[it];
            // sheetContentData[cell].formula = initialData[it];
          } else {
            cellData.previousValue = initialData[it];
            cellData.value = initialData[it];
          }
          cellData.display = initialData[it];
          sheetContentData[cell] = cellData;
        } else {
          sheetContentData[cell] = new CellData({
            ...initialData[it],
            id: cell,
          });
        }
        return sheetContentData;
      },
      this,
    );
  }

  insertRowOrColumn(
    dimension: Dimension,
    selectedCell: Cell,
    location: -1 | 1,
  ): SheetContentData {
    return Object.keys(this).reduce(
      (sheetContentData: SheetContentData, cellId: string) => {
        const cell = new Cell(cellId);
        const isGreater: boolean =
          location === -1
            ? cell[dimension] >= selectedCell[dimension]
            : cell[dimension] > selectedCell[dimension];
        if (isGreater) {
          const newId = cell.column + (cell.row + 1);
          const cellData = new CellData(this[cellId]);
          sheetContentData[cellId] = new CellData({ id: cellId });
          return {
            ...sheetContentData,
            [newId]: cellData?.setId(newId),
          } as SheetContentData;
        }
        return sheetContentData;
      },
      this,
    );
  }

  deleteCellContents(highlight: Highlight, cellId?: string) {
    if (cellId) {
      this[cellId] = new CellData({ id: cellId });
      return this;
    }
    return Object.keys(this)
      .filter((cell) => highlight.includes(cell))
      .reduce((sheetContentData, cell) => {
        return {
          ...sheetContentData,
          [cell]: new CellData({ id: cell }),
        };
      }, this);
  }

  setData(id: string, data: CellData): SheetContentData {
    this[id] = data;
    return this;
  }
}
