import { useState } from "react";
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
import RenameGameModal from "src/views/Game/components/ContextMenu/RenameGame";

const ContextNavItem = ({ item, level, pathDirect, onClick }) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const [rename, showRename] = useState(false);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  const handleRenameOpen = () => {
    showRename(true);
    setAnchorEl(null);
  };

  const handleRenameClose = () => showRename(false);

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
      {anchorEl && (
        <ContextMenu
          open={anchorEl}
          setOpen={setAnchorEl}
          handleRenameOpen={handleRenameOpen}
          ariaLabelledBy={item.id}
          anchorEl={anchorEl}
        />
      )}
      {rename && (
        <RenameGameModal
          open={rename}
          handleClose={handleRenameClose}
          selectedGame={item}
        />
      )}
      <List
        onContextMenu={handleContextMenu}
        component="li"
        disablePadding
        key={item.id}
        id={item.id}
      >
        <ListItemStyled
          button
          component={item.external ? "a" : NavLink}
          to={item.href}
          id={item.id}
          href={item.external ? item.href : ""}
          disabled={item.disabled}
          selected={pathDirect === item.href}
          target={item.external ? "_blank" : ""}
          onClick={onClick}
          aria-controls={anchorEl ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={anchorEl ? "true" : undefined}
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
