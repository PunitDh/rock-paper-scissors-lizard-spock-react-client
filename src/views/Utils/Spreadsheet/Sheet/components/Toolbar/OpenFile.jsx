import { Tooltip } from "@mui/material";
import { FieldButton } from "../styles";
import { FolderOpenSharp } from "@mui/icons-material";
import { SheetConfig } from "../../constants";
import CellContent from "../../models/CellContent";
import { setContentBulk } from "../../actions";
import { useRef } from "react";

const OpenFile = ({ dispatch }) => {
  const fileRef = useRef();

  const handleOpenFile = (e) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const content = csvToStateContent(text);
      const filtered = Object.keys(content).reduce((acc, cur) => {
        if (content[cur]?.value.length > 0) {
          acc[cur] = new CellContent({
            value: content[cur].value,
          });
        }
        return acc;
      }, {});
      dispatch(setContentBulk(filtered));
    };
    reader.readAsText(e.target.files[0]);

    function csvToStateContent(csvString) {
      const rows = csvString.trim().split("\n");
      let content = {};

      rows.forEach((row, rowIndex) => {
        row.split(",").forEach((cellValue, colIndex) => {
          const colLabel = SheetConfig.COLUMNS[colIndex];
          const cellId = `${colLabel}${rowIndex + 1}`;
          content[cellId] = new CellContent({ value: cellValue, formula: "" });
        });
      });

      return content;
    }
  };

  return (
    <Tooltip title="Open a CSV File">
      <FieldButton type="button">
        <label style={{ cursor: "pointer" }} htmlFor="csv-file-upload">
          <FolderOpenSharp sx={{ width: "1rem" }} />
        </label>
        <input
          type="file"
          id="csv-file-upload"
          style={{ display: "none" }}
          ref={fileRef}
          onChange={handleOpenFile}
        />
      </FieldButton>
    </Tooltip>
  );
};

export default OpenFile;
