import { TextField, Tooltip } from "@mui/material";
import { withStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import IconSelectField from "src/components/shared/IconSelectField";
import { FlexBox } from "src/components/shared/styles";
import { getIcon } from "src/assets";
import { useCurrentGame } from "src/hooks";

const InvisibleTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "rgba(0, 0, 0, 0.23)",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "rgba(0, 0, 0, 0.23)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "rgba(0, 0, 0, 0.58)",
      },
    },
  },
})(TextField);

const GameTitle = () => {
  const currentGame = useCurrentGame();
  const [gameName, setGameName] = useState(currentGame.name);
  const icon = getIcon(currentGame.icon);

  const handleChange = (e) => {
    e.preventDefault();
    setGameName(e.target.value);
  };

  const handleRename = (e) => {
    e.preventDefault();
    currentGame.rename({ gameId: currentGame.id, name: gameName });
  };

  useEffect(() => {
    setGameName(currentGame.name);
  }, [currentGame?.id]);

  return (
    <FlexBox gap="0" alignItems="stretch" justifyContent="flex-start">
      <IconSelectField selected={icon.id} gameId={currentGame.id} />
      <form onSubmit={handleRename}>
        <Tooltip title="Rename game">
          <InvisibleTextField
            value={gameName}
            name="name"
            onChange={handleChange}
            onBlur={handleRename}
            autoComplete="off"
          />
        </Tooltip>
      </form>
    </FlexBox>
  );
};

export default GameTitle;
