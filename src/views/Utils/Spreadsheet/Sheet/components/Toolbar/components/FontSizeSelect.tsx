import React from "react";
import { MenuItem, Select } from "@mui/material";
import { formattingSelectStyle } from "../styles";
import { fontSizes } from "../constants";
import CellFormatting from "../../../models/CellFormatting";

type Props = {
  state: CellFormatting;
  onChange: (e: React.ChangeEvent) => void;
}

const FontSizeSelect = ({ state, onChange }: Props) => (
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
