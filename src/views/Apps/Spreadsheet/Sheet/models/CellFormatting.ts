import {
  BorderType,
  FontSize,
  NumberFormat,
} from "../components/Toolbar/constants";

export default class CellFormatting {
  borderId?: string | null;
  borderTypes?: string[];
  decimals?: number;
  numberFormat?: NumberFormat;
  styles?: {
    backgroundColor?: string;
    color?: string;
    textAlign?: "left" | "right" | "center";
    fontFamily?: string;
    fontSize?: FontSize;
    fontWeight?: "bold" | "normal";
    fontStyle?: "italic" | "normal";
    textDecoration?: "underline" | "none";
  };

  constructor({
    borderId = null,
    borderTypes = [],
    decimals = 0,
    numberFormat = undefined,
    backgroundColor = undefined,
    color = undefined,
    fontFamily = undefined,
    fontSize = undefined,
    fontWeight = undefined,
    fontStyle = undefined,
    textDecoration = undefined,
    textAlign = undefined,
  } = {}) {
    this.borderId = borderId;
    this.borderTypes = borderTypes;
    this.decimals = decimals;
    this.numberFormat = numberFormat;
    this.styles = {
      backgroundColor,
      color,
      fontFamily,
      fontSize,
      fontWeight,
      fontStyle,
      textDecoration,
      textAlign,
    };
  }

  setFormatting(formatting: any) {
    this.borderId = formatting.borderId || this.borderId;
    this.borderTypes = formatting.borderTypes || this.borderTypes;
    this.decimals = formatting.decimals || this.decimals;
    this.numberFormat = formatting.numberFormat || this.numberFormat;

    this.styles = {
      ...this.styles,
      ...formatting,
    };

    console.log("here", formatting);

    return this;
  }

  clearBorders() {
    this.borderId = null;
    this.borderTypes = [];
    return this;
  }

  addBorder(borderId: string | null | undefined, borderType: BorderType) {
    this.borderId = borderId;
    const currentBorderTypes = new Set(this.borderTypes);
    currentBorderTypes.add(borderType);
    this.borderTypes = [...currentBorderTypes];
    return this;
  }

  setDecimals(decimals: number | undefined) {
    this.decimals = decimals;
    return this;
  }

  setNumberFormatting(numberFormat: NumberFormat) {
    this.numberFormat = numberFormat;
    return this;
  }
}
