import {
  BorderType,
  FontSize,
  NumberFormat,
} from "../components/Toolbar/constants";

type FontWeight = "bold" | "normal";
type FontStyle = "italic" | "normal";
type TextDecoration = "underline" | "none";

type IncomingFormatting = {
  borderId?: string | null;
  borderTypes?: string[];
  decimals?: number;
  numberFormat?: NumberFormat;
  styles?: {
    backgroundColor?: string;
    color?: string;
    fontFamily?: string;
    fontSize?: FontSize;
    fontWeight?: FontWeight;
    fontStyle?: FontStyle;
    textDecoration?: TextDecoration;
    textAlign?: "left" | "right" | "center";
  };
};

export default class CellFormatting {
  borderId?: string | null;
  borderTypes: string[] = [];
  decimals?: number;
  numberFormat?: NumberFormat;
  styles: {
    backgroundColor?: string;
    color?: string;
    textAlign?: "left" | "right" | "center";
    fontFamily?: string;
    fontSize?: FontSize;
    fontWeight?: FontWeight;
    fontStyle?: FontStyle;
    textDecoration?: TextDecoration;
  } = {};

  constructor({
    borderId = null,
    borderTypes = [],
    decimals = 0,
    numberFormat = undefined,
    styles = {},
  }: IncomingFormatting = {}) {
    this.borderId = borderId;
    this.borderTypes = borderTypes;
    this.decimals = decimals;
    this.numberFormat = numberFormat;
    this.styles = styles;
  }

  setFormatting(formatting: IncomingFormatting): CellFormatting {
    const newFormatting = new CellFormatting({
      borderId: formatting.borderId || this.borderId,
      borderTypes: formatting.borderTypes || this.borderTypes,
      decimals: formatting.decimals || this.decimals,
      numberFormat: formatting.numberFormat || this.numberFormat,
      styles: {
        ...this.styles,
        ...formatting.styles,
      },
    });

    return newFormatting;
  }

  clearBorders(): CellFormatting {
    const newFormatting = new CellFormatting({
      ...this,
      borderId: null,
      borderTypes: [],
    });

    return newFormatting;
  }

  addBorder(
    borderId: string | null | undefined,
    borderType: BorderType
  ): CellFormatting {
    const currentBorderTypes = new Set(this.borderTypes);
    currentBorderTypes.add(borderType);

    const newFormatting = new CellFormatting({
      ...this,
      borderId,
      borderTypes: [...currentBorderTypes],
    });

    return newFormatting;
  }

  setDecimals(decimals: number | undefined): CellFormatting {
    const newFormatting = new CellFormatting({
      ...this,
      decimals,
    });

    return newFormatting;
  }

  setNumberFormatting(numberFormat: NumberFormat): CellFormatting {
    const newFormatting = new CellFormatting({
      ...this,
      numberFormat,
    });

    return newFormatting;
  }
}
