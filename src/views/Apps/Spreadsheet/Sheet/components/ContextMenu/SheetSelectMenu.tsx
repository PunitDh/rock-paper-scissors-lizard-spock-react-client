import React, { Dispatch } from "react";
import { Box, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import {
  deleteSheet,
} from "../../actions";
import { Delete } from "@mui/icons-material";
import { Action, State } from "../../types";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
  anchor: HTMLElement | null;
  onClose: () => void;
};

const SheetSelectMenu = ({ state, dispatch, anchor, onClose }: Props): JSX.Element => {
  const handleDelete = () => {
    if (anchor) dispatch(deleteSheet(anchor.id));
    onClose();
  };

  return (
    <Box>
      <Menu
        id="sheet-select-context-menu"
        keepMounted
        open={Boolean(anchor)}
        onClose={onClose}
        anchorEl={anchor}
        MenuListProps={{ "aria-labelledby": anchor?.id }}
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

export default SheetSelectMenu;
