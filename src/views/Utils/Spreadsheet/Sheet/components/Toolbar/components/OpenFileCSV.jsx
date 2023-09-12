import { Tooltip } from "@mui/material";
import { FieldButton } from "../../styles";
import { FolderOpenSharp } from "@mui/icons-material";
import CellData from "../../../models/CellData";
import { setContentBulk } from "../../../actions";
import { useRef } from "react";
import { parseCSV } from "../../../utils/cellUtils";

const OpenFileCSV = ({ dispatch }) => {
  const fileRef = useRef();

  const handleOpenFile = (e) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const parsed = parseCSV(text);

      const data = Object.keys(parsed).reduce((acc, cell) => {
        if (parsed[cell]?.value?.length > 0) {
          acc[cell] = new CellData({
            id: cell,
            value: parsed[cell].value,
          }).setDisplay();
        }
        return acc;
      }, {});

      const content = {
        rowHeights: {},
        columnWidths: {},
        data,
      };

      dispatch(setContentBulk(content));
    };
    reader.readAsText(e.target.files[0]);
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

export default OpenFileCSV;
