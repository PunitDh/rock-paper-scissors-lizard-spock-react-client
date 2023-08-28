import { useReducer, useState } from "react";
import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  ListItemText,
  useTheme,
} from "@mui/material";
import ContextMenu from "./ContextMenu";
import RenameGameModal from "./ContextMenu/Modal/Rename";
import DeleteConfirmation from "./ContextMenu/Modal/Delete";
import { FlexBox } from "src/components/shared/styles";
import { NavLink } from "react-router-dom";
import { initialState, reducer } from "./reducer";
import { resetAnchorEl, setAnchorEl, showConfirmRename } from "./actions";

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
  const [state, dispatch] = useReducer(reducer, initialState);
  const theme = useTheme();

  const handleContextMenu = (e) => {
    e.preventDefault();
    dispatch(setAnchorEl(e.currentTarget));
  };

  const handleClick = () => {
    if (onClick) onClick();
    if (closeSideBar) closeSideBar();
  };

  const Icon = item.icon;
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

  return (
    <>
      {hasContextMenu && state.anchorEl && (
        <ContextMenu
          state={state}
          dispatch={dispatch}
          ariaLabelledBy={item.id}
        />
      )}
      {state.confirmRename && (
        <RenameGameModal
          state={state}
          dispatch={dispatch}
          selectedGame={item}
        />
      )}
      {state.confirmDelete && (
        <DeleteConfirmation
          state={state}
          dispatch={dispatch}
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
          aria-controls={state.anchorEl ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={state.anchorEl ? "true" : undefined}
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
