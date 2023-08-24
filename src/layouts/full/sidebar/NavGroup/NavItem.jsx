import { useState } from "react";
import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  ListItemText,
  useTheme,
} from "@mui/material";
import ContextMenu from "../ContextMenu";
import RenameGameModal from "../ContextMenu/RenameGameModal";
import DeleteConfirmation from "../ContextMenu/DeleteConfirmation";
import { FlexBox } from "src/components/shared/styles";
import { NavLink } from "react-router-dom";

const ListItemStyled = styled(ListItem)(({ theme, level }) => ({
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

const MovePlayedNotification = styled(FlexBox)({
  fontSize: "small",
  color: "white",
  backgroundColor: "red",
  width: "1rem",
  height: "1rem",
  borderRadius: "0.5rem",
});

const NavItem = ({
  item,
  level,
  pathDirect,
  onClick,
  closeSideBar,
  hasContextMenu = false,
}) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const [rename, showRename] = useState(false);
  const [deleteConfirmation, showDeleteConfirmation] = useState(false);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  const handleRenameOpen = () => {
    showRename(true);
    setAnchorEl(null);
  };

  const handleDeleteConfirm = () => {
    showDeleteConfirmation(true);
    setAnchorEl(null);
  };

  const handleRenameClose = () => showRename(false);
  const handleDeleteConfirmationClose = () => showDeleteConfirmation(false);

  const handleClick = () => {
    if (onClick) onClick();
    if (closeSideBar) closeSideBar();
  };

  const Icon = item.icon;
  const theme = useTheme();
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

  return (
    <>
      {hasContextMenu && anchorEl && (
        <ContextMenu
          open={anchorEl}
          setOpen={setAnchorEl}
          handleRenameOpen={handleRenameOpen}
          handleDeleteConfirm={handleDeleteConfirm}
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
      {deleteConfirmation && (
        <DeleteConfirmation
          open={deleteConfirmation}
          handleClose={handleDeleteConfirmationClose}
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
          theme={theme}
          level={level}
          button
          component={item.external ? "a" : NavLink}
          to={item.href}
          id={item.id}
          href={item.external ? item.href : ""}
          disabled={item.disabled}
          selected={pathDirect === item.href}
          target={item.external ? "_blank" : ""}
          onClick={handleClick}
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
          <ListItemText>{item.title}</ListItemText>
          {item.movePlayed && (
            <MovePlayedNotification>
              {Number(item.movePlayed)}
            </MovePlayedNotification>
          )}
        </ListItemStyled>
      </List>
    </>
  );
};

export default NavItem;
