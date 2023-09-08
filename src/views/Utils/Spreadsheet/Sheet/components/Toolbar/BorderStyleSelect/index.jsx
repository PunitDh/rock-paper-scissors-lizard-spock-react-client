import { MenuItem, Select } from "@mui/material";
import React from "react";
import { formattingSelectStyle } from "../styles";
import { borderStyles } from "../constants";
import BorderType from "./BorderType";

const BorderStyleSelect = ({ state, onChange }) => (
  <Select
    labelId={"border-style-selector"}
    id={"border-style-selector"}
    name="borderStyleSelector"
    // onChange={handleBorderStyleChange}
    // value={selectedFormatting.border}
    value={borderStyles[0].id}
    size="small"
    sx={formattingSelectStyle()}
  >
    {borderStyles.map((border) => (
      <MenuItem
        // selected={selectedFormatting.border === border}
        key={border.value}
        value={border.id}
      >
        <BorderType {...border.props} title={border.value} />
      </MenuItem>
    ))}
  </Select>
);

export default BorderStyleSelect;
