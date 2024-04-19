import { Button, MenuItem } from "@mui/material";
import { useNavigate } from "react-router";

type Props = {
  handleClose: (any: any) => void;
  link: string;
  children: string | React.ReactNode;
  buttonText: string;
};

const NotificationItem = ({
  handleClose,
  link,
  children,
  buttonText,
}: Props) => {
  const navigate = useNavigate();
  const navigateTo = (to: string) => () => handleClose(navigate(to));

  return (
    <MenuItem onClick={navigateTo(link)} disableRipple>
      {children}
      <Button className="notification-button">{buttonText}</Button>
    </MenuItem>
  );
};

export default NotificationItem;
