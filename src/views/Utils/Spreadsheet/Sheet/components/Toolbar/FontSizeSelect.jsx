import { MenuItem, Select } from "@mui/material";
import { formattingSelectStyle } from "./styles";
import { fontSizes } from "./constants";

const FontSizeSelect = ({ state, onChange }) => (
  <Select
    labelId={"font-size-selector"}
    id={"font-size-selector"}
    name="fontSizeSelector"
    onChange={(e) => onChange(e.target.value)}
    value={state.fontSize || `12px`}
    size="small"
    sx={formattingSelectStyle({ fontSize: state.fontSize })}
  >
    {fontSizes.map((fontSize) => (
      <MenuItem
        sx={{ fontSize }}
        selected={state.fontSize === fontSize}
        key={fontSize}
        value={fontSize}
      >
        {fontSize}
      </MenuItem>
    ))}
  </Select>
);

export default FontSizeSelect;
