import { useState } from "react";
import useSocket from "./useSocket";
import { isSuccess } from "src/utils";
import { useDispatch } from "react-redux";
import { setCurrentGame } from "src/redux/gameSlice";
import useToken from "./useToken";
import { useNavigate } from "react-router";

export default function useGame() {
  const socket = useSocket();
  const [created, setCreated] = useState(false);
  const [id, setId] = useState(false);
  const dispatch = useDispatch();
  const token = useToken();
  const navigate = useNavigate();

  const createRequest = (request) => ({
    ...request,
    _jwt: token.jwt,
  });

  return {
    create: (request) => {
      socket.emit("create-game", createRequest(request));
      socket.on("game-created", (response) =>
        isSuccess(response)
          .then((payload) => {
            setCreated(true);
            dispatch(setCurrentGame(payload));
            setId(payload.id);
          })
          .catch(console.error)
      );
    },
    created,
    id,
    socket,
    rename: (request) => {
      socket.emit("rename-game", createRequest(request));
      socket.on("game-renamed", console.log);
    },
    close: (gameId) => {
      socket.emit("close-game", gameId);
    },
    getGame: (request) => {
      socket.emit("load-game", createRequest(request));
      socket.on(
        "game-loaded",
        (response) =>
          isSuccess(response)
            .then((payload) => dispatch(setCurrentGame(payload)))
            .catch(console.error)
        // .catch(() => navigate("/games"))
      );
    },
    playMove: (request) => {
      socket.emit("play-move", createRequest(request));
      socket.on("move-played", (response) => {
        isSuccess(response)
          .then((payload) => {
            dispatch(setCurrentGame(payload));
            setId(payload.id);
          })
          .catch(console.error);
      });
    },

    resetRounds: (request) => {
      socket.emit("reset-rounds", createRequest(request));
      socket.on("rounds-reset", (response) => {
        isSuccess(response)
          .then((payload) => {
            dispatch(setCurrentGame(payload));
          })
          .catch(console.error);
      });
    },
  };
}
