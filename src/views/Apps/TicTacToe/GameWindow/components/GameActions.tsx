import { Dispatch, SetStateAction, useState } from "react";
import LimitSelect from "../../../../../components/shared/LimitSelect";
import { Tooltip } from "@mui/material";

import RestartAltIcon from "@mui/icons-material/RestartAlt";
import styled from "@emotion/styled";
import { Chat } from "@mui/icons-material";
import { useAPI } from "../../../../../hooks";
import FlexBox from "../../../../../components/shared/FlexBox";
import ConfirmationDialog from "../../../../../components/shared/ConfirmationDialog";
import { PlayerType } from "../../../types";

const RestartGameIcon = styled(RestartAltIcon)(({ theme }) => ({
  cursor: "pointer",
  color: theme.palette.primary.main,
}));

const ChatIcon = styled(Chat)(({ theme }) => ({
  cursor: "pointer",
  color: theme.palette.primary.main,
}));

type Props = {
  onMaxRoundsChange: Dispatch<SetStateAction<number>>;
  maxRounds: number;
  gameId?: string;
  opponent: PlayerType;
};

const GameActions = ({
  onMaxRoundsChange,
  maxRounds,
  gameId,
  opponent,
}: Props): React.ReactNode => {
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
        value={maxRounds}
        limits={limits}
        onChange={(e) => onMaxRoundsChange(Number(e.target.value))}
      />
    </FlexBox>
  );
};

export default GameActions;
