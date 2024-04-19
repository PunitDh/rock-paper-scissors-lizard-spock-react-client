import { useState } from "react";
import { CircularProgress, Theme, Tooltip } from "@mui/material";
import styled from "@emotion/styled";
import { sample } from "lodash";
import { PlayCircleFilled } from "@mui/icons-material";
import { useAPI, useLoading } from "../../../../../hooks";
import { icons } from "../../../../../assets";
import ConfirmationDialog from "../../../../../components/shared/ConfirmationDialog";
import { PlayerType } from "../../../types";

type Props = {
  user: PlayerType;
};

const GameButton = styled(PlayCircleFilled)(({ theme }: { theme: Theme }) => ({
  backgroundColor: "primary.main",
  color: theme.palette.primary.main,
  cursor: "pointer",
  width: "1.5rem",
  height: "1.5rem",
}));

export default function StartGame({ user }: Props): JSX.Element {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [value, setValue] = useState<string>("");
  const api = useAPI();
  const [createGame, loading] = useLoading(api.createGame);

  const handleStartGame = (opponentId: string) => {
    const payload = {
      game: "rpsls",
      opponent: opponentId,
      icon: sample(icons.map((it) => it.id)),
    };
    createGame(payload);
  };

  const handleClose = (newValue: string) => {
    setConfirmOpen(false);
    if (Boolean(newValue)) {
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
