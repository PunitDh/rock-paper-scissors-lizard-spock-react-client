import { Tooltip } from "@mui/material";
import { FieldButton } from "../../styles";
import { DataObject } from "@mui/icons-material";
import { setContentBulk } from "../../../actions";
import { Dispatch, useRef } from "react";
import { parseJSON } from "../../../utils/cellUtils";
import { useNotification } from "../../../../../../../hooks";
import { Action } from "../../../types";

type Props = {
  dispatch: Dispatch<Action>;
};

const OpenFileJSON = ({ dispatch }: Props): JSX.Element => {
  const notification = useNotification();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleOpenFile = (e: React.ChangeEvent) => {
    const file = (e.target as HTMLInputElement).files![0];
    const errorMessage = `Selected file '${file.name}' is not a valid JSON file or is unable to be parsed correctly`;
    const errorDuration = 10000;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target!.result;
      const parsedContent = parseJSON(text as string);

      if (parsedContent.error) {
        return notification.error(errorMessage, errorDuration);
      }

      dispatch(setContentBulk(parsedContent.content!));
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
