import { useSocket } from "./useSocket";

export const useGame = () => {
  const socket = useSocket();

  if (socket) {
    socket.on("game-created", console.log);
    socket.on("game-renamed", console.log);
  }

  return {
    start: (payload) => {
      socket.emit("create-game", payload);
    },
    rename: (payload) => {
      socket.emit("rename-game", payload);
    },
    close: (gameId) => {
      socket.emit("close-game", gameId);
    },
  };
};
