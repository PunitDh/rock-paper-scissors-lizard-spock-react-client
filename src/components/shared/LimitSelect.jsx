import { MenuItem, Select } from "@mui/material";
import { uniqueId } from "lodash";

const LimitSelect = ({ sx = {}, value, onChange, limits }) => {
  const id = uniqueId();
  return (
    <Select
      labelId={"limit-selector-" + id}
      id={"limit-selector-" + id}
      value={value}
      name="limit"
      size="small"
      onChange={onChange}
      sx={sx}
    >
      {limits.map((limit) => (
        <MenuItem key={limit} value={limit}>
          {limit}
        </MenuItem>
      ))}
    </Select>
  );
};

export default LimitSelect;
