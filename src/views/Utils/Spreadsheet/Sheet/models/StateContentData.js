import { isFormula } from "../utils/cellUtils";
import CellData from "./CellData";

export default class StateContentData {
  constructor(initialData = {}) {
    Object.keys(initialData).reduce((stateContentData, it) => {
      const cell = it.toUpperCase();
      stateContentData[cell] = new CellData({ id: cell });
      if (initialData[it] !== null && typeof initialData[it] !== "object") {
        const isString =
          typeof initialData[it] === "string" ||
          initialData[it] instanceof String;
        if (isString && isFormula(initialData[it])) {
          stateContentData[cell].formula = initialData[it];
        } else {
          stateContentData[cell].value = initialData[it];
        }
        stateContentData[cell].display = initialData[it];
      } else {
        stateContentData[cell] = new CellData({
          id: cell,
          ...initialData[it],
        });
      }

      return stateContentData;
    }, this);
  }

  setData(id, data) {
    this[id] = data;
    return this;
  }
}
