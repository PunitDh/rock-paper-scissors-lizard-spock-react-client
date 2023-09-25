import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { uniqueId } from "lodash";

type Props = {
  limits: number[];
  value: any;
  onChange: (e: SelectChangeEvent) => void;
  label?: String;
  sx?: { [key: string]: any };
};

const LimitSelect = ({ sx = {}, label, value, onChange, limits }: Props) => {
  const id = uniqueId("select-");
  return (
    <Select
      labelId={"limit-selector-" + id}
      id={"limit-selector-" + id}
      value={value}
      name="limit"
      size="small"
      label={label}
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
