import { TextField, Tooltip } from "@mui/material";
import { withStyles } from "@mui/styles";
import React from "react";
import IconSelectField from "src/components/shared/IconSelectField";
import { FlexBox } from "src/components/shared/styles";
import { icons } from "src/data";
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

const GameTitle = ({ currentGame }) => {
  const icon = icons.find((it) => it.id === currentGame.icon);
  const game = useGame();
  const handleRename = (e) => {
    e.preventDefault();
    game.rename({ gameId: currentGame.id, name: e.target.name.value });
  };

  return (
    <FlexBox gap="0.5rem" alignItems="stretch">
      <IconSelectField selected={icon.id} gameId={currentGame.id} />
      <form onSubmit={handleRename} onBlur={handleRename}>
        <Tooltip title="Rename game">
          <InvisibleTextField defaultValue={currentGame.name} name="name" />
        </Tooltip>
      </form>
    </FlexBox>
  );
};

export default GameTitle;
