import { Dispatch } from "react";
import { Box, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import {
  openContextMenu,
  addMemento,
  deleteColumn,
  deleteRow,
} from "../../actions";
import { Action, State } from "../../types";
import { IconTrash } from "@tabler/icons-react";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
  menuRef: HTMLElement | null;
  open: boolean;
  onClose: () => void;
};

const DeleteMenu = ({
  state,
  dispatch,
  menuRef,
  open,
  onClose,
}: Props): JSX.Element => {
  const handleDeleteRow = () => {
    dispatch(deleteRow());
    dispatch(addMemento());
    onClose();
    dispatch(openContextMenu(null));
  };

  const handleDeleteColumn = () => {
    dispatch(deleteColumn());
    dispatch(addMemento());
    onClose();
    dispatch(openContextMenu(null));
  };

  return (
    <Box>
      <Menu
        id="context-delete-menu"
        keepMounted={false}
        open={open}
        onClose={onClose}
        anchorEl={menuRef}
        MenuListProps={{ "aria-labelledby": state.selectedCell.id }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        <MenuItem onClick={handleDeleteRow}>
          <ListItemIcon sx={{ mr: 0.5 }}>
            <IconTrash width={20} />
          </ListItemIcon>
          <ListItemText>Delete Row</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteColumn}>
          <ListItemIcon sx={{ mr: 0.5 }}>
            <IconTrash width={20} />
          </ListItemIcon>
          <ListItemText>Delete Column</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default DeleteMenu;
