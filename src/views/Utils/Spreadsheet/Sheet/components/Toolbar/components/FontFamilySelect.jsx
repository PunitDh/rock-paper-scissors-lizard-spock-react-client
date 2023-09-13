import { MenuItem, Select } from "@mui/material";
import { useCallback, useState } from "react";
import { formattingSelectStyle } from "../styles";
import { getFonts } from "../../../utils/fontUtils";

const FontFamilySelect = ({ state, onChange }) => {
  const [fonts, setFonts] = useState(["Sans-serif"]);

  const fontsFn = useCallback(() => {
    getFonts().then((data) =>
      setFonts((fonts) => [...new Set(fonts.concat(data).sort())])
    );
  }, []);

  return (
    <Select
      ref={fontsFn}
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
