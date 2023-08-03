import { useState } from "react";
import useSocket from "./useSocket";
import { isSuccess } from "src/utils";
import { useDispatch } from "react-redux";
import { setCurrentGame } from "src/redux/gameSlice";
import useToken from "./useToken";
import { useNavigate } from "react-router";

function getGame(request, socket, createRequest, dispatch, navigate) {
  socket?.emit("load-game", createRequest(request));
  socket?.on("game-loaded", (response) =>
    isSuccess(response)
      .then((payload) => dispatch(setCurrentGame(payload)))
      .catch(() => navigate("/games"))
  );
}

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
      socket.emit("create-game", request);
      socket.once("game-created", (response) =>
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
      console.log(createRequest(request));
      // socket.emit("rename-game", createRequest(request));
      // socket.once("game-renamed", console.log);
    },
    close: (gameId) => {
      socket.emit("close-game", gameId);
    },
    getGame: (request) => {
      getGame(request, socket, createRequest, dispatch, navigate);
    },
    playMove: (request) => {
      socket.emit("play-move", createRequest(request));
      socket.once("move-played", (response) =>
        isSuccess(response)
          .then((payload) => {
            dispatch(setCurrentGame(payload));
            setId(payload.id);
          })
          .catch(console.error)
      );
    },
  };
}
