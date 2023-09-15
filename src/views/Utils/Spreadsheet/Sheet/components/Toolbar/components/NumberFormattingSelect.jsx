import { MenuItem, Select } from "@mui/material";
import { numberFormats } from "../constants";
import { formattingSelectStyle } from "../styles";
import FlexBox from "../../../../../../../components/shared/FlexBox";

const NumberFormattingSelect = ({ state, onChange }) => {
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
