import { NumberFormat } from "../components/Toolbar/constants";

export default class CellFormatting {
  borderId?: string | null;
  borderTypes?: string[];
  decimals?: number;
  numberFormat?: NumberFormat;
  backgroundColor?: string;
  color?: string;
  textAlign?: "left" | "right" | "center";
  fontFamily?: string;
  fontSize?: string;

  constructor({
    borderId = null,
    borderTypes = [],
    decimals = 0,
    numberFormat = undefined,
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

  setFormatting(formatting: CellFormatting) {
    this.borderId = formatting.borderId || this.borderId;
    this.borderTypes = formatting.borderTypes || this.borderTypes;
    this.decimals = formatting.decimals || this.decimals;
    this.numberFormat = formatting.numberFormat || this.numberFormat;
    this.backgroundColor = formatting.backgroundColor || this.backgroundColor;
    this.color = formatting.color || this.color;
    this.textAlign = formatting.textAlign || this.textAlign;
    this.fontFamily = formatting.fontFamily || this.fontFamily;
    this.fontSize = formatting.fontSize || this.fontSize;

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

  setNumberFormatting(numberFormat: NumberFormat) {
    this.numberFormat = numberFormat;
    return this;
  }
}
