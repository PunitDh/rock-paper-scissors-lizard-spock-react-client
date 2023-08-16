import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useNotification, usePlayer, useSocket, useToken } from "src/hooks";
import { setCurrentConversation } from "src/redux/conversationSlice";
import {
  deleteGameFromMenu,
  setCurrentGamesNav,
  updateCurrentGameMenu,
} from "src/redux/menuSlice";
import {
  setCurrentGames,
  setCurrentGame,
  setCurrentUsers,
  setRecentGames,
  updateCurrentGame,
} from "src/redux/playerSlice";
import { setSiteSettings } from "src/redux/siteSlice";
import { Status, isSuccess } from "src/utils";
import { SocketRequest, SocketResponse } from "src/utils/constants";

const SocketListeners = () => {
  const socket = useSocket();
  const token = useToken();
  const notification = useNotification();
  const navigate = useNavigate();
  const player = usePlayer();
  const dispatch = useDispatch();

  const setGames = (games) => {
    dispatch(setCurrentGames(games));
    dispatch(setCurrentGamesNav(games));
  };

  const handleResponse = (response, dispatchFunction) =>
    isSuccess(response)
      .then((payload) => dispatch(dispatchFunction(payload)))
      .catch(notification.error);

  const handleToken = (response, successMessage, navigateTo = "/") =>
    isSuccess(response)
      .then((payload) => {
        token.set(payload);
        notification.success(successMessage);
        navigate(navigateTo);
      })
      .catch(notification.error);

  const handleSiteSettings = (response) =>
    handleResponse(response, setSiteSettings);

  const updateGame = (response, successMessage = "Game updated!") =>
    isSuccess(response)
      .then((game) => {
        dispatch(updateCurrentGameMenu(game));
        dispatch(updateCurrentGame(game));
        notification.success(successMessage);
      })
      .catch(notification.error);

  useEffect(() => {
    socket.emit(SocketRequest.GET_SITE_SETTINGS);
    socket.on(SocketResponse.SITE_SETTINGS_RECEIVED, handleSiteSettings);
    socket.on(SocketResponse.SITE_SETTINGS_UPDATED, handleSiteSettings);
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
      handleResponse(response, setCurrentGame)
    );
    socket.on(SocketResponse.CONVERSATION_STARTED, (response) =>
      handleResponse(response, setCurrentConversation)
    );
    socket.on(SocketResponse.MESSAGE_SENT, (response) =>
      handleResponse(response, setCurrentConversation)
    );

    socket.on(SocketResponse.CURRENT_GAMES_LOADED, (response) =>
      isSuccess(response).then(setGames).catch(notification.error)
    );
    socket.on(SocketResponse.CURRENT_GAME_LOADED, (response) =>
      isSuccess(response)
        .then((game) => dispatch(setCurrentGame(game)))
        .catch(() => navigate("/games"))
    );
    socket.on(SocketResponse.CURRENT_USERS_LOADED, (response) =>
      handleResponse(response, setCurrentUsers)
    );

    socket.on(SocketResponse.GAME_RENAMED, updateGame);
    socket.on(SocketResponse.ICON_CHANGED, updateGame);
    socket.on(SocketResponse.GAME_ROUNDS_RESET, (response) =>
      handleResponse(response, setCurrentGame)
    );

    socket.on(SocketResponse.GAME_CREATED, (response) =>
      isSuccess(response)
        .then((game) => {
          dispatch(setCurrentGame(game));
          dispatch(updateCurrentGameMenu(game));
          navigate(`/games/${game.id}`);
        })
        .catch(notification.error)
    );
    socket.on(SocketResponse.GAME_DELETED, (response) =>
      handleResponse(response, deleteGameFromMenu)
    );

    socket.on(SocketResponse.RECENT_GAMES_LOADED, (response) =>
      handleResponse(response, setRecentGames)
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
