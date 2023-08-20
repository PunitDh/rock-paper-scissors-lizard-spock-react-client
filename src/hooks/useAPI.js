import axios from "axios";
import useToken from "./useToken";
import useNotification from "./useNotification";
import { useDispatch } from "react-redux";
import { setConversations } from "src/redux/conversationSlice";
import {
  setCurrentGame,
  setCurrentGames,
  setCurrentUsers,
  setRecentGames,
} from "src/redux/playerSlice";
import { setCurrentGamesNav } from "src/redux/menuSlice";
import { useNavigate } from "react-router";
import { setSiteSettings } from "src/redux/siteSlice";

export default function useAPI() {
  const token = useToken();
  const notification = useNotification();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authHeaders = {
    headers: {
      Authorization: token.jwt,
    },
  };

  const request = {
    send: function (method, endpoint, ...args) {
      return new Promise((resolve, reject) =>
        axios[method](
          `${process.env.REACT_APP_SERVER_URL}${endpoint}`,
          ...args
        ).then((response) =>
          response.status < 400 ? resolve(response.data) : reject(response.data)
        )
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

  const handleToken = (payload) => {
    token.set(payload);
    notification.success("Success");
    navigate("/");
  };

  return {
    registerPlayer: (formData) =>
      request
        .post("/player/register", formData)
        .then(handleToken)
        .catch(notification.error),

    loginPlayer: (formData) =>
      request
        .post("/player/login", formData)
        .then(handleToken)
        .catch(notification.error),

    getSiteSettings: () =>
      request
        .get("/admin/settings")
        .then((data) => dispatch(setSiteSettings(data.payload)))
        .catch(notification.error),

    updateProfile: (formData) =>
      request
        .put("/player", formData, authHeaders)
        .then((data) => {
          token.set(data);
          notification.success("Profile updated!");
          navigate("/profile");
        })
        .catch(notification.error),

    getConversations: () =>
      request
        .get("/player/chats", authHeaders)
        .then((data) => dispatch(setConversations(data.payload)))
        .catch(notification.error),

    getCurrentGames: () =>
      request
        .get("/player/games", authHeaders)
        .then((data) => {
          dispatch(setCurrentGames(data.payload));
          dispatch(setCurrentGamesNav(data.payload));
        })
        .catch(notification.error),

    getRecentGames: () =>
      request
        .get("/games/recent", authHeaders)
        .then((data) => dispatch(setRecentGames(data.payload)))
        .catch(notification.error),

    getCurrentUsers: () =>
      request
        .get("/player/players", authHeaders)
        .then((data) => dispatch(setCurrentUsers(data.payload)))
        .catch(notification.error),

    getGame: ({ gameId }) =>
      request
        .get(`/games/${gameId}`, authHeaders)
        .then((data) => dispatch(setCurrentGame(data.payload)))
        .catch(() => navigate("/games")),

    translateSubtitles: (formData) =>
      request.post("/video/subtitles/translate", formData, authHeaders),
  };
}
