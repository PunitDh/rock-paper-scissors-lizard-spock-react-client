import {
  CalendarMonth,
  NumbersOutlined,
  Percent,
  TextFields,
  TextFormat,
} from "@mui/icons-material";
import { IconClock, IconCurrencyDollar } from "@tabler/icons-react";

export type FontSize = (typeof fontSizes)[number];
export const fontSizes = [
  "8px",
  "10px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
] as const;

//   | "8px"
//   | "10px"
//   | "12px"
//   | "14px"
//   | "16px"
//   | "18px"
//   | "20px"
//   | "24px";

// export const fontSizes: ReadonlyArray<FontSize> = Object.freeze([
//   "8px",
//   "10px",
//   "12px",
//   "14px",
//   "16px",
//   "18px",
//   "20px",
//   "24px",
// ]);

export enum BorderType {
  BORDER_TOP = "borderTop",
  BORDER_RIGHT = "borderRight",
  BORDER_BOTTOM = "borderBottom",
  BORDER_LEFT = "borderLeft",
  NO_BORDER = "NO_BORDER",
  ALL_BORDERS = "ALL_BORDERS",
  OUTSIDE_BORDERS = "OUTSIDE_BORDERS",
  THICK_OUTSIDE_BORDERS = "THICK_OUTSIDE_BORDERS",
}

export const outsideBorders: ReadonlyArray<BorderType> = Object.freeze([
  BorderType.OUTSIDE_BORDERS,
  BorderType.THICK_OUTSIDE_BORDERS,
]);

export type BorderStyle = {
  id: BorderType;
  props?: { [key: string]: any };
  value: string;
};

export const borderStyles: ReadonlyArray<BorderStyle> = Object.freeze([
  {
    id: BorderType.BORDER_BOTTOM,
    props: { borderBottom: "1px solid black" },
    value: "Border Bottom",
  },
  {
    id: BorderType.BORDER_TOP,
    props: { borderTop: "1px solid black" },
    value: "Border Top",
  },
  {
    id: BorderType.BORDER_LEFT,
    props: { borderLeft: "1px solid black" },
    value: "Border Left",
  },
  {
    id: BorderType.BORDER_RIGHT,
    props: { borderRight: "1px solid black" },
    value: "Border Right",
  },
  {
    id: BorderType.NO_BORDER,
    props: undefined,
    value: "No Border",
  },
  {
    id: BorderType.ALL_BORDERS,
    props: {
      borderRight: "unset",
      borderLeft: "1px solid black",
      borderTop: "1px solid black",
      borderBottom: "unset",
      cellBorders: {
        borderRight: "1px solid black",
        borderLeft: "unset",
        borderTop: "unset",
        borderBottom: "1px solid black",
      },
    },
    value: "All Borders",
  },
  {
    id: BorderType.OUTSIDE_BORDERS,
    props: {
      borderRight: "1px solid black",
      borderLeft: "1px solid black",
      borderTop: "1px solid black",
      borderBottom: "1px solid black",
    },
    value: "Outside Borders",
  },
  {
    id: BorderType.THICK_OUTSIDE_BORDERS,
    props: {
      borderRight: "2px solid black",
      borderLeft: "2px solid black",
      borderTop: "2px solid black",
      borderBottom: "2px solid black",
    },
    value: "Thick Outside Borders",
  },
]);

export enum NumberFormat {
  GENERAL = "General",
  NUMBER = "Number",
  CURRENCY = "Currency",
  SHORT_DATE = "Short Date",
  LONG_DATE = "Long Date",
  TIME = "Time",
  PERCENTAGE = "Percentage",
  TEXT = "Text",
}

export enum AutoCalculate {
  SUM = "SUM",
  AVERAGE = "AVERAGE",
  COUNT = "COUNT",
}

type NumberFormatMenuItem = {
  id: NumberFormat;
  Icon: any;
};

export const numberFormats: ReadonlyArray<NumberFormatMenuItem> = Object.freeze(
  [
    { id: NumberFormat.GENERAL, Icon: TextFormat },
    { id: NumberFormat.NUMBER, Icon: NumbersOutlined },
    { id: NumberFormat.CURRENCY, Icon: IconCurrencyDollar },
    { id: NumberFormat.SHORT_DATE, Icon: CalendarMonth },
    { id: NumberFormat.LONG_DATE, Icon: CalendarMonth },
    { id: NumberFormat.TIME, Icon: IconClock },
    { id: NumberFormat.PERCENTAGE, Icon: Percent },
    { id: NumberFormat.TEXT, Icon: TextFields },
  ]
);
