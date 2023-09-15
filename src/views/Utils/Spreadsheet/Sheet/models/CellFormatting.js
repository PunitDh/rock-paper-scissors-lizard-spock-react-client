export default class CellFormatting {
  // borderId?: string | null;
  // borderTypes?: string[];
  // decimals?: number;
  // numberFormat?: string | null;
  // backgroundColor?: string | undefined;
  // color?: string | undefined;
  // textAlign?: "left" | "right" | "center" | undefined;

  constructor({
    borderId = null,
    borderTypes = [],
    decimals = 0,
    numberFormat = null,
    backgroundColor = undefined,
    color = undefined,
    textAlign = undefined,
    fontFamily = undefined,
    fontSize = undefined,
  } = {}) {
    this.borderId = borderId;
    this.borderTypes = borderTypes;
    this.decimals = decimals;
    this.numberFormat = numberFormat;
    this.backgroundColor = backgroundColor;
    this.color = color;
    this.textAlign = textAlign;
    this.fontFamily = fontFamily;
    this.fontSize = fontSize;
  }

  setFormatting({
    borderId = null,
    borderTypes = [],
    decimals = 0,
    numberFormat = null,
    backgroundColor = undefined,
    color = undefined,
    textAlign = undefined,
    fontFamily = undefined,
    fontSize = undefined,
  }) {
    this.borderId = borderId || this.borderId;
    this.borderTypes = borderTypes || this.borderTypes;
    this.decimals = decimals || this.decimals;
    this.numberFormat = numberFormat || this.numberFormat;
    this.backgroundColor = backgroundColor || this.backgroundColor;
    this.color = color || this.color;
    this.textAlign = textAlign || this.textAlign;
    this.fontFamily = fontFamily || this.fontFamily;
    this.fontSize = fontSize || this.fontSize;

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
