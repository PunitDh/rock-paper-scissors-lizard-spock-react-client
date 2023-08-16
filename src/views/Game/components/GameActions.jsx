import React, { useState } from "react";
import MaxRoundsSelect from "./MaxRoundsSelect";
import { Tooltip } from "@mui/material";
import { useConversation, useGame } from "src/hooks";
import { FlexBox } from "src/components/shared/styles";
import ConfirmationDialog from "src/components/shared/ConfirmationDialog";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import styled from "@emotion/styled";
import { Chat } from "@mui/icons-material";

const RestartGameIcon = styled(RestartAltIcon)(({ theme }) => ({
  cursor: "pointer",
  color: theme.palette.primary.main,
}));

const ChatIcon = styled(Chat)(({ theme }) => ({
  cursor: "pointer",
  color: theme.palette.primary.main,
}));

const GameActions = ({ onMaxRoundsChange, maxRounds, gameId, opponent }) => {
  const [confirmReset, setConfirmReset] = useState(false);
  const game = useGame();
  const conversation = useConversation();

  const handleStartChat = () => conversation.start({ player: opponent.id });
  const handleResetRounds = () => game.resetRounds({ gameId });

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
        {/* <Button
          variant="contained"
          size="medium"
          disableElevation
          onClick={() => setConfirmReset(true)}
        > */}

        <RestartGameIcon onClick={() => setConfirmReset(true)} />
        {/* </Button> */}
      </Tooltip>
      <MaxRoundsSelect onChange={onMaxRoundsChange} value={maxRounds} />
    </FlexBox>
  );
};

export default GameActions;
