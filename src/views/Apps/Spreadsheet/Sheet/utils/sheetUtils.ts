import { toList } from "../../../../../utils/List";
import { SheetConfig } from "../constants";
import Cell from "../models/Cell";
import CellRange from "../models/CellRange";
import { Sheet } from "../types";

export const reIndexSheets = (sheets: {
  [key: string]: Sheet;
}): { [key: string]: Sheet } => {
  return toList<Sheet>(Object.values(sheets))
    .sortBy((it) => it.index)
    .reduce((acc, cur, index) => {
      return {
        ...acc,
        [cur.id]: {
          ...cur,
          index: index + 1,
        },
      };
    }, {});
};

export const exportSheetAsCSV = (
  sheet: Sheet,
  maxRows: number,
  maxColumns: number,
  filename: string
) => {
  const range = CellRange.createHorizontalSliced(
    "A1",
    `${SheetConfig.COLUMNS[maxColumns - 1]}${maxRows}`
  );
  const content = (range.cells as Cell[][])
    .map((row: Cell[]) =>
      row
        .map((cell: Cell) => sheet.content.data[cell.id]?.value || "")
        .join(",")
    )
    .join("\n");

  const blob = new Blob([content], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);
};
