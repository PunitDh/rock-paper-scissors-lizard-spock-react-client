import React, { Dispatch, useState } from "react";
import {
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { deleteSheet, moveSheet, protectSheet } from "../../actions";
import {
  ArrowBack,
  ArrowForward,
  Delete,
  Lock,
  TextFields,
} from "@mui/icons-material";
import { Action, State } from "../../types";
import ConfirmationDialog from "../../../../../../components/shared/ConfirmationDialog";
import Protect from "./Protect";
import { Credentials } from "./types";
import { useNotification } from "../../../../../../hooks";

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
  const [protectConfirmOpen, setProtectConfirmOpen] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<Credentials>({
    password: "",
    confirmPassword: "",
  });
  const notification = useNotification();

  const handleCloseDelete = () => {
    setDeleteConfirmOpen(false);
  };

  const handleCloseProtect = () => {
    setProtectConfirmOpen(false);
  };

  const handleRename = () => {
    if (anchor) onRename(anchor.id);
    onClose();
  };

  const handleProtectSheet = () => {
    if (anchor) {
      dispatch(protectSheet(anchor.id, credentials.password));
      setCredentials({ password: "", confirmPassword: "" });
      notification.success(`'${state.sheets[anchor.id].name}' locked`);
    }
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
        <>
          <ConfirmationDialog
            id="delete-sheet-confirmation-dialog"
            keepMounted
            open={deleteConfirmOpen}
            onCancel={handleCloseDelete}
            onConfirm={handleDelete}
            value={deleteConfirmOpen}
            title="Delete"
            confirmBtnText="Delete Sheet"
            content={`Are you sure you want to delete '${
              state.sheets[anchor.id].name
            }'?`}
          />
          <ConfirmationDialog
            id="protect-sheet-confirmation-dialog"
            keepMounted
            onConfirm={handleProtectSheet}
            onCancel={handleCloseProtect}
            value={protectConfirmOpen}
            title="Protect"
            confirmBtnText="Set Password"
            confirmdisabled={Number(
              credentials.password.length < 1 ||
                credentials.confirmPassword !== credentials.password
            )}
            content={
              <Protect
                credentials={credentials}
                setCredentials={setCredentials}
                onSubmit={handleProtectSheet}
              />
            }
            open={protectConfirmOpen}
          />
        </>
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
        <Divider />
        <MenuItem onClick={() => setProtectConfirmOpen(true)}>
          <ListItemIcon>
            <Lock width={20} />
          </ListItemIcon>
          <ListItemText>Protect Sheet</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleRename}>
          <ListItemIcon>
            <TextFields width={20} />
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
