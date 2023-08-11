import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useGame, useToken } from "src/hooks";

export default function RenameGameModal({ handleClose, open, selectedGame }) {
  const game = useGame();
  const token = useToken();

  const handleRename = (e) => {
    e.preventDefault();
    game.rename({ gameId: selectedGame.id, name: e.target.name.value });
    handleClose();
  };

  const otherPlayer = selectedGame.players.find(
    (player) => player.id !== token.decoded.id
  );

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Rename Game</DialogTitle>
        <form onSubmit={handleRename}>
          <DialogContent>
            <DialogContentText>
              Rename your game with {otherPlayer.firstName}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Enter game name"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={selectedGame.title}
              autoComplete="off"
            />
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Rename</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
