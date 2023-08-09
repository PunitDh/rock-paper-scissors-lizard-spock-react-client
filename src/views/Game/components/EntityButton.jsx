import styled from "@emotion/styled";
import { Button, Tooltip } from "@mui/material";
import { useGame, useToken } from "src/hooks";

const Entity = styled(Button)(({ btncolor }) => ({
  color: btncolor,
}));

const EntityButton = ({ entity, btncolor, gameId }) => {
  const token = useToken();
  const game = useGame();

  const handleMove = () => {
    const payload = {
      playerId: token.decoded.id,
      move: entity,
      gameId,
    };

    game.playMove(payload);
  };

  return (
    <Tooltip title={`Play ${entity}`}>
      <Entity onClick={handleMove} variant="outlined" btncolor={btncolor}>
        {entity}
      </Entity>
    </Tooltip>
  );
};

export default EntityButton;
