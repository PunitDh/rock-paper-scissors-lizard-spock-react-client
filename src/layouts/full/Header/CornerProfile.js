import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  IconListCheck,
  IconMail,
  IconUser,
  IconUserCheck,
} from "@tabler/icons";
import ProfileImg from "src/assets/images/profile/user-1.jpg";
import { avatars } from "src/data";
import { usePlayer } from "src/hooks";

const CornerProfile = ({ decoded }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const player = usePlayer();
  const navigate = useNavigate();
  const profileImage =
    avatars.find((it) => it.id === decoded.avatar)?.image || ProfileImg;

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const navigateTo = (to) => () => handleClose(navigate(to));

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick}
      >
        <Avatar
          src={profileImage}
          alt={String(decoded.avatar)}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <IconUserCheck width={20} />
          </ListItemIcon>
          <ListItemText>
            {decoded.firstName} {decoded.lastName}
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={navigateTo("/profile")}>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconMail width={20} />
          </ListItemIcon>
          <ListItemText>My Account</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconListCheck width={20} />
          </ListItemIcon>
          <ListItemText>My Tasks</ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button
            onClick={player.logout}
            variant="outlined"
            color="primary"
            type="button"
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default CornerProfile;
