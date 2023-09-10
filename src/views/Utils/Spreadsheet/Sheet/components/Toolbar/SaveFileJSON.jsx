import { Tooltip } from "@mui/material";
import { FieldButton } from "../styles";
import { DataObject } from "@mui/icons-material";

const SaveFileJSON = ({ state }) => {
  const handleExportAsJSON = () => {
    const content = JSON.stringify(state.content.data, null, 2);
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Sheet1.json`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  return (
    <Tooltip title="Export as JSON">
      <FieldButton type="button" onClick={handleExportAsJSON}>
        <DataObject sx={{ width: "1rem" }} />
      </FieldButton>
    </Tooltip>
  );
};

export default SaveFileJSON;