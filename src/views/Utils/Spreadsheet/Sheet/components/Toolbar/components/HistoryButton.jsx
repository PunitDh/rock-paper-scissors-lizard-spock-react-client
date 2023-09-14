import { Tooltip } from "@mui/material";
import { FieldButton } from "../../styles";

const HistoryButton = ({ title, disabled, onClick, Icon }) => (
  <Tooltip title={`${title} ${disabled ? "(disabled)" : ""}`}>
    <span>
      <FieldButton type="button" onClick={onClick} disabled={disabled}>
        <Icon sx={{ width: "1rem" }} />
      </FieldButton>
    </span>
  </Tooltip>
);

export default HistoryButton;
