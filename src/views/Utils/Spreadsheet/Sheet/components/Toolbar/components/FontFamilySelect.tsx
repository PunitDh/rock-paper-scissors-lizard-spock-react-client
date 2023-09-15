import React from "react";
import { MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { formattingSelectStyle } from "../styles";
import { getFonts } from "../../../utils/fontUtils";
import CellFormatting from "../../../models/CellFormatting";

type Props = {
  state: CellFormatting;
  onChange: (text: string) => void
}

const FontFamilySelect = ({ state, onChange }: Props) => {
  const [fonts, setFonts] = useState<string[]>(["Sans-serif"]);

  useEffect(() => {
    console.log("Get fonts hook triggered");
    getFonts().then((data) =>
      setFonts((fonts) => [...new Set(fonts.concat(data).sort())])
    );
  }, []);

  return (
    <Select
      labelId={"font-selector"}
      id={"font-selector"}
      name="fontSelector"
      onChange={(e) => onChange(e.target.value)}
      value={state.fontFamily || "Sans-serif"}
      size="small"
      sx={formattingSelectStyle({
        fontFamily: state.fontFamily!,
      })}
    >
      {fonts.map((fontFamily) => (
        <MenuItem
          sx={{ fontFamily }}
          selected={state.fontFamily === fontFamily}
          key={fontFamily}
          value={fontFamily}
        >
          {fontFamily}
        </MenuItem>
      ))}
    </Select>
  );
};

export default FontFamilySelect;
