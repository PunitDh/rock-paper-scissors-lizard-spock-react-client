import React, { useState } from "react";
import MaxRoundsSelect from "./MaxRoundsSelect";
import { Button, Tooltip } from "@mui/material";
import { useGame } from "src/hooks";
import { FlexBox } from "src/components/shared/styles";
import { IconEraser } from "@tabler/icons";
import ConfirmationDialog from "src/components/shared/ConfirmationDialog";

const GameActions = ({ onMaxRoundsChange, maxRounds, gameId }) => {
  const [confirmReset, setConfirmReset] = useState(false);
  const game = useGame();

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
      <Tooltip title="Reset rounds in this game">
        <Button
          variant="contained"
          size="medium"
          disableElevation
          onClick={() => setConfirmReset(true)}
        >
          <IconEraser />
        </Button>
      </Tooltip>
      <MaxRoundsSelect onChange={onMaxRoundsChange} value={maxRounds} />
    </FlexBox>
  );
};

export default GameActions;
