import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Bold } from "src/components/shared/styles";
import { useGame, useToken } from "src/hooks";

export default function DeleteConfirmation({
  handleClose,
  open,
  selectedGame,
}) {
  const game = useGame();
  const token = useToken();

  const handleDelete = (e) => {
    e.preventDefault();
    game.delete({ gameId: selectedGame.id });
    handleClose();
  };

  const otherPlayer = selectedGame.players.find(
    (player) => player.id !== token.decoded.id
  );

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Game</DialogTitle>
        <form onSubmit={handleDelete}>
          <DialogContent>
            <DialogContentText>
              Delete game <Bold>{selectedGame.title}</Bold> with{" "}
              <Bold>{otherPlayer.firstName}</Bold>?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Delete</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
