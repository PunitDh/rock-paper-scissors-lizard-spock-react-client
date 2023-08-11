import { Box, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { IconMail, IconUser } from "@tabler/icons";

const ContextMenu = ({
  open,
  setOpen,
  handleRenameOpen,
  ariaLabelledBy,
  anchorEl,
}) => {
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Menu
        id="context-menu"
        keepMounted
        open={Boolean(open)}
        onClose={handleClose}
        anchorEl={anchorEl}
        MenuListProps={{ "aria-labelledby": ariaLabelledBy }}
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
        <MenuItem onClick={handleRenameOpen}>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>Rename Game</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconMail width={20} />
          </ListItemIcon>
          <ListItemText>Close Game</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ContextMenu;
