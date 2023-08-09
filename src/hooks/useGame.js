import { useState } from "react";
import useSocket from "./useSocket";
import { isSuccess } from "src/utils";
import { useDispatch } from "react-redux";
import { setCurrentGame } from "src/redux/gameSlice";
import useToken from "./useToken";

export default function useGame() {
  const socket = useSocket();
  const [created, setCreated] = useState(false);
  const [id, setId] = useState(false);
  const dispatch = useDispatch();
  const token = useToken();

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
    },
    playMove: (request) => {
      socket.emit("play-move", createRequest(request));
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
