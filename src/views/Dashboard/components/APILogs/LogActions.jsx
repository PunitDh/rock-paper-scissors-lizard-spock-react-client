import { Button, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import ConfirmationDialog from "src/components/shared/ConfirmationDialog";
import LimitSelect from "src/components/shared/LimitSelect";
import { FlexBox } from "src/components/shared/styles";
import { limits, logTypes, times } from "./constants";
import { setLimit, setTime, setType } from "./actions";

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

const LogActions = ({ state, dispatch, onClearLogs }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <FlexBox gap="0.5rem">
      <ConfirmationDialog
        id="clear-logs-confirmation-dialog"
        keepMounted
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={onClearLogs}
        title="Clear Logs"
        confirmBtnText="Clear"
        content="Are you sure you want to clear all logs?"
      />
      <Button
        variant="outlined"
        type="button"
        onClick={() => setConfirmOpen(true)}
      >
        Clear
      </Button>
      <Select
        labelId="log-time"
        id="log-time"
        value={state.time}
        size="small"
        name="time"
        onChange={(e) => dispatch(setTime(e.target.value))}
        sx={whiteStyle}
      >
        {times.map((time) => (
          <MenuItem key={time.value} value={time.value}>
            {time.label}
          </MenuItem>
        ))}
      </Select>
      <Select
        labelId="log-type"
        id="log-type"
        value={state.type}
        size="small"
        name="type"
        onChange={(e) => dispatch(setType(e.target.value))}
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
        value={state.limit}
        limits={limits}
        onChange={(e) => dispatch(setLimit(e.target.value))}
      />
    </FlexBox>
  );
};

export default LogActions;
