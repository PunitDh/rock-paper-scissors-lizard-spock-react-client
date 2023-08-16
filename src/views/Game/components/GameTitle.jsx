import { TextField, Tooltip } from "@mui/material";
import { withStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import IconSelectField from "src/components/shared/IconSelectField";
import { FlexBox } from "src/components/shared/styles";
import { getIcon } from "src/data";
import { useGame } from "src/hooks";

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
  const game = useGame();
  const [gameName, setGameName] = useState(game.currentGame.name);
  const icon = getIcon(game.currentGame.icon);

  const handleChange = (e) => {
    e.preventDefault();
    setGameName(e.target.value);
  };

  const handleRename = (e) => {
    e.preventDefault();
    game.rename({ gameId: game.currentGame.id, name: gameName });
  };

  useEffect(() => {
    setGameName(game.currentGame.name);
  }, [game.currentGame?.id]);

  return (
    <FlexBox gap="0" alignItems="stretch" justifyContent="flex-start">
      <IconSelectField selected={icon.id} gameId={game.currentGame.id} />
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
