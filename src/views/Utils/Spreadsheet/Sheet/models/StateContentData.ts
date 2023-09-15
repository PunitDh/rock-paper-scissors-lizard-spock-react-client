import { isObject, isString } from "../../../../../utils";
import { isFormula } from "../utils/cellUtils";
import CellData from "./CellData";

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
            cellData.formula = initialData[it];
            // stateContentData[cell].formula = initialData[it];
          } else {
            cellData.value = initialData[it];
          }
          cellData.display = initialData[it];
          stateContentData[cell] = cellData;
        } else {
          stateContentData[cell] = new CellData({
            id: cell,
            ...initialData[it],
          });
        }
        return stateContentData;
      },
      {}
    );
  }

  setData(id: string, data: CellData): StateContentData {
    this[id] = data;
    return this;
  }
}
