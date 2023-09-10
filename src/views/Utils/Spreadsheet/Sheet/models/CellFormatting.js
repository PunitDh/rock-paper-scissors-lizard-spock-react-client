import { Border } from "../components/Toolbar/constants";

export default class CellFormatting {
  constructor(obj) {
    if (obj) {
      Object.entries(obj).forEach(([key, value]) => {
        this[key] = value;
      });
    } else {
      this.borderId = null;
      this.borders = [];
      this.decimals = 0;
      this.numberFormatting = null;
    }
  }

  setFormatting(obj) {
    if (!obj) return this;
    Object.entries(obj).forEach(([key, value]) => {
      this[key] = value;
    });
    return this;
  }

  addBorder(borderId) {
    const borders = new Set(this.borders);
    borders.add(borderId);
    this.borders = [...borders];
    this.borderId = Border.OUTSIDE_BORDERS;
    return this;
  }

  setDecimals(decimals) {
    this.decimals = decimals;
    return this;
  }

  setNumberFormatting(numberFormatting) {
    this.numberFormatting = numberFormatting;
    return this;
  }
}
