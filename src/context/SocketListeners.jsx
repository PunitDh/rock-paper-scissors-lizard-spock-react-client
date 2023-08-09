import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useNotification, usePlayer, useSocket, useToken } from "src/hooks";
import { setCurrentGame } from "src/redux/gameSlice";
import { setCurrentGames } from "src/redux/menuSlice";
import { Status, isSuccess } from "src/utils";
import { Event } from "src/utils/constants";

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
    socket.on(Event.USER_LOGGED_IN, handleToken);
    socket.on(Event.USER_REGISTERED, handleToken);
    socket.on(Event.PROFILE_UPDATED, (response) => {
      handleToken(response, "Profile updated!", "/profile");
    });
    socket.on(Event.PROFILE_DELETED, (response) =>
      isSuccess(response).then(player.logout).catch(console.error)
    );
    socket.on(Status.UNAUTHORIZED, () => {
      navigate("/auth/login");
    });
    socket.on(Event.MOVE_PLAYED, (response) =>
      isSuccess(response)
        .then((game) => dispatch(setCurrentGame(game)))
        .catch(console.error)
    );
    socket.on(Event.CURRENT_GAMES_LOADED, (response) =>
      isSuccess(response)
        .then((payload) => dispatch(setCurrentGames(payload)))
        .catch(console.error)
    );
    socket.on(Event.CURRENT_GAME_LOADED, (response) =>
      isSuccess(response)
        .then((payload) => dispatch(setCurrentGame(payload)))
        // .catch(console.error)
        .catch(() => navigate("/games"))
    );

    return () => {
      Object.values(Event).forEach((event) => {
        socket.off(event);
        console.log("Turning off:", event);
      });
    };
  }, []);

  return <></>;
};

export default SocketListeners;
