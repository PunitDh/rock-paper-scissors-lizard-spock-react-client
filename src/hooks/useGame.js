import { useState } from "react";
import useSocket from "./useSocket";
import { isSuccess } from "src/utils";

export default function useGame() {
  const socket = useSocket();
  const [created, setCreated] = useState(false);
  const [id, setId] = useState(false);

  if (socket) {
    socket.on("game-created", (response) =>
      isSuccess(response)
        .then((payload) => {
          setCreated(true);
          setId(payload.id);
        })
        .catch(console.error)
    );
    socket.on("game-renamed", console.log);
  }

  return {
    create: (payload) => {
      socket.emit("create-game", payload);
    },
    created,
    id,
    rename: (payload) => {
      socket.emit("rename-game", payload);
    },
    close: (gameId) => {
      socket.emit("close-game", gameId);
    },
  };
}
