import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useNotification, usePlayer, useSocket, useToken } from "src/hooks";
import {
  setCurrentGame,
  setCurrentUsers,
  setRecentGames,
  updateCurrentGame,
} from "src/redux/gameSlice";
import { setCurrentGames, updateCurrentGameMenu } from "src/redux/menuSlice";
import { Status, isSuccess } from "src/utils";
import { SocketResponse } from "src/utils/constants";

const SocketListeners = () => {
  const socket = useSocket();
  const token = useToken();
  const notification = useNotification();
  const navigate = useNavigate();
  const player = usePlayer();
  const dispatch = useDispatch();

  const handleToken = (response, successMessage, navigateTo = "/") => {
    isSuccess(response)
      .then((payload) => {
        token.set(payload);
        notification.success(successMessage);
        navigate(navigateTo);
      })
      .catch(notification.error);
  };

  useEffect(() => {
    socket.on(SocketResponse.USER_LOGGED_IN, handleToken);
    socket.on(SocketResponse.USER_REGISTERED, handleToken);
    socket.on(SocketResponse.PROFILE_UPDATED, (response) =>
      handleToken(response, "Profile updated!", "/profile")
    );
    socket.on(SocketResponse.PROFILE_DELETED, (response) =>
      isSuccess(response).then(player.logout).catch(notification.error)
    );
    socket.on(Status.UNAUTHORIZED, () => navigate("/auth/login"));
    socket.on(SocketResponse.MOVE_PLAYED, (response) =>
      isSuccess(response)
        .then((game) => dispatch(setCurrentGame(game)))
        .catch(notification.error)
    );
    socket.on(SocketResponse.CURRENT_GAMES_LOADED, (response) =>
      isSuccess(response)
        .then((games) => dispatch(setCurrentGames(games)))
        .catch(notification.error)
    );
    socket.on(SocketResponse.CURRENT_GAME_LOADED, (response) =>
      isSuccess(response)
        .then((game) => dispatch(setCurrentGame(game)))
        .catch(() => navigate("/games"))
    );
    socket.on(SocketResponse.CURRENT_USERS_LOADED, (response) =>
      isSuccess(response)
        .then((users) => dispatch(setCurrentUsers(users)))
        .catch(notification.error)
    );
    socket.on(SocketResponse.GAME_RENAMED, (response) =>
      isSuccess(response).then((game) => {
        dispatch(updateCurrentGameMenu(game));
        dispatch(updateCurrentGame(game));
        notification.success("Game updated!")
      })
    );
    socket.on(SocketResponse.GAME_ROUNDS_RESET, (response) =>
      isSuccess(response)
        .then((game) => dispatch(setCurrentGame(game)))
        .catch(notification.error)
    );
    socket.on(SocketResponse.GAME_CREATED, (response) =>
      isSuccess(response)
        .then((game) => {
          dispatch(setCurrentGame(game));
          navigate(`/games/${game.id}`);
        })
        .catch(notification.error)
    );
    socket.on(SocketResponse.RECENT_GAMES_LOADED, (response) =>
      isSuccess(response)
        .then((game) => dispatch(setRecentGames(game)))
        .catch(notification.error)
    );

    return () => {
      Object.values(SocketResponse).forEach((event) => {
        socket.off(event);
        console.log("Turning off:", event);
      });
    };
  }, []);

  return <></>;
};

export default SocketListeners;
