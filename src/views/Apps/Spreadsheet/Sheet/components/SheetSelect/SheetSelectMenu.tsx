import { Dispatch, useState } from "react";
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
import { Action, Sheet, SheetId, State } from "../../types";
import { Credentials } from "./types";
import { useNotification } from "../../../../../../hooks";
import { exportSheetAsCSV } from "../../utils/sheetUtils";
import ConfirmDeleteSheet from "./Dialog/ConfirmDeleteSheet";
import ConfirmProtectSheet from "./Dialog/ConfirmProtectSheet";
import { IconCsv } from "@tabler/icons-react";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
  anchor: HTMLElement | null;
  onClose: () => void;
  onRename: (sheetId: string) => void;
  promptPassword: (sheetId: SheetId, onSuccess: () => void) => void;
};

const SheetSelectMenu = ({
  state,
  dispatch,
  anchor,
  onClose,
  onRename,
  promptPassword,
}: Props): JSX.Element => {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<boolean>(false);
  const [protectConfirmOpen, setProtectConfirmOpen] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<Credentials>({
    password: "",
    confirmPassword: "",
  });
  const notification = useNotification();
  const sheet: Sheet | null = anchor?.id ? state.sheets[anchor.id] : null;

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
      notification.success(`'${sheet?.name}' locked`);
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

  const handleCSVExport = () => {
    if (sheet) {
      const handleExport = () =>
        exportSheetAsCSV(sheet, state.maxRows, state.maxColumns, sheet.name);
      if (sheet.protected) {
        promptPassword(sheet.id, handleExport);
      } else {
        handleExport();
      }
    }
    onClose();
  };

  return (
    <Box>
      {anchor?.id && (
        <>
          <ConfirmDeleteSheet
            sheetName={sheet?.name}
            open={deleteConfirmOpen}
            onCancel={handleCloseDelete}
            onConfirm={handleDelete}
          />
          <ConfirmProtectSheet
            value={protectConfirmOpen}
            onConfirm={handleProtectSheet}
            onCancel={handleCloseProtect}
            credentials={credentials}
            setCredentials={setCredentials}
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
        <MenuItem onClick={handleCSVExport}>
          <ListItemIcon>
            <IconCsv width={20} />
          </ListItemIcon>
          <ListItemText>Export As CSV</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleRename}>
          <ListItemIcon>
            <TextFields width={20} />
          </ListItemIcon>
          <ListItemText>Rename</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={confirmDelete}
          disabled={Object.keys(state.sheets).length <= 1}
        >
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
