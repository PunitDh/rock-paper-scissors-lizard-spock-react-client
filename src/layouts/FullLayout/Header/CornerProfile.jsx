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
import { IconUser, IconUserCheck } from "@tabler/icons-react";
import styled from "@emotion/styled";
import { useAPI } from "../../../hooks";
import { ProfileImg, getAvatar } from "../../../assets";
import { isObject } from "../../../utils";

const ProfileAvatar = styled(Avatar)({
  width: 35,
  height: 35,
});

const CornerProfile = ({ decoded }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const api = useAPI();
  const profileImage = getAvatar(decoded.avatar) || ProfileImg;

  const openMenu = (event) => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);
  const navigateTo = (to) => () => closeMenu(navigate(to));

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(isObject(anchorEl) && {
            color: "primary.main",
          }),
        }}
        onClick={openMenu}
      >
        <ProfileAvatar src={profileImage} alt={String(decoded.avatar)} />
      </IconButton>
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
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
        <Box mt={1} py={1} px={2}>
          <Button
            onClick={api.logoutPlayer}
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
