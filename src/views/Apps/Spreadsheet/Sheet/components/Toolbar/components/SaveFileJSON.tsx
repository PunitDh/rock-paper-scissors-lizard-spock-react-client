import React from "react";
import { Tooltip } from "@mui/material";
import { FieldButton } from "../../styles";
import { generateJSONContent } from "../../../utils/cellUtils";
import JSONIcon from "./icons/JSONIcon";
import { State } from "../../../types";

type Props = {
  state: State;
};

const SaveFileJSON = ({ state }: Props) => {
  const activeSheet = state.sheets[state.activeSheet];

  const handleExportAsJSON = () => {
    const content = generateJSONContent(state);
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${activeSheet.name}.json`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  };

  return (
    <Tooltip title="Export as JSON">
      <FieldButton type="button" onClick={handleExportAsJSON}>
        <JSONIcon width="1rem" />
      </FieldButton>
    </Tooltip>
  );
};

export default SaveFileJSON;
