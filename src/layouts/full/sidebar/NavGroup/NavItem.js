import { NavLink } from "react-router-dom";
import {
  ListItemIcon,
  List,
  ListItemText,
  ListItemButton,
} from "@mui/material";

const NavItem = ({ item, pathDirect, onClick }) => {
  const Icon = item.icon;
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

  return (
    <List component="li" disablePadding key={item.id}>
      <ListItemButton
        type="button"
        component={item.external ? "a" : NavLink}
        to={item.href}
        href={item.external ? item.href : ""}
        disabled={item.disabled}
        selected={pathDirect === item.href}
        target={item.external ? "_blank" : ""}
        onClick={onClick}
      >
        <ListItemIcon
          sx={{
            minWidth: "36px",
            p: "3px 0",
            color: "inherit",
          }}
        >
          {itemIcon}
        </ListItemIcon>
        <ListItemText>
          <>{item.title}</>
        </ListItemText>
      </ListItemButton>
    </List>
  );
};

export default NavItem;
