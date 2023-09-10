import { Tooltip } from "@mui/material";
import { FieldButton } from "../styles";
import { FolderOpenSharp } from "@mui/icons-material";
import CellData from "../../models/CellData";
import { setContentBulk } from "../../actions";
import { useRef } from "react";
import { parseJSON } from "../../utils/cellUtils";
import { useNotification } from "src/hooks";

const OpenFileJSON = ({ dispatch }) => {
  const notification = useNotification();

  const fileRef = useRef();

  const handleOpenFile = (e) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const parsedContent = parseJSON(text);

      if (parsedContent.error) {
        return notification.error(parsedContent.message);
      }

      console.log({parsedContent});

      dispatch(setContentBulk(parsedContent));
    };
    reader.readAsText(e.target.files[0]);
  };

  return (
    <Tooltip title="Open a JSON File">
      <FieldButton type="button">
        <label style={{ cursor: "pointer" }} htmlFor="json-file-upload">
          <FolderOpenSharp sx={{ width: "1rem" }} />
        </label>
        <input
          type="file"
          id="json-file-upload"
          style={{ display: "none" }}
          ref={fileRef}
          onChange={handleOpenFile}
        />
      </FieldButton>
    </Tooltip>
  );
};

export default OpenFileJSON;
