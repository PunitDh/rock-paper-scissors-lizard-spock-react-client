import { MenuItem, Select } from "@mui/material";
import React from "react";
import { numberFormats } from "./constants";
import { formattingSelectStyle } from "./styles";
import { FlexBox } from "src/components/shared/styles";

const NumberFormattingSelect = ({ state, onChange }) => {
  return (
    <Select
      labelId={"number-format-selector"}
      id={"number-format-selector"}
      name="numberFormatSelector"
      // onChange={handleBorderStyleChange}
      // value={selectedFormatting.border}
      value={numberFormats[0].id}
      size="small"
      sx={formattingSelectStyle()}
    >
      {numberFormats.map((format) => (
        <MenuItem
          // selected={selectedFormatting.border === border}
          key={format.id}
          value={format.id}
        >
          <FlexBox gap="0.5rem">
            <format.Icon style={{ width: "1rem" }} /> {format.id}
          </FlexBox>
        </MenuItem>
      ))}
    </Select>
  );
};

export default NumberFormattingSelect;
