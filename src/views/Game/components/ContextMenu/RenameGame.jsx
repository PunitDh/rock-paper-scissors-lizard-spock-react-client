import * as React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function RenameGame({ handleClose, open }) {
  const handleRename = (e) => {
    e.preventDefault();
    handleClose();
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
            />
          </DialogContent>
          <DialogActions>
            <Button type="button" onAnimationEnd={handleClose}>
              Cancel
            </Button>
            <Button type="submit" onAnimationEnd={handleRename}>
              Rename
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
