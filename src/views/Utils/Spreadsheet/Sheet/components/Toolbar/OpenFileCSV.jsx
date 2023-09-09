import { Tooltip } from "@mui/material";
import { FieldButton } from "../styles";
import { FolderOpenSharp } from "@mui/icons-material";
import CellData from "../../models/CellData";
import { setContentBulk } from "../../actions";
import { useRef } from "react";
import { parseCSV } from "../../utils/cellUtils";

const OpenFileCSV = ({ dispatch }) => {
  const fileRef = useRef();

  const handleOpenFile = (e) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const content = parseCSV(text);
      const filtered = Object.keys(content).reduce((acc, cur) => {
        if (content[cur]?.value.length > 0) {
          acc[cur] = new CellData({
            id: cur,
            value: content[cur].value,
          });
        }
        return acc;
      }, {});
      dispatch(setContentBulk(filtered));
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
