import axios from "axios";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
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
import { Buffer } from "buffer";

export default function useAPI() {
  const token = useToken();
  const notification = useNotification();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = useSocket();
  const location = useLocation();

  const authHeaders = {
    headers: {
      Authorization: token.jwt,
    },
  };

  const createBasicAuth = (formData) => {
    const credentials = Buffer.from(
      `${formData.email}:${formData.password}`
    ).toString("base64");

    return {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    };
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

  const handleError = (data) => {
    notification.error(data.payload);
    if (data.code === 401) {
      navigate(AuthPage.LOGIN_PAGE);
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
    if (data.code >= 300) {
      handleError(data);
      return;
    }

    token.set(data.payload);
    notification.success(successMessage);

    const params = new URLSearchParams(location.search);
    const referrerUrl = params.get("referrer");

    if (referrerUrl) {
      try {
        const url = new URL(referrerUrl);
        return navigate(url.pathname);
      } catch {
        return navigate("/");
      }
    }
    return navigate("/");
  };

  return {
    registerPlayer: (formData) =>
      request
        .post("/player/register", formData)
        .then((response) => handleToken(response, "Registration successful!"))
        .catch(handleError),

    loginPlayer: (formData) => {
      return request
        .post("/player/login", {}, createBasicAuth(formData))
        .then((response) => handleToken(response, "Login successful!"))
        .catch(handleError);
    },

    getSiteSettings: () =>
      request
        .get("/admin/settings")
        .then((data) => dispatch(setSiteSettings(data.payload)))
        .catch(handleError),

    // updateProfile: (formData) =>
    //   request
    //     .put("/player", formData, authHeaders)
    //     .then((data) => {
    //       token.set(data);
    //       notification.success("Profile updated!");
    //       navigate("/profile");
    //     })
    //     .catch(handleError),

    getConversations: () => {
      if (token.jwt) {
        socket.emit(SocketRequest.JOIN_CHATS, secure());
        return request
          .get("/player/chats", authHeaders)
          .then((data) => dispatch(setConversations(data.payload)))
          .catch(handleError);
      }
    },

    createGame: (data) => {
      return request
        .post("/games/new", data, authHeaders)
        .then((data) => {
          dispatch(setCurrentGame(data.payload));
          dispatch(updateCurrentGameMenu(data.payload));
          navigate(`/apps/${data.payload.id}`);
        })
        .catch(handleError);
    },

    getCurrentGames: () =>
      token.jwt &&
      request
        .get("/player/games", authHeaders)
        .then((data) => {
          dispatch(setCurrentGames(data.payload));
          dispatch(setCurrentGamesNav(data.payload));
        })
        .catch(handleError),

    getRecentGames: (limit) =>
      request
        .get("/games/recent", { ...authHeaders, params: { limit } })
        .then((data) => dispatch(setRecentGames(data.payload)))
        .catch(handleError),

    getCurrentUsers: () =>
      request
        .get("/player/players", authHeaders)
        .then((data) => dispatch(setCurrentUsers(data.payload)))
        .catch(handleError),

    getGame: (gameId) => {
      socket.emit(SocketRequest.JOIN_CHAT, secure({ gameId }));
      return request
        .get(`/games/${gameId}`, authHeaders)
        .then((data) => dispatch(setCurrentGame(data.payload)))
        .catch((data) => {
          navigate("/apps");
          notification.error(data.payload);
        });
    },

    getLogs: ({ limit, type, time }) =>
      request.get(`/admin/logs`, {
        ...authHeaders,
        params: { limit, type, time },
      }),

    clearLogs: () => request.delete(`/admin/logs`, authHeaders),

    translateSubtitles: (formData, sessionId) => {
      socket.emit(SocketRequest.PROGRESS_UPDATE, secure({ sessionId }));
      return request.post("/video/subtitles/translate", formData, authHeaders);
    },

    getDownloadFile: (location) =>
      request.get(`/${location}`, {
        responseType: "blob",
      }),

    sendRestRequest: (config) => axios(config),

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
}
