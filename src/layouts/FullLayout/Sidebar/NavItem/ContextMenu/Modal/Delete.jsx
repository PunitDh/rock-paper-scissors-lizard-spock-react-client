import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Bold } from "src/components/shared/styles";
import { useAPI, useToken } from "src/hooks";
import { showConfirmDelete } from "../../actions";

export default function DeleteConfirmation({ state, dispatch, selectedGame }) {
  const api = useAPI();
  const token = useToken();

  const handleClose = () => dispatch(showConfirmDelete(false));

  const handleDelete = (e) => {
    e.preventDefault();
    api.deleteGame({ gameId: selectedGame.id });
    handleClose();
  };

  const otherPlayer = selectedGame.players.find(
    (player) => player.id !== token.decoded.id
  );

  return (
    <div>
      <Dialog open={state.confirmDelete} onClose={handleClose}>
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
