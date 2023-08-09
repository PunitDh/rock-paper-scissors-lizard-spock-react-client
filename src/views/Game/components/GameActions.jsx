import React, { useState } from "react";
import MaxRoundsSelect from "./MaxRoundsSelect";
import { Button } from "@mui/material";
import { useGame } from "src/hooks";
import { FlexBox } from "src/components/shared/styles";
import { IconEraser } from "@tabler/icons";
import ConfirmationDialog from "src/components/shared/ConfirmationDialog";

const GameActions = ({ onMaxRoundsChange, maxRounds, gameId }) => {
  const game = useGame();

  const handleResetRounds = () => {
    game.resetRounds({ gameId });
  };

  const [confirmReset, setConfirmReset] = useState(false);

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
      <Button
        variant="contained"
        size="medium"
        disableElevation
        title={`Reset rounds in this game`}
        onClick={() => setConfirmReset(true)}
      >
        <IconEraser />
      </Button>
      <MaxRoundsSelect onChange={onMaxRoundsChange} value={maxRounds} />
    </FlexBox>
  );
};

export default GameActions;
