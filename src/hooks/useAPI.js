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
      return new Promise((resolve, reject) => {
        console.log(args);
        return axios[method](
          `${process.env.REACT_APP_SERVER_URL}${endpoint}`,
          ...args
        ).then((response) =>
          response.status < 400
            ? resolve(response.data.payload)
            : reject(response.data.payload)
        );
      });
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
        .then((payload) => dispatch(setSiteSettings(payload)))
        .catch(notification.error),

    updateProfile: (formData) =>
      request
        .put("/player", formData, authHeaders)
        .then((payload) => {
          token.set(payload);
          notification.success("Profile updated!");
          navigate("/profile");
        })
        .catch(notification.error),

    getConversations: () =>
      request
        .get("/player/chats", authHeaders)
        .then((payload) => dispatch(setConversations(payload)))
        .catch(notification.error),

    getCurrentGames: () =>
      request
        .get("/player/games", authHeaders)
        .then((payload) => {
          dispatch(setCurrentGames(payload));
          dispatch(setCurrentGamesNav(payload));
        })
        .catch(notification.error),

    getRecentGames: () =>
      request
        .get("/games/recent", authHeaders)
        .then((payload) => dispatch(setRecentGames(payload)))
        .catch(notification.error),

    getCurrentUsers: () =>
      request
        .get("/player/players", authHeaders)
        .then((payload) => dispatch(setCurrentUsers(payload)))
        .catch(notification.error),

    getGame: ({ gameId }) =>
      request
        .get(`/games/${gameId}`, authHeaders)
        .then((payload) => dispatch(setCurrentGame(payload)))
        .catch(() => navigate("/games")),

    translateSubtitles: (formData) =>
      request.post("/video/subtitles/translate", formData, authHeaders),
  };
}
