import { useState } from "react";
import LimitSelect from "../../../../../components/shared/LimitSelect";
import { Tooltip } from "@mui/material";

import RestartAltIcon from "@mui/icons-material/RestartAlt";
import styled from "@emotion/styled";
import { Chat } from "@mui/icons-material";
import { useAPI } from "../../../../../hooks";
import FlexBox from "../../../../../components/shared/FlexBox";
import ConfirmationDialog from "../../../../../components/shared/ConfirmationDialog";
import { PlayerType } from "../../../types";

type Props = {
  onMaxRoundsChange: (value: number) => void;
  maxRounds: number;
  gameId: string;
  opponent: PlayerType;
};

const RestartGameIcon = styled(RestartAltIcon)(({ theme }) => ({
  cursor: "pointer",
  color: theme.palette.primary.main,
}));

const ChatIcon = styled(Chat)(({ theme }) => ({
  cursor: "pointer",
  color: theme.palette.primary.main,
}));

const GameActions = ({
  onMaxRoundsChange,
  maxRounds,
  gameId,
  opponent,
}: Props) => {
  const [confirmReset, setConfirmReset] = useState(false);
  const api = useAPI();
  const limits = [3, 5, 8];

  const handleStartChat = () => api.startChat({ player: opponent.id });
  const handleResetRounds = () => api.resetGameRounds({ gameId });

  return (
    <FlexBox gap="1rem">
      <ConfirmationDialog
        keepMounted
        onConfirm={handleResetRounds}
        onCancel={() => setConfirmReset(false)}
        open={confirmReset}
        title="Reset all rounds"
        content="Are you sure you want to reset all rounds?"
        confirmBtnText="Reset"
      />
      <Tooltip title={`Chat with ${opponent.firstName}`}>
        <ChatIcon onClick={handleStartChat} />
      </Tooltip>
      <Tooltip title="Reset rounds in this game">
        <RestartGameIcon onClick={() => setConfirmReset(true)} />
      </Tooltip>
      <LimitSelect
        onChange={(e) => onMaxRoundsChange(Number(e.target.value))}
        value={maxRounds}
        limits={limits}
      />
    </FlexBox>
  );
};

export default GameActions;
