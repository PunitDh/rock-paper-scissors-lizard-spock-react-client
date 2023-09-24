import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { showConfirmRename } from "../../actions";
import { useAPI, useToken } from "../../../../../../hooks";
import { Bold } from "../../../../../../components/shared/styles";

export default function RenameGameModal({ state, dispatch, selectedGame }) {
  const api = useAPI();
  const token = useToken();

  const handleClose = () => dispatch(showConfirmRename(false));

  const handleRename = (e) => {
    e.preventDefault();
    api.renameGame({ gameId: selectedGame.id, name: e.target.name.value });
    handleClose();
  };

  const otherPlayer = selectedGame.players.find(
    (player) => player.id !== token.decoded.id,
  );

  return (
    <div>
      <Dialog open={state.confirmRename} onClose={handleClose}>
        <DialogTitle>Rename Game</DialogTitle>
        <form onSubmit={handleRename}>
          <DialogContent>
            <DialogContentText>
              Rename your game with <Bold>{otherPlayer.firstName}</Bold>
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
