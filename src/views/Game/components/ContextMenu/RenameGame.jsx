import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useRef } from "react";
import { useGame } from "src/hooks";

export default function RenameGame({ handleClose, open, gameId }) {
  const game = useGame();
  const gameName = useRef();
  const handleRename = (e) => {
    e.preventDefault();
    if (gameName.current) {
      game.rename({ gameId: gameId, name: gameName.current.value });
      handleClose();
    } else {
      console.error("Failed to set game name");
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Rename Game</DialogTitle>
        <form onSubmit={handleRename}>
          <DialogContent>
            <DialogContentText>
              Rename your game with {"{name}"}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Enter game name"
              type="text"
              fullWidth
              variant="standard"
              ref={gameName}
            />
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="button" onAnimationEnd={handleRename}>
              Rename
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
