import React, { Dispatch } from "react";
import { Box, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { IconCopy, IconCut } from "@tabler/icons-react";
import {
  deleteCellContent,
  pasteCellContent,
  openContextMenu,
  addMemento,
  insertRow,
  insertColumn,
} from "../../actions";
import { ContentPaste, Delete, PlusOne } from "@mui/icons-material";
import { generateClipboardContent } from "../../utils/cellUtils";
import useEventHandler from "../../hooks/useEventHandler";
import {
  Action,
  InsertColumnLocation,
  InsertRowLocation,
  State,
} from "../../types";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
};

const ContextMenu = ({ state, dispatch }: Props): JSX.Element => {
  const eventHandler = useEventHandler();

  const closeMenu = () => {
    dispatch(openContextMenu(null));
  };

  const handleInsertRow = (location: InsertRowLocation) => () => {
    dispatch(insertRow(location));
    closeMenu();
  };

  const handleInsertColumn = (location: InsertColumnLocation) => () => {
    dispatch(insertColumn(location));
    closeMenu();
  };

  const handleCut = async () => {
    const content = generateClipboardContent(state);
    await eventHandler.clipboard.copy(content);
    dispatch(deleteCellContent());
    dispatch(addMemento());
    closeMenu();
  };

  const handleCopy = async () => {
    const content = generateClipboardContent(state);
    await eventHandler.clipboard.copy(content);
    closeMenu();
  };

  const handlePaste = async () => {
    const data = await eventHandler.clipboard.get();
    // console.log(data);
    dispatch(pasteCellContent(state.menuAnchorElement?.id, data));
    closeMenu();
  };

  const handleDelete = () => {
    dispatch(deleteCellContent());
    dispatch(addMemento());
    closeMenu();
  };

  return (
    <Box>
      <Menu
        id="context-menu"
        keepMounted
        open={Boolean(state.menuAnchorElement)}
        onClose={closeMenu}
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
        <MenuItem onClick={handleInsertRow("above")}>
          <ListItemIcon>
            <PlusOne width={20} />
          </ListItemIcon>
          <ListItemText>Insert Row Above</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleInsertRow("below")}>
          <ListItemIcon>
            <PlusOne width={20} />
          </ListItemIcon>
          <ListItemText>Insert Row Below</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleInsertColumn("left")}>
          <ListItemIcon>
            <PlusOne width={20} />
          </ListItemIcon>
          <ListItemText>Insert Column Left</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleInsertColumn("right")}>
          <ListItemIcon>
            <PlusOne width={20} />
          </ListItemIcon>
          <ListItemText>Insert Column Right</ListItemText>
        </MenuItem>
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
