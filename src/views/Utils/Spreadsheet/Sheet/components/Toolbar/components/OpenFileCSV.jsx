import { Tooltip } from "@mui/material";
import { FieldButton } from "../../styles";
import { FolderOpenSharp } from "@mui/icons-material";
import CellData from "../../../models/CellData";
import { setContentBulk } from "../../../actions";
import { useRef } from "react";
import { parseCSV } from "../../../utils/cellUtils";
import StateContent from "../../../models/StateContent";
import { useNotification } from "../../../../../../../hooks";

const OpenFileCSV = ({ dispatch }) => {
  const fileRef = useRef();
  const notification = useNotification();

  const handleOpenFile = (e) => {
    const file = e.target.files[0];
    const errorMessage = `Selected file '${file.name}' is not a valid CSV file or is unable to be parsed correctly`;
    const errorDuration = 10000;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const parsed = parseCSV(text);

      if (parsed.error) {
        return notification.error(errorMessage, errorDuration);
      }

      const data = Object.keys(parsed).reduce((acc, cell) => {
        if (parsed[cell]?.value?.length > 0) {
          acc[cell] = new CellData({
            id: cell,
            value: parsed[cell].value,
          }).setDisplay();
        }
        return acc;
      }, {});

      const content = new StateContent({}, {}, data);

      dispatch(setContentBulk(content));
    };
    if (file.type === "text/csv") {
      reader.readAsText(e.target.files[0]);
    } else {
      notification.error(errorMessage, errorDuration);
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

export default OpenFileCSV;
