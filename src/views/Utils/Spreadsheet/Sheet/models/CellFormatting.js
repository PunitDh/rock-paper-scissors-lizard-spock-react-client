export default class CellFormatting {
  constructor(obj) {
    if (obj) {
      Object.entries(obj).forEach(([key, value]) => {
        this[key] = value;
      });
      return this;
    } else {
      this.borderId = null;
      this.borderTypes = [];
      this.decimals = 0;
      this.numberFormat = null;
    }
    this.backgroundColor = undefined;
    this.color = undefined;
    this.textAlign = undefined;
  }

  setFormatting(obj) {
    if (!obj) return this;
    Object.entries(obj).forEach(([key, value]) => {
      this[key] = value;
    });
    return this;
  }

  clearBorders() {
    this.borderId = null;
    this.borderTypes = [];
    return this;
  }

  addBorder(borderId, borderType) {
    this.borderId = borderId;
    const currentBorderTypes = new Set(this.borderTypes);
    currentBorderTypes.add(borderType);
    this.borderTypes = [...currentBorderTypes];
    return this;
  }

  setDecimals(decimals) {
    this.decimals = decimals;
    return this;
  }

  setNumberFormatting(numberFormat) {
    this.numberFormat = numberFormat;
    return this;
  }
}
