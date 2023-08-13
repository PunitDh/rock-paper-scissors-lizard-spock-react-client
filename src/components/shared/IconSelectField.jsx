import { MenuItem, Select, Tooltip } from "@mui/material";
import { icons } from "src/data";
import { useGame } from "src/hooks";

const selectStyles = {
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(0,0,0,0.23)",
    borderWidth: "thin",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(0,0,0,0.58)",
    borderWidth: "thin",
  },
};

const IconSelectField = ({ selected = 1, gameId }) => {
  const game = useGame();
  const handleChange = (e) => game.changeIcon({ gameId, icon: e.target.value });

  return (
    <Tooltip title="Change game icon" disableInteractive>
      <Select
        labelId="icon-select"
        id="icon-select"
        value={selected}
        label="Icon"
        onChange={handleChange}
        size="small"
        sx={selectStyles}
      >
        {icons.map((icon) => (
          <MenuItem
            key={icon.id}
            value={icon.id}
            selected={selected === icon.id}
          >
            <icon.icon />
          </MenuItem>
        ))}
      </Select>
    </Tooltip>
  );
};

export default IconSelectField;