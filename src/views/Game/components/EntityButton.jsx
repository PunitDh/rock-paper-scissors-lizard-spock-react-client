import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useGame, useToken } from "src/hooks";

const Entity = styled(Button)(({ btncolor }) => ({
  color: btncolor,
}));

const EntityButton = ({ children, btncolor, gameId }) => {
  const token = useToken();
  const game = useGame();

  const handleMove = () => {
    const payload = {
      playerId: token.decoded.id,
      move: children,
      gameId,
    };

    game.playMove(payload);
  };

  return (
    <Entity
      onClick={handleMove}
      variant="outlined"
      btncolor={btncolor}
      title={`Play ${children}`}
    >
      {children}
    </Entity>
  );
};

export default EntityButton;
