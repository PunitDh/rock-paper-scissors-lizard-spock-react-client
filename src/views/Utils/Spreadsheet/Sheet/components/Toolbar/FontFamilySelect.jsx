import { MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { formattingSelectStyle } from "./styles";
import { getFonts } from "../../utils/fontUtils";

const FontFamilySelect = ({ state, onChange }) => {
  const [fonts, setFonts] = useState(["Sans-serif"]);

  useEffect(() => {
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
        fontFamily: state.fontFamily,
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
