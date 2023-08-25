import { Button, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import ConfirmationDialog from "src/components/shared/ConfirmationDialog";
import LimitSelect from "src/components/shared/LimitSelect";
import { FlexBox } from "src/components/shared/styles";

const whiteStyle = {
  color: "white",
  backgroundColor: "transparent",
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(228, 219, 233, 0.25)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(228, 219, 233, 0.25)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(228, 219, 233, 0.25)",
  },
  ".MuiSvgIcon-root ": {
    fill: "white",
  },
};

const LogActions = ({ setLimit, limit, logType, setLogType, onClearLogs }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const limits = [50, 100, 200];
  const logTypes = ["ALL", "INFO", "ERROR", "WARN"];

  const handleClose = () => setConfirmOpen(false);

  return (
    <FlexBox gap="0.5rem">
      <ConfirmationDialog
        id="clear-logs-confirmation-dialog"
        keepMounted
        open={confirmOpen}
        onCancel={handleClose}
        onConfirm={onClearLogs}
        title="Confirm"
        confirmBtnText="Clear"
        content="Clear all logs?"
      />
      <Button
        variant="outlined"
        type="button"
        onClick={() => setConfirmOpen(true)}
      >
        Clear
      </Button>
      <Select
        labelId="max-rounds"
        id="max-rounds"
        value={logType}
        size="small"
        onChange={(e) => setLogType(e.target.value)}
        sx={whiteStyle}
      >
        {logTypes.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
      <LimitSelect
        sx={whiteStyle}
        onChange={setLimit}
        value={limit}
        limits={limits}
      />
    </FlexBox>
  );
};

export default LogActions;
