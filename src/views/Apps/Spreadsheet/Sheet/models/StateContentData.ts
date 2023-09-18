import { isObject, isString } from "../../../../../utils";
import { Dimension } from "../constants";
import { isFormula } from "../utils/cellUtils";
import Cell from "./Cell";
import CellData from "./CellData";
import Highlight from "./Highlight";

type StateContentDataShape = {
  [key: string]: any;
};

export default class StateContentData {
  [key: string]: any;

  constructor(initialData: Partial<StateContentDataShape> = {}) {
    Object.keys(initialData).reduce<Partial<StateContentDataShape>>(
      (stateContentData, it) => {
        const cell = it.toUpperCase();
        const cellData = new CellData({ id: cell });
        if (!isObject(initialData[it])) {
          if (isString(initialData[it]) && isFormula(initialData[it])) {
            cellData.previousFormula = initialData[it];
            cellData.formula = initialData[it];
            // stateContentData[cell].formula = initialData[it];
          } else {
            cellData.previousValue = initialData[it];
            cellData.value = initialData[it];
          }
          cellData.display = initialData[it];
          stateContentData[cell] = cellData;
        } else {
          stateContentData[cell] = new CellData({
            ...initialData[it],
            id: cell,
          });
        }
        return stateContentData;
      },
      this
    );
  }

  insertRowOrColumn(
    dimension: Dimension,
    selectedCell: Cell,
    location: -1 | 1
  ): StateContentData {
    return Object.keys(this).reduce(
      (stateContentData: StateContentData, cellId: string) => {
        const cell = new Cell(cellId);
        const isGreater: boolean =
          location === -1
            ? cell[dimension] >= selectedCell[dimension]
            : cell[dimension] > selectedCell[dimension];
        if (isGreater) {
          const newId = cell.column + (cell.row + 1);
          const cellData = new CellData(this[cellId]);
          stateContentData[cellId] = new CellData({ id: cellId });
          return {
            ...stateContentData,
            [newId]: cellData?.setId(newId),
          } as StateContentData;
        }
        return stateContentData;
      },
      this
    );
  }

  deleteCellContents(highlight: Highlight, cellId?: string) {
    if (cellId) {
      this[cellId] = new CellData({ id: cellId });
      return this;
    }
    return Object.keys(this)
      .filter((cell) => highlight.includes(cell))
      .reduce((stateContentData, cell) => {
        return {
          ...stateContentData,
          [cell]: new CellData({ id: cell }),
        };
      }, this);
  }

  setData(id: string, data: CellData): StateContentData {
    this[id] = data;
    return this;
  }
}
