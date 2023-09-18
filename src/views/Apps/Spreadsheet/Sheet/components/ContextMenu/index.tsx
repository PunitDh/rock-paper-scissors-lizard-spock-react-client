import React, { Dispatch, useRef, useState } from "react";
import { Box, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { IconCopy, IconCut, IconPlus } from "@tabler/icons-react";
import {
  deleteCellContent,
  pasteCellContent,
  openContextMenu,
  addMemento,
} from "../../actions";
import { ArrowRight, ContentPaste, Delete } from "@mui/icons-material";
import { generateClipboardContent } from "../../utils/cellUtils";
import useEventHandler from "../../hooks/useEventHandler";
import { Action, State } from "../../types";
import InsertMenu from "./InsertMenu";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
};

const ContextMenu = ({ state, dispatch }: Props): JSX.Element => {
  const eventHandler = useEventHandler();
  const [insertMenuOpen, setInsertMenuOpen] = useState(false);
  const insertMenuRef = useRef(null);

  const closeMenu = () => {
    dispatch(openContextMenu(null));
  };

  const toggleInsertMenu = () => {
    setInsertMenuOpen((toggle) => !toggle);
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
        {insertMenuOpen && (
          <InsertMenu
            state={state}
            dispatch={dispatch}
            open={insertMenuOpen}
            menuRef={insertMenuRef.current}
            onClose={() => setInsertMenuOpen(false)}
          />
        )}
        <MenuItem ref={insertMenuRef} onClick={() => setInsertMenuOpen(true)}>
          <ListItemIcon>
            <IconPlus width={20} />
          </ListItemIcon>
          <ListItemText>
            <>Insert</>
          </ListItemText>
          <ArrowRight width={20} />
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
