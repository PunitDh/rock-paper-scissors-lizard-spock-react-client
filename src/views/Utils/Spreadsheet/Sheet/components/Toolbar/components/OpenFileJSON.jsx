import { Tooltip } from "@mui/material";
import { FieldButton } from "../../styles";
import { DataObject } from "@mui/icons-material";
import { setContentBulk } from "../../../actions";
import { useRef } from "react";
import { parseJSON } from "../../../utils/cellUtils";
import { useNotification } from "../../../../../../../hooks";


const OpenFileJSON = ({ dispatch }) => {
  const notification = useNotification();

  const fileRef = useRef();

  const handleOpenFile = (e) => {
    const file = e.target.files[0];
    const errorMessage = `Selected file '${file.name}' is not a valid JSON file or is unable to be parsed correctly`;
    const errorDuration = 10000;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const parsedContent = parseJSON(text);

      if (parsedContent.error) {
        return notification.error(errorMessage, errorDuration);
      }

      dispatch(setContentBulk(parsedContent));
    };

    if (file.type === "application/json") {
      reader.readAsText(file);
    } else {
      notification.error(errorMessage, errorDuration);
    }
  };

  return (
    <Tooltip title="Open a JSON File">
      <FieldButton type="button">
        <label style={{ cursor: "pointer" }} htmlFor="json-file-upload">
          <DataObject sx={{ width: "1rem" }} />
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
