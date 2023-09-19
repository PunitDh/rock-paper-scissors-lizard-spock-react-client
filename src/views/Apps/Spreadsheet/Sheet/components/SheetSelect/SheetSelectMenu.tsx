import React, { Dispatch, useState } from "react";
import { Box, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { deleteSheet, moveSheet } from "../../actions";
import { ArrowBack, ArrowForward, Delete } from "@mui/icons-material";
import { Action, State } from "../../types";
import ConfirmationDialog from "../../../../../../components/shared/ConfirmationDialog";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
  anchor: HTMLElement | null;
  onClose: () => void;
  onRename: (sheetId: string) => void;
};

const SheetSelectMenu = ({
  state,
  dispatch,
  anchor,
  onClose,
  onRename,
}: Props): JSX.Element => {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const handleClose = (newValue: string) => {
    setDeleteConfirmOpen(false);
    if (newValue) {
      setValue(newValue);
    }
  };

  const handleRename = () => {
    if (anchor) onRename(anchor.id);
    onClose();
  };

  const handleMoveSheet = (offset: number) => () => {
    if (anchor) dispatch(moveSheet(anchor.id, offset));
    onClose();
  };

  const handleDelete = () => {
    if (anchor) dispatch(deleteSheet(anchor.id));
    onClose();
  };

  const confirmDelete = () => {
    setDeleteConfirmOpen(true);
  };

  return (
    <Box>
      {anchor?.id && (
        <ConfirmationDialog
          id="delete-sheet-confirmation-dialog"
          keepMounted
          open={deleteConfirmOpen}
          onCancel={handleClose}
          onConfirm={handleDelete}
          value={value}
          title="Delete"
          confirmBtnText="Delete Sheet"
          content={`Are you sure you want to delete '${
            state.sheets[anchor.id].name
          }'?`}
        />
      )}
      <Menu
        id="sheet-select-context-menu"
        keepMounted={true}
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
        <MenuItem onClick={handleMoveSheet(-1)}>
          <ListItemIcon>
            <ArrowBack width={20} />
          </ListItemIcon>
          <ListItemText>Move Left</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleMoveSheet(1)}>
          <ListItemIcon>
            <ArrowForward width={20} />
          </ListItemIcon>
          <ListItemText>Move Right</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleRename}>
          <ListItemIcon>
            <Delete width={20} />
          </ListItemIcon>
          <ListItemText>Rename</ListItemText>
        </MenuItem>
        <MenuItem onClick={confirmDelete}>
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
