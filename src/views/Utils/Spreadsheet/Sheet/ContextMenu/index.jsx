import { Box, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { IconCopy, IconCut } from "@tabler/icons";
import {
  copyCellContent,
  cutCellContent,
  deleteCellContent,
  pasteCellContent,
  setMenuAnchorElement,
} from "../actions";
import { ContentPaste, Delete } from "@mui/icons-material";

const ContextMenu = ({ state, dispatch }) => {
  const handleClose = () => {
    dispatch(setMenuAnchorElement(false));
  };

  const handleCut = () => {
    dispatch(cutCellContent());
    handleClose();
  };

  const handleCopy = () => {
    dispatch(copyCellContent());
    handleClose();
  };

  const handlePaste = () => {
    dispatch(pasteCellContent());
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
        MenuListProps={{ "aria-labelledby": state.selected.cell }}
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
