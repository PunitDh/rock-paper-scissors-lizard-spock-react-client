import { MenuItem, Select, SelectChangeEvent, Tooltip } from "@mui/material";
import { useAPI } from "../../hooks";
import { icons } from "../../assets";

type Props = {
  selected: number;
  gameId: string;
};

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

const IconSelectField = ({ selected = 1, gameId }: Props) => {
  const api = useAPI();
  const handleChange = (e: SelectChangeEvent) =>
    api.changeGameIcon({ gameId, icon: e.target.value });

  return (
    <Tooltip title="Change game icon" disableInteractive>
      <Select
        labelId="icon-select"
        id="icon-select"
        value={String(selected)}
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
