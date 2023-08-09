import { SocketRequest } from "src/utils/constants";
import useSocket from "./useSocket";
import useToken from "./useToken";

export default function useGame() {
  const socket = useSocket();
  const token = useToken();

  const createRequest = (request) => ({
    ...request,
    _jwt: token.jwt,
  });

  return {
    create: (request) =>
      socket.emit(SocketRequest.CREATE_GAME, createRequest(request)),
    rename: (request) =>
      socket.emit(SocketRequest.RENAME_GAME, createRequest(request)),
    close: (gameId) => socket.emit(SocketRequest.CLOSE_GAME, gameId),
    getGame: (request) =>
      socket.emit(SocketRequest.LOAD_CURRENT_GAME, createRequest(request)),
    playMove: (request) =>
      socket.emit(SocketRequest.PLAY_MOVE, createRequest(request)),
    resetRounds: (request) =>
      socket.emit(SocketRequest.RESET_GAME_ROUNDS, createRequest(request)),
    getCurrentUsers: (request) =>
      socket.emit(SocketRequest.LOAD_CURRENT_USERS, createRequest(request)),
    getRecentGames: (request) =>
      socket.emit(SocketRequest.LOAD_RECENT_GAMES, createRequest(request)),
  };
}
