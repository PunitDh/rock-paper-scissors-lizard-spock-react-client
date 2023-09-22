import React from "react";
import { MenuItem, Select } from "@mui/material";
import { formattingSelectStyle } from "../styles";
import { fontSizes } from "../constants";
import CellFormatting from "../../../models/CellFormatting";

type Props = {
  state: CellFormatting;
  onChange: (text: string) => void;
};

const FontSizeSelect = ({ state, onChange }: Props) => (
  <Select
    labelId={"font-size-selector"}
    id={"font-size-selector"}
    name="fontSizeSelector"
    onChange={(e) => onChange(e.target.value)}
    value={state.styles?.fontSize || `12px`}
    size="small"
    sx={formattingSelectStyle({ fontSize: state.styles?.fontSize! })}
  >
    {fontSizes.map((fontSize) => (
      <MenuItem
        sx={{ fontSize }}
        selected={state.styles?.fontSize === fontSize}
        key={fontSize}
        value={fontSize}
      >
        {fontSize}
      </MenuItem>
    ))}
  </Select>
);

export default FontSizeSelect;
