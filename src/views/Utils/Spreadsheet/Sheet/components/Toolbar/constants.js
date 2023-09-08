import {
  CalendarMonth,
  CurrencyExchange,
  NumbersOutlined,
  Percent,
  TextFields,
  TextFormat,
} from "@mui/icons-material";
import { IconClock, IconCurrencyDollar } from "@tabler/icons";

export const fontSizes = Object.freeze([8, 10, 12, 14, 16, 18, 20, 24]);

export const borderStyles = Object.freeze([
  {
    id: "borderBottom",
    props: { borderBottom: "1px solid black" },
    value: "Border Bottom",
  },
  {
    id: "borderTop",
    props: { borderTop: "1px solid black" },
    value: "Border Top",
  },
  {
    id: "borderLeft",
    props: { borderLeft: "1px solid black" },
    value: "Border Left",
  },
  {
    id: "borderRight",
    props: { borderRight: "1px solid black" },
    value: "Border Right",
  },
  {
    id: "noBorder",
    props: undefined,
    value: "No Border",
  },
  {
    id: "allBorders",
    props: {
      borderRight: "1px solid black",
      borderLeft: "1px solid black",
      borderTop: "1px solid black",
      borderBottom: "1px solid black",
      cellBorders: {
        borderRight: "1px solid black",
        borderLeft: "1px solid black",
        borderTop: "1px solid black",
        borderBottom: "1px solid black",
      },
    },
    value: "All Borders",
  },
  {
    id: "outsideBorders",
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
