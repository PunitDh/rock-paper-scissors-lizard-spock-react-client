import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { Buffer } from "buffer";
import useToken from "./useToken";
import useNotification from "./useNotification";
import useSocket from "./useSocket";
import { AuthPage, SocketRequest } from "../utils/constants";
import { setSiteSettings } from "../redux/siteSlice";
import { setConversations } from "../redux/conversationSlice";
import {
  setCurrentGame,
  setCurrentGames,
  setCurrentUsers,
  setRecentGames,
} from "../redux/playerSlice";
import {
  setCurrentGamesNav,
  setMessagesNav,
  updateCurrentGameMenu,
} from "../redux/menuSlice";
import {
  API,
  Data,
  GameData,
  LogRequest,
  PlayerLogin,
  PlayerRegistration,
} from "./types";

export default function useAPI(): API {
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

  const secure = (request?: { [key: string]: any }) => ({
    ...request,
    _jwt: token.jwt,
  });

  const restricted = (request) => {
    if (token.decoded?.isAdmin) {
      return {
        ...request,
        _jwt: token.jwt,
      };
    }
  };

  const handleError = (data: Data) => {
    notification.error((data as Data).payload);
    if (data.code === 401) {
      console.log("It's the API");
      navigate(AuthPage.LOGIN_PAGE);
    }
  };

  const request = {
    send: function (method: string, url: string, args: any[]) {
      return new Promise((resolve, reject) =>
        axios[method](`${process.env.REACT_APP_SERVER_URL}${url}`, ...args)
          .then((response: AxiosResponse) =>
            response.status < 400
              ? resolve(response.data)
              : reject(response.data)
          )
          .catch((error: AxiosError) => reject(error.response?.data))
      );
    },

    get: function (url: string, ...args: any[]) {
      return this.send("get", url, args);
    },
    post: function (url: string, ...args: any[]) {
      return this.send("post", url, args);
    },
    put: function (url: string, ...args: any[]) {
      return this.send("put", url, args);
    },
    delete: function (url: string, ...args: any[]) {
      return this.send("delete", url, args);
    },
  };

  const handleToken = (data: Data, successMessage: string) => {
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
    registerPlayer: (playerRegistration: PlayerRegistration) =>
      request
        .post("/player/register", playerRegistration)
        .then((response) =>
          handleToken(response as Data, "Registration successful!")
        )
        .catch(handleError),

    loginPlayer: (playerLogin: PlayerLogin) => {
      return request
        .post(
          "/player/login",
          { remember: playerLogin.remember },
          createBasicAuth(playerLogin)
        )
        .then((response) => handleToken(response as Data, "Login successful!"))
        .catch(handleError);
    },

    getSiteSettings: () =>
      request
        .get("/admin/settings")
        .then((data) => dispatch(setSiteSettings((data as Data).payload)))
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
          .then((data) => {
            dispatch(
              setMessagesNav({
                items: (data as Data).payload,
                currentUser: token.decoded,
                onClick: (request) =>
                  socket.emit(
                    SocketRequest.START_CONVERSATION,
                    secure(request)
                  ),
              })
            );
            dispatch(setConversations((data as Data).payload));
          })
          .catch(handleError);
      }
    },

    createGame: (data: GameData) => {
      return request
        .post("/games/new", data, authHeaders)
        .then((data) => {
          dispatch(setCurrentGame((data as Data).payload));
          dispatch(updateCurrentGameMenu((data as Data).payload));
          navigate(`/apps/${(data as Data).payload.id}`);
        })
        .catch(handleError);
    },

    getCurrentGames: () =>
      token.jwt &&
      request
        .get("/player/games", authHeaders)
        .then((data) => {
          dispatch(setCurrentGames((data as Data).payload));
          dispatch(setCurrentGamesNav((data as Data).payload));
        })
        .catch(handleError),

    getRecentGames: (limit) =>
      request
        .get("/games/recent", { ...authHeaders, params: { limit } })
        .then((data) => dispatch(setRecentGames((data as Data).payload)))
        .catch(handleError),

    getCurrentUsers: () =>
      request
        .get("/player/players", authHeaders)
        .then((data) => dispatch(setCurrentUsers((data as Data).payload)))
        .catch(handleError),

    getGame: (gameId: string) => {
      socket.emit(SocketRequest.JOIN_CHAT, secure({ gameId }));
      return request
        .get(`/games/${gameId}`, authHeaders)
        .then((data) => dispatch(setCurrentGame((data as Data).payload)))
        .catch((data) => {
          navigate("/apps");
          notification.error((data as Data).payload);
        });
    },

    getLogs: ({ limit, type, time }: LogRequest) =>
      request.get(`/admin/logs`, {
        ...authHeaders,
        params: { limit, type, time },
      }) as Promise<Data>,

    clearLogs: () => request.delete(`/admin/logs`, authHeaders) as Promise<Data>,

    translateSubtitles: (formData, sessionId: string) => {
      socket.emit(SocketRequest.PROGRESS_UPDATE, secure({ sessionId }));
      return request.post("/video/subtitles/translate", formData, authHeaders) as Promise<Data>;
    },

    getDownloadFile: (location: string) =>
      request.get(`/${location}`, {
        responseType: "blob",
      }),

    sendRestRequest: (config: AxiosRequestConfig) => axios(config),

    sendProxyRestRequest: (data) =>
      axios.post(`${process.env.REACT_APP_SERVER_URL}/rest`, data, authHeaders),

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
