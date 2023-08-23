import { MenuItem, Select } from "@mui/material";

const LimitSelect = ({ sx={}, value, onChange, limits }) => (
  <Select
    labelId="max-rounds"
    id="max-rounds"
    value={value}
    size="small"
    onChange={(e) => onChange(e.target.value)}
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
