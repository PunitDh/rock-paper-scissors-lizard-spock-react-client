import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { showConfirmDelete } from "../../actions";
import { useAPI, useToken } from "../../../../../../hooks";
import { Bold } from "../../../../../../components/shared/styles";
import { Action, NavItemType, State } from "../../../types";
import { Dispatch } from "react";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
  selectedGame: NavItemType;
};

export default function DeleteConfirmation({
  state,
  dispatch,
  selectedGame,
}: Props) {
  const api = useAPI();
  const token = useToken();

  const handleClose = () => dispatch(showConfirmDelete(false));

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    api.deleteGame({ gameId: selectedGame.id });
    handleClose();
  };

  const otherPlayer = selectedGame.players?.find(
    (player) => player.id !== token.decoded?.id
  );

  return (
    otherPlayer && (
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
    )
  );
}
