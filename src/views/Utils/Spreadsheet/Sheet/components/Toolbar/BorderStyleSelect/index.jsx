import { MenuItem, Select } from "@mui/material";
import React from "react";
import { formattingSelectStyle } from "../styles";
import { BorderType, borderStyles } from "../constants";
import BorderTypeMenuItem from "./BorderTypeMenuItem";

const BorderStyleSelect = ({ state, onChange }) => (
  <Select
    labelId={"border-style-selector"}
    id={"border-style-selector"}
    name="borderStyleSelector"
    onChange={onChange}
    value={state.borderId || BorderType.NO_BORDER}
    size="small"
    sx={formattingSelectStyle()}
  >
    {borderStyles.map((border) => (
      <MenuItem
        // selected={selectedFormatting.border === border}
        key={border.value}
        value={border.id}
      >
        <BorderTypeMenuItem {...border.props} title={border.value} />
      </MenuItem>
    ))}
  </Select>
);

export default BorderStyleSelect;
