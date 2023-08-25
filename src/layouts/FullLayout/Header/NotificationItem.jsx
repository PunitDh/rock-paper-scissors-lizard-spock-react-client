import { Button, MenuItem } from "@mui/material";
import { useNavigate } from "react-router";

const NotificationItem = ({ handleClose, link, children, buttonText }) => {
  const navigate = useNavigate();
  const navigateTo = (to) => () => handleClose(navigate(to));

  return (
    <MenuItem onClick={navigateTo(link)} disableRipple>
      {children}
      <Button className="notification-button">{buttonText}</Button>
    </MenuItem>
  );
};

export default NotificationItem;
