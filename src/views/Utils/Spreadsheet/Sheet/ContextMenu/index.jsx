import { Box, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { IconCopy, IconCut } from "@tabler/icons";
import {
  deleteCellContent,
  pasteCellContent,
  setMenuAnchorElement,
} from "../actions";
import { ContentPaste, Delete } from "@mui/icons-material";
import { useClipboard } from "src/hooks";
import { generateClipboardContent } from "../utils/cellUtils";

const ContextMenu = ({ state, dispatch }) => {
  const clipboard = useClipboard();

  const handleClose = () => {
    dispatch(setMenuAnchorElement(false));
  };

  const handleCut = async () => {
    const content = generateClipboardContent(state);
    await clipboard.copy(content);
    dispatch(deleteCellContent());
    handleClose();
  };

  const handleCopy = async () => {
    const content = generateClipboardContent(state);
    await clipboard.copy(content);
    handleClose();
  };

  const handlePaste = async () => {
    const data = await clipboard.get();
    dispatch(pasteCellContent(state.menuAnchorElement, data));
    handleClose();
  };

  const handleDelete = () => {
    dispatch(deleteCellContent());
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
