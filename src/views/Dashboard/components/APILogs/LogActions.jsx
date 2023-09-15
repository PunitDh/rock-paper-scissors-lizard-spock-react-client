import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { limits, logTypes, times } from "./constants";
import { setConfirmClear, setFilter } from "./actions";
import FlexBox from "../../../../components/shared/FlexBox";
import ConfirmationDialog from "../../../../components/shared/ConfirmationDialog";
import LimitSelect from "../../../../components/shared/LimitSelect";

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
  const handleFilter = (e) => dispatch(setFilter(e.target));

  return (
    <FlexBox gap="0.5rem">
      <ConfirmationDialog
        id="clear-logs-confirmation-dialog"
        keepMounted
        open={state.confirmClear}
        onCancel={() => dispatch(setConfirmClear(false))}
        onConfirm={onClearLogs}
        title="Clear Logs"
        confirmBtnText="Clear"
        content="Are you sure you want to clear all logs?"
      />
      <Button
        variant="outlined"
        type="button"
        onClick={() => dispatch(setConfirmClear(true))}
      >
        Clear
      </Button>
      <FormControl>
        <InputLabel sx={{ color: "white" }}>Time</InputLabel>
        <Select
          labelId="log-time"
          id="log-time"
          value={state.time}
          size="small"
          name="time"
          label="Time"
          onChange={handleFilter}
          sx={whiteStyle}
        >
          {times.map((time) => (
            <MenuItem key={time.value} value={time.value}>
              {time.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel sx={{ color: "white" }}>Type</InputLabel>
        <Select
          labelId="log-type"
          id="log-type"
          value={state.type}
          size="small"
          name="type"
          label="Type"
          onChange={handleFilter}
          sx={whiteStyle}
        >
          {logTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel sx={{ color: "white" }}>Limit</InputLabel>
        <LimitSelect
          sx={whiteStyle}
          value={state.limit}
          limits={limits}
          label="Limit"
          onChange={handleFilter}
        />
      </FormControl>
    </FlexBox>
  );
};

export default LogActions;
