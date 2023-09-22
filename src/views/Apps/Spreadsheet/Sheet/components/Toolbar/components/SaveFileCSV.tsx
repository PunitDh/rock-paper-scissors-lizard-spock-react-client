import React from "react";
import { Tooltip } from "@mui/material";
import { FieldButton } from "../../styles";
import { SheetConfig } from "../../../constants";
import CellRange from "../../../models/CellRange";
import CSVIcon from "./icons/CSVIcon";
import { State } from "../../../types";
import Cell from "../../../models/Cell";

type Props = {
  state: State;
};

const SaveFileCSV = ({ state }: Props) => {
  const activeSheet = state.sheets[state.activeSheet];

  const handleExportAsCsv = () => {
    const range = CellRange.createHorizontalSliced(
      `A1`,
      `${SheetConfig.COLUMNS[state.maxColumns - 1]}${state.maxRows}`
    );
    const content = (range.cells as Cell[][])
      .map((row: Cell[]) =>
        row
          .map(
            (cell: Cell) =>
              activeSheet.content.data[cell.id]?.value || ""
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob([content], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${activeSheet.name}.csv`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  };

  return (
    <Tooltip title="Export as CSV">
      <FieldButton type="button" onClick={handleExportAsCsv}>
        {/* <Save sx={{ width: "1rem" }} /> */}
        <CSVIcon width="1rem" />
      </FieldButton>
    </Tooltip>
  );
};

export default SaveFileCSV;
