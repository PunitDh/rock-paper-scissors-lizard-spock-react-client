import { useState } from "react";
import { Tooltip } from "@mui/material";
import styled from "@emotion/styled";
import ConfirmationDialog from "src/components/shared/ConfirmationDialog";
import { useGame, useToken } from "src/hooks";
import { icons } from "src/assets";
import { sample } from "lodash";
import { PlayCircleFilled } from "@mui/icons-material";

const GameButton = styled(PlayCircleFilled)(({ theme }) => ({
  backgroundColor: "primary.main",
  color: theme.palette.primary.main,
  cursor: "pointer",
}));

export default function StartGame({ user }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [value, setValue] = useState();
  const game = useGame();

  const handleStartGame = (opponent) => {
    const payload = {
      opponent,
      icon: sample(icons.map((it) => it.id)),
    };
    game.create(payload);
  };

  const handleClose = (newValue) => {
    setConfirmOpen(false);
    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <>
      <Tooltip title={`Play with ${user.firstName}`}>
        <GameButton onClick={() => setConfirmOpen(true)} />
      </Tooltip>
      <ConfirmationDialog
        id="new-game-confirmation-dialog"
        keepMounted
        open={confirmOpen}
        onCancel={handleClose}
        onConfirm={() => handleStartGame(user.id)}
        value={value}
        title="Play"
        confirmBtnText="Start Game"
        content={`Play with ${user.firstName}?`}
      />
    </>
  );
}
