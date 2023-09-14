import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import IconSelectField from "src/components/shared/IconSelectField";
import { FlexBox } from "src/components/shared/styles";
import { getIcon } from "src/assets";
import { useAPI, useCurrentGame } from "src/hooks";
import { InvisibleTextField } from "src/components/shared/InvisibleTextField";

const GameTitle = () => {
  const currentGame = useCurrentGame();
  const [gameName, setGameName] = useState(currentGame.name);
  const icon = getIcon(currentGame.icon);
  const api = useAPI();

  const handleChange = (e) => {
    e.preventDefault();
    setGameName(e.target.value);
  };

  const handleRename = (e) => {
    e.preventDefault();
    api.renameGame({ gameId: currentGame.id, name: gameName });
  };

  useEffect(() => {
    setGameName(currentGame.name);
  }, [currentGame.id, currentGame.name]);

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
