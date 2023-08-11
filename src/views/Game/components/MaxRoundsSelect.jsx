import { MenuItem, Select } from "@mui/material";

const MaxRoundsSelect = ({ value, onChange }) => (
  <Select
    labelId="max-rounds"
    id="max-rounds"
    value={value}
    size="small"
    onChange={(e) => onChange(e.target.value)}
  >
    <MenuItem value={3}>3</MenuItem>
    <MenuItem value={8}>8</MenuItem>
    <MenuItem value={10}>10</MenuItem>
  </Select>
);

export default MaxRoundsSelect;
