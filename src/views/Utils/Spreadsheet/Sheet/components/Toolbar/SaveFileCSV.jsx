import { Tooltip } from "@mui/material";
import { FieldButton } from "../styles";
import { Save } from "@mui/icons-material";
import { SheetConfig } from "../../constants";
import CellRange from "../../models/CellRange";

const SaveFileCSV = ({ state }) => {
  const handleExportAsCsv = () => {
    const range = CellRange.create(
      `A1`,
      `${SheetConfig.COLUMNS[state.maxColumns - 1]}${state.maxRows}`
    );
    const content = range.cells
      .map((row) =>
        row.map((cell) => state.content.data[cell.id]?.value || "").join(",")
      )
      .join("\n");
    const blob = new Blob([content], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Sheet1.csv`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  return (
    <Tooltip title="Export as CSV">
      <FieldButton type="button" onClick={handleExportAsCsv}>
        <Save sx={{ width: "1rem" }} />
      </FieldButton>
    </Tooltip>
  );
};

export default SaveFileCSV;
