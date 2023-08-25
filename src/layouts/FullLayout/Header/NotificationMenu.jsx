import { useState } from "react";
import { Badge, IconButton, Menu, alpha } from "@mui/material";
import styled from "@emotion/styled";
import { IconBellRinging } from "@tabler/icons";
import { useToken } from "src/hooks";
import { useSelector } from "react-redux";
import { Bold } from "src/components/shared/styles";
import NotificationItem from "./NotificationItem";
import { uniqueId } from "lodash";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
      "& .notification-button": {
        transition: "opacity 200ms ease-in",
        color: "darkgray",
        opacity: 0,
      },
    },
    "&:hover .MuiMenu-list": {
      padding: "4px 0",
    },
    "&:hover .MuiMenu-list .notification-button": {
      opacity: 1,
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const NotificationMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { currentGames } = useSelector((state) => state.player);
  const token = useToken();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const opponentPlayed = (round) =>
    round.moves.length === 1 && round.moves[0].player !== token.decoded.id;

  const notifications = currentGames
    .filter((game) => game.rounds.some(opponentPlayed))
    .map(function (game) {
      const player = game.players.find(
        (player) => player.id !== token.decoded.id
      );
      return {
        id: uniqueId(),
        player,
        link: `/games/${game.id}`,
        buttonText: "Go to Game",
        content: (
          <>
            <Bold>{player.firstName}</Bold>&nbsp;
            <span>has played a move</span>
          </>
        ),
      };
    })
    .concat();

  return (
    <div>
      <IconButton
        size="large"
        onClick={notifications.length ? handleClick : null}
      >
        {notifications.length ? (
          <Badge badgeContent={notifications.length} color="error">
            <IconBellRinging size="21" stroke="1.5" />
          </Badge>
        ) : (
          <IconBellRinging size="21" stroke="1.5" />
        )}
      </IconButton>
      <StyledMenu
        id="notification-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
      >
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            link={notification.link}
            buttonText={notification.buttonText}
            handleClose={handleClose}
          >
            {notification.content}
          </NotificationItem>
        ))}
      </StyledMenu>
    </div>
  );
};

export default NotificationMenu;
