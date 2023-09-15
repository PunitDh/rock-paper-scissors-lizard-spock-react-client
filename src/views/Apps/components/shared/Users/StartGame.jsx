import { useState } from "react";
import { CircularProgress, Tooltip } from "@mui/material";
import styled from "@emotion/styled";
import { sample } from "lodash";
import { PlayCircleFilled } from "@mui/icons-material";
import { useAPI, useLoading } from "../../../../../hooks";
import { icons } from "../../../../../assets";
import ConfirmationDialog from "../../../../../components/shared/ConfirmationDialog";

const GameButton = styled(PlayCircleFilled)(({ theme }) => ({
  backgroundColor: "primary.main",
  color: theme.palette.primary.main,
  cursor: "pointer",
  width: "1.5rem",
  height: "1.5rem",
}));

export default function StartGame({ user }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [value, setValue] = useState();
  const api = useAPI();
  const [createGame, loading] = useLoading(api.createGame);

  const handleStartGame = (opponent) => {
    const payload = {
      game: "rpsls",
      opponent,
      icon: sample(icons.map((it) => it.id)),
    };
    createGame(payload);
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
        {loading ? (
          <CircularProgress size="1.25rem" />
        ) : (
          <GameButton onClick={() => setConfirmOpen(true)} />
        )}
      </Tooltip>
      <ConfirmationDialog
        id="new-game-confirmation-dialog"
        keepMounted
        open={confirmOpen}
        onCancel={handleClose}
        onConfirm={() => handleStartGame(user.id)}
        value={value}
        title="Play"
        confirmBtnText="Play Game"
        content={`Play with ${user.firstName}?`}
      />
    </>
  );
}
