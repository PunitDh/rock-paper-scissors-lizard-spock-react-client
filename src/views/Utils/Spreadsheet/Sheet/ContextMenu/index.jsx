import { Box, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { IconCopy, IconCut } from "@tabler/icons";
import { setMenuAnchorElement } from "../actions";
import { ContentPaste, Delete } from "@mui/icons-material";

const ContextMenu = ({ state, dispatch }) => {
  return (
    <Box>
      <Menu
        id="context-menu"
        keepMounted
        open={Boolean(state.menuAnchorElement)}
        onClose={() => dispatch(setMenuAnchorElement(false))}
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
        <MenuItem onClick={() => {}}>
          <ListItemIcon>
            <IconCut width={20} />
          </ListItemIcon>
          <ListItemText>Cut</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {}}>
          <ListItemIcon>
            <IconCopy width={20} />
          </ListItemIcon>
          <ListItemText>Copy</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {}}>
          <ListItemIcon>
            <ContentPaste width={20} />
          </ListItemIcon>
          <ListItemText>Paste</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {}}>
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
