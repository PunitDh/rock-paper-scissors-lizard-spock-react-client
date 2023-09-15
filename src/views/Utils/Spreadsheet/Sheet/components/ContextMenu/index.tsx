import React, { Dispatch } from "react";
import { Box, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { IconCopy, IconCut } from "@tabler/icons-react";
import {
  deleteCellContent,
  pasteCellContent,
  openContextMenu,
  addMemento,
} from "../../actions";
import { ContentPaste, Delete } from "@mui/icons-material";
import { generateClipboardContent } from "../../utils/cellUtils";
import useEventHandler from "../../hooks/useEventHandler";
import { Action, State } from "../../types";

type Props = {
  state: State;
  dispatch: Dispatch<Action>
}

const ContextMenu = ({ state, dispatch }: Props): JSX.Element => {
  const eventHandler = useEventHandler();

  const handleClose = () => {
    dispatch(openContextMenu(null));
  };

  const handleCut = async () => {
    const content = generateClipboardContent(state);
    await eventHandler.clipboard.copy(content);
    dispatch(deleteCellContent());
    dispatch(addMemento());
    handleClose();
  };

  const handleCopy = async () => {
    const content = generateClipboardContent(state);
    await eventHandler.clipboard.copy(content);
    handleClose();
  };

  const handlePaste = async () => {
    const data = await eventHandler.clipboard.get();
    // console.log(data);
    dispatch(pasteCellContent(state.menuAnchorElement?.id, data));
    handleClose();
  };

  const handleDelete = () => {
    dispatch(deleteCellContent());
    dispatch(addMemento());
    handleClose();
  };

  return (
    <Box>
      <Menu
        id="context-menu"
        keepMounted
        open={Boolean(state.menuAnchorElement)}
        onClose={handleClose}
        anchorEl={state.menuAnchorElement}
        MenuListProps={{ "aria-labelledby": state.selectedCell.id }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
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
        <MenuItem onClick={handleCut}>
          <ListItemIcon>
            <IconCut width={20} />
          </ListItemIcon>
          <ListItemText>Cut</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleCopy}>
          <ListItemIcon>
            <IconCopy width={20} />
          </ListItemIcon>
          <ListItemText>Copy</ListItemText>
        </MenuItem>
        <MenuItem onClick={handlePaste}>
          <ListItemIcon>
            <ContentPaste width={20} />
          </ListItemIcon>
          <ListItemText>Paste</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <Delete width={20} />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ContextMenu;
