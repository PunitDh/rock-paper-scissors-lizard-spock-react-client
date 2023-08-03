import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "src/components/shared/ConfirmationDialog";
import { useGame, useToken } from "src/hooks";

const GameButton = styled(Button)({
  backgroundColor: "primary.main",
  color: "#fff",
});

export default function StartGameButton({ user }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [value, setValue] = useState();
  const navigate = useNavigate();
  const game = useGame();
  const token = useToken();

  const handleStartGame = (playerId) => {
    const payload = {
      players: [token.decoded.id, playerId],
    };
    game.create(payload);
  };

  useEffect(() => {
    if (game.created) {
      navigate(`/games/${game.id}`);
    }
  }, [game.created]);

  const handleClose = (newValue) => {
    setConfirmOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <>
      <GameButton
        variant="contained"
        size="medium"
        disableElevation
        title={`Start game with ${user.firstName}`}
        onClick={() => setConfirmOpen(true)}
      >
        Start Game
      </GameButton>
      <ConfirmationDialog
        id="new-game-confirmation-dialog"
        keepMounted
        open={confirmOpen}
        onCancel={handleClose}
        onConfirm={() => handleStartGame(user.id)}
        value={value}
        title="New Game"
        confirmBtnText="Start Game"
        content={`Start new game with ${user.firstName}?`}
      />
    </>
  );
}
