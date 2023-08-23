import { MenuItem, Select } from "@mui/material";
import React from "react";
import LimitSelect from "src/components/shared/LimitSelect";
import { FlexBox } from "src/components/shared/styles";

const whiteStyle = {
  color: "white",
  backgroundColor: "#555",
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

const LogActions = ({ setLimit, limit, logType, setLogType }) => {
  const limits = [50, 100, 200];
  const logTypes = ["ALL", "INFO", "ERROR", "WARN"];
  return (
    <FlexBox gap="0.5rem">
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
