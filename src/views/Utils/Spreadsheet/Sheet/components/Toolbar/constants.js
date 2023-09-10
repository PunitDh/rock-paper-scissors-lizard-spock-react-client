import {
  CalendarMonth,
  NumbersOutlined,
  Percent,
  TextFields,
  TextFormat,
} from "@mui/icons-material";
import { IconClock, IconCurrencyDollar } from "@tabler/icons";

export const fontSizes = Object.freeze([
  "8px",
  "10px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
]);

export const Border = Object.freeze({
  BORDER_TOP: "borderTop",
  BORDER_RIGHT: "borderRight",
  BORDER_BOTTOM: "borderBottom",
  BORDER_LEFT: "borderLeft",
  NO_BORDER: "NO_BORDER",
  ALL_BORDERS: "ALL_BORDERS",
  OUTSIDE_BORDERS: "OUTSIDE_BORDERS",
});

export const borderStyles = Object.freeze([
  {
    id: Border.BORDER_BOTTOM,
    props: { borderBottom: "1px solid black" },
    value: "Border Bottom",
  },
  {
    id: Border.BORDER_TOP,
    props: { borderTop: "1px solid black" },
    value: "Border Top",
  },
  {
    id: Border.BORDER_LEFT,
    props: { borderLeft: "1px solid black" },
    value: "Border Left",
  },
  {
    id: Border.BORDER_RIGHT,
    props: { borderRight: "1px solid black" },
    value: "Border Right",
  },
  {
    id: Border.NO_BORDER,
    props: undefined,
    value: "No Border",
  },
  {
    id: Border.ALL_BORDERS,
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
    id: Border.OUTSIDE_BORDERS,
    props: {
      borderRight: "1px solid black",
      borderLeft: "1px solid black",
      borderTop: "1px solid black",
      borderBottom: "1px solid black",
    },
    value: "Outside Borders",
  },
]);

export const numberFormats = Object.freeze([
  { id: "General", function: String, Icon: TextFormat },
  { id: "Number", function: Number, Icon: NumbersOutlined },
  {
    id: "Currency",
    function: (it) =>
      new Intl.NumberFormat(undefined, { style: "currency" }).format(it),
    Icon: IconCurrencyDollar,
  },
  {
    id: "Short Date",
    function: (it) => new Intl.DateTimeFormat(undefined).format(it),
    Icon: CalendarMonth,
  },
  {
    id: "Long Date",
    function: (it) =>
      new Intl.DateTimeFormat(undefined, {
        dateStyle: "full",
        timeStyle: "long",
      }).format(it),
    Icon: CalendarMonth,
  },
  {
    id: "Time",
    function: (it) =>
      new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }).format(it),
    Icon: IconClock,
  },
  {
    id: "Percentage",
    function: (it) =>
      Number(it / 100).toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 2,
      }),
    Icon: Percent,
  },
  { id: "Text", function: String, Icon: TextFields },
]);
