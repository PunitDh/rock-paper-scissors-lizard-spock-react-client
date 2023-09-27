import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useAPI, useNotification, useSocket, useToken } from "../hooks";
import {
  openConversation,
  startConversation,
} from "../redux/conversationSlice";
import { deleteGameFromMenu, updateCurrentGameMenu } from "../redux/menuSlice";
import { setCurrentGame, updateCurrentGame } from "../redux/playerSlice";
import { setSiteSettings } from "../redux/siteSlice";
import { isString, isSuccess } from "../utils";
import { AuthPage, SocketResponse, Status } from "../utils/constants";
import { Conversation } from "../redux/types";
import { Data } from "../hooks/types";

const SocketListeners = () => {
  const socket = useSocket();
  const token = useToken();
  const notification = useNotification();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const api = useAPI();

  const handleResponse = (
    response: Data,
    dispatchFunction: (...args: any[]) => any
  ) =>
    isSuccess(response)
      .then((payload) => dispatch(dispatchFunction(payload)))
      .catch((error) => notification.error(error));

  const handleStartConversation = (response: Data) =>
    isSuccess(response)
      .then((payload) =>
        dispatch(
          startConversation({
            ...(payload as Conversation),
            opener: (payload as Conversation).opener === token.decoded?.id,
          })
        )
      )
      .catch((error) => notification.error(error));

  const handleToken = (
    response: Data,
    successMessage: string,
    navigateTo: string = "/"
  ) =>
    isSuccess(response)
      .then((payload) => {
        if (isString(payload)) {
          token.set(payload);
          notification.success(successMessage);
          navigate(navigateTo);
        }
      })
      .catch((error) => notification.error(error));

  const handleSiteSettings = (response) =>
    handleResponse(response, setSiteSettings);

  const updateGame = (response, successMessage = "Game updated!") =>
    isSuccess(response)
      .then((game) => {
        dispatch(updateCurrentGameMenu(game));
        dispatch(updateCurrentGame(game));
        notification.success(successMessage);
      })
      .catch((error) => notification.error(error));

  useEffect(() => {
    api.getSiteSettings();
    socket.on("online-status-changed", (player) => console.log({ player }));
    socket.on(SocketResponse.UPDATE_SITE_SETTINGS, handleSiteSettings);
    socket.on(SocketResponse.UPDATE_PROFILE, (response) =>
      handleToken(response, "Profile updated!", "/profile")
    );
    socket.on(SocketResponse.DELETE_PROFILE, (response) =>
      isSuccess(response)
        .then(api.logoutPlayer)
        .catch((error) => notification.error(error))
    );
    socket.on(Status.UNAUTHORIZED, () => {
      console.log("It's the socket");
      navigate(AuthPage.loginWithReferrer());
    });
    socket.on(SocketResponse.PLAY_MOVE, (response) =>
      handleResponse(response, setCurrentGame)
    );
    socket.on(SocketResponse.START_CONVERSATION, handleStartConversation);
    socket.on(SocketResponse.SEND_MESSAGE, (response) =>
      handleResponse(response, openConversation)
    );
    socket.on(SocketResponse.MARK_AS_READ, (response) =>
      handleResponse(response, openConversation)
    );
    socket.on(SocketResponse.RENAME_GAME, updateGame);
    socket.on(SocketResponse.CHANGE_ICON, updateGame);
    socket.on(SocketResponse.RESET_GAME_ROUNDS, (response) =>
      handleResponse(response, setCurrentGame)
    );

    socket.on(SocketResponse.DELETE_GAME, (response) =>
      handleResponse(response, deleteGameFromMenu)
    );

    return () => {
      Object.values(SocketResponse).forEach((message) => socket.off(message));
    };
  }, []);

  return <></>;
};

export default SocketListeners;
