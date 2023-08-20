import { useState } from "react";
import {
  Badge,
  Button,
  IconButton,
  Menu,
  MenuItem,
  alpha,
} from "@mui/material";
import styled from "@emotion/styled";
import { IconBellRinging } from "@tabler/icons";
import { useToken } from "src/hooks";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Bold } from "src/components/shared/styles";

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
      "& .go-to-game-button": {
        transition: "opacity 200ms ease-in",
        color: "darkgray",
        opacity: 0,
      },
    },
    "&:hover .MuiMenu-list": {
      padding: "4px 0",
    },
    "&:hover .MuiMenu-list .go-to-game-button": {
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
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateTo = (to) => () => handleClose(navigate(to));

  const opponentPlayed = (round) =>
    round.moves.length === 1 && round.moves[0].player !== token.decoded.id;

  const inProgressGames = currentGames
    ?.filter((game) => game.rounds.some(opponentPlayed))
    .map((game) => ({
      gameId: game.id,
      player: game.players.find((player) => player.id !== token.decoded.id),
    }));

  return (
    <>
      <IconButton
        size="large"
        color="inherit"
        aria-controls={open ? "notification-menu" : null}
        aria-haspopup="true"
        aria-expanded={open ? "true" : null}
        onClick={inProgressGames.length > 0 ? handleClick : null}
      >
        {inProgressGames.length > 0 ? (
          <Badge variant="dot" color="primary">
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
        {inProgressGames.map((gameInfo) => (
          <MenuItem
            onClick={navigateTo(`/games/${gameInfo.gameId}`)}
            disableRipple
            key={gameInfo.gameId}
          >
            <Bold>{gameInfo.player.firstName}</Bold>&nbsp;
            <span>has played a move</span>
            <Button className="go-to-game-button">Go to Game</Button>
          </MenuItem>
        ))}
      </StyledMenu>
    </>
  );
};

export default NotificationMenu;
