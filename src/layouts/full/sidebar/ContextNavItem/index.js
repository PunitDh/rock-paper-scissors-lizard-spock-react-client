import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// mui imports
import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  ListItemText,
  useTheme,
} from "@mui/material";
import ContextMenu from "src/views/Game/components/ContextMenu";
import RenameGame from "src/views/Game/components/ContextMenu/RenameGame";

const ContextNavItem = ({ item, level, pathDirect, onClick }) => {
  const [menu, showMenu] = useState(false);
  const [rename, showRename] = useState(false);
  const handleContextMenu = (e) => {
    e.preventDefault();
    showMenu(true);
  };

  const handleRenameOpen = () => {
    showRename(true);
    showMenu(false);
  };

  const handleRenameClose = () => {
    showRename(false);
  };

  const Icon = item.icon;
  const theme = useTheme();
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

  const ListItemStyled = styled(ListItem)(() => ({
    whiteSpace: "nowrap",
    marginBottom: "2px",
    padding: "8px 10px",
    borderRadius: "8px",
    backgroundColor: level > 1 ? "transparent !important" : "inherit",
    color: theme.palette.text.secondary,
    paddingLeft: "10px",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.main,
    },
    "&.Mui-selected": {
      color: "white",
      backgroundColor: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: "white",
      },
    },
  }));

  return (
    <>
      {menu && (
        <ContextMenu
          open={menu}
          setOpen={showMenu}
          handleRenameOpen={handleRenameOpen}
        />
      )}
      {rename && <RenameGame open={rename} handleClose={handleRenameClose} />}
      <List
        onContextMenu={handleContextMenu}
        component="li"
        disablePadding
        key={item.id}
      >
        <ListItemStyled
          button
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
        </ListItemStyled>
      </List>
    </>
  );
};

export default ContextNavItem;
