import React from "react";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { numberFormats } from "../constants";
import { formattingSelectStyle } from "../styles";
import FlexBox from "../../../../../../../components/shared/FlexBox";
import CellFormatting from "../../../models/CellFormatting";

type Props = {
  state: CellFormatting;
  onChange: (e: SelectChangeEvent<string>) => void
}

const NumberFormattingSelect = ({ state, onChange }: Props) => {
  return (
    <Select
      labelId={"number-format-selector"}
      id={"number-format-selector"}
      name="numberFormatSelector"
      onChange={onChange}
      value={state.numberFormat || numberFormats[0].id}
      size="small"
      sx={formattingSelectStyle()}
    >
      {numberFormats.map((format) => (
        <MenuItem
          selected={state.numberFormat === format.id}
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
