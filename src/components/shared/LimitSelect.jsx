import { MenuItem, Select } from "@mui/material";

const LimitSelect = ({ sx = {}, value, onChange, limits }) => (
  <Select
    labelId="log-limit"
    id="log-limit"
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

export default LimitSelect;
