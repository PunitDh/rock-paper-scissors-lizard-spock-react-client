import axios from "axios";
import { createContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setConversations } from "src/redux/conversationSlice";
import {
  setCurrentGame,
  setCurrentGames,
  setCurrentUsers,
  setRecentGames,
} from "src/redux/playerSlice";
import { setCurrentGamesNav, updateCurrentGameMenu } from "src/redux/menuSlice";
import { setSiteSettings } from "src/redux/siteSlice";
import { AuthPage, SocketRequest } from "src/utils/constants";
import { useNotification, useSocket, useToken } from "src/hooks";

export const APIContext = createContext();

export const APIProvider = ({ children }) => {
  const token = useToken();
  const notification = useNotification();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = useSocket();

  const authHeaders = {
    headers: {
      Authorization: token.jwt,
    },
  };

  const secure = (request) => ({
    ...request,
    _jwt: token.jwt,
  });

  const restricted = (request) => {
    if (token.decoded.isAdmin) {
      return {
        ...request,
        _jwt: token.jwt,
      };
    }
  };

  const request = {
    send: function (method, endpoint, ...args) {
      return new Promise((resolve, reject) =>
        axios[method](`${process.env.REACT_APP_SERVER_URL}${endpoint}`, ...args)
          .then((response) =>
            response.status < 400
              ? resolve(response.data)
              : reject(response.data)
          )
          .catch((error) => reject(error.response.data))
      );
    },

    get: function (...args) {
      return this.send("get", ...args);
    },
    post: function (...args) {
      return this.send("post", ...args);
    },
    put: function (...args) {
      return this.send("put", ...args);
    },
    delete: function (...args) {
      return this.send("delete", ...args);
    },
  };

  const handleToken = (data, successMessage) => {
    if (data.code !== 200) {
      notification.error(data.payload);
    } else {
      token.set(data.payload);
      notification.success(successMessage);
      navigate("/");
    }
  };

  const requests = {
    registerPlayer: (formData) =>
      request
        .post("/player/register", formData)
        .then((response) => handleToken(response, "Registration successful!"))
        .catch((data) => notification.error(data.payload)),

    loginPlayer: (formData) =>
      request
        .post("/player/login", formData)
        .then((response) => handleToken(response, "Login successful!"))
        .catch((data) => notification.error(data.payload)),

    getSiteSettings: () =>
      request
        .get("/admin/settings")
        .then((data) => dispatch(setSiteSettings(data.payload)))
        .catch((data) => notification.error(data.payload)),

    // updateProfile: (formData) =>
    //   request
    //     .put("/player", formData, authHeaders)
    //     .then((data) => {
    //       token.set(data);
    //       notification.success("Profile updated!");
    //       navigate("/profile");
    //     })
    //     .catch((data) => notification.error(data.payload)),

    getConversations: () => {
      if (token.jwt) {
        socket.emit(SocketRequest.JOIN_CHATS, secure());
        return request
          .get("/player/chats", authHeaders)
          .then((data) => dispatch(setConversations(data.payload)))
          .catch((data) => notification.error(data.payload));
      }
    },

    createGame: (data) => {
      return request
        .post("/apps/new", data, authHeaders)
        .then((data) => {
          dispatch(setCurrentGame(data.payload));
          dispatch(updateCurrentGameMenu(data.payload));
          navigate(`/apps/${data.payload.id}`);
        })
        .catch((data) => notification.error(data.payload));
    },

    getCurrentGames: () =>
      token.jwt &&
      request
        .get("/player/apps", authHeaders)
        .then((data) => {
          dispatch(setCurrentGames(data.payload));
          dispatch(setCurrentGamesNav(data.payload));
        })
        .catch((data) => notification.error(data.payload)),

    getRecentGames: (limit) =>
      request
        .get("/apps/recent", { ...authHeaders, params: { limit } })
        .then((data) => dispatch(setRecentGames(data.payload)))
        .catch((data) => notification.error(data.payload)),

    getCurrentUsers: () =>
      request
        .get("/player/players", authHeaders)
        .then((data) => dispatch(setCurrentUsers(data.payload)))
        .catch((data) => notification.error(data.payload)),

    getGame: (gameId) => {
      socket.emit(SocketRequest.JOIN_CHAT, secure({ gameId }));
      return request
        .get(`/apps/${gameId}`, authHeaders)
        .then((data) => dispatch(setCurrentGame(data.payload)))
        .catch((data) => {
          navigate("/apps");
          notification.error(data.payload);
        });
    },

    getLogs: (limit, type) =>
      request.get(`/admin/logs`, { ...authHeaders, params: { limit, type } }),

    clearLogs: () => request.delete(`/admin/logs`, authHeaders),

    translateSubtitles: (formData, sessionId) => {
      socket.emit(SocketRequest.PROGRESS_UPDATE, secure({ sessionId }));
      return request.post("/video/subtitles/translate", formData, authHeaders);
    },

    getDownloadFile: (location) =>
      request.get(`/${location}`, {
        responseType: "blob",
      }),

    setSiteSettings: (request) =>
      socket.emit(SocketRequest.UPDATE_SITE_SETTINGS, restricted(request)),

    renameGame: (request) =>
      socket.emit(SocketRequest.RENAME_GAME, secure(request)),

    deleteGame: (request) =>
      socket.emit(SocketRequest.DELETE_GAME, secure(request)),

    playMove: (request) =>
      socket.emit(SocketRequest.PLAY_MOVE, secure(request)),

    resetGameRounds: (request) =>
      socket.emit(SocketRequest.RESET_GAME_ROUNDS, secure(request)),

    changeGameIcon: (request) =>
      socket.emit(SocketRequest.CHANGE_ICON, secure(request)),

    logoutPlayer: () => {
      token.clear();
      navigate(AuthPage.LOGIN_PAGE);
    },

    sendMessage: (request) =>
      socket.emit(SocketRequest.SEND_MESSAGE, secure(request)),

    updateProfile: (request) =>
      socket.emit(SocketRequest.UPDATE_PROFILE, secure(request)),

    updatePassword: (request) =>
      socket.emit(SocketRequest.UPDATE_PASSWORD, secure(request)),

    deleteProfile: (request) =>
      socket.emit(SocketRequest.DELETE_PROFILE, secure(request)),

    startChat: (request) =>
      socket.emit(SocketRequest.START_CONVERSATION, secure(request)),

    joinChats: () => socket.emit(SocketRequest.JOIN_CHATS, secure()),

    joinChat: (request) =>
      socket.emit(SocketRequest.JOIN_CHAT, secure(request)),

    markConversationAsRead: (request) =>
      socket.emit(SocketRequest.MARK_AS_READ, secure(request)),

    requestProgressUpdate: (request) =>
      socket.emit(SocketRequest.PROGRESS_UPDATE, secure(request)),
  };

  return <APIContext.Provider value={requests}>{children}</APIContext.Provider>;
};
