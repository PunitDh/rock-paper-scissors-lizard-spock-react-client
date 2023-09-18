import React, { Dispatch } from "react";
import { Box, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import {
  openContextMenu,
  addMemento,
  insertRow,
  insertColumn,
} from "../../actions";
import {
  ArrowBack,
  ArrowDownward,
  ArrowForward,
  ArrowUpward,
  PlusOne,
} from "@mui/icons-material";
import {
  Action,
  InsertColumnLocation,
  InsertRowLocation,
  State,
} from "../../types";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
  menuRef: HTMLElement | null;
  open: boolean;
  onClose: () => void;
};

const InsertMenu = ({
  state,
  dispatch,
  menuRef,
  open,
  onClose,
}: Props): JSX.Element => {
  const handleInsertRow = (location: InsertRowLocation) => () => {
    dispatch(insertRow(location));
    dispatch(addMemento());
    onClose();
    dispatch(openContextMenu(null));
  };

  const handleInsertColumn = (location: InsertColumnLocation) => () => {
    dispatch(insertColumn(location));
    dispatch(addMemento());
    onClose();
    dispatch(openContextMenu(null));
  };

  return (
    <Box>
      <Menu
        id="context-insert-menu"
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
        <MenuItem onClick={handleInsertRow("above")}>
          <ListItemIcon sx={{ mr: 0.5 }}>
            <PlusOne width={20} />
            <ArrowUpward sx={{ width: "0.8rem" }} />
          </ListItemIcon>
          <ListItemText>Insert Row Above</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleInsertRow("below")}>
          <ListItemIcon sx={{ mr: 0.5 }}>
            <PlusOne width={20} />
            <ArrowDownward sx={{ width: "0.8rem" }} />
          </ListItemIcon>
          <ListItemText>Insert Row Below</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleInsertColumn("left")}>
          <ListItemIcon sx={{ mr: 0.5 }}>
            <PlusOne width={20} />
            <ArrowBack sx={{ width: "0.8rem" }} />
          </ListItemIcon>
          <ListItemText>Insert Column Left</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleInsertColumn("right")}>
          <ListItemIcon sx={{ mr: 0.5 }}>
            <PlusOne width={20} />
            <ArrowForward sx={{ width: "0.8rem" }} />
          </ListItemIcon>
          <ListItemText>Insert Column Right</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default InsertMenu;
