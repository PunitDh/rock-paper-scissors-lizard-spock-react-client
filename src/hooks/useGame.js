import { SocketRequest } from "src/utils/constants";
import useSocket from "./useSocket";
import useToken from "./useToken";

export default function useGame() {
  const socket = useSocket();
  const token = useToken();

  const secure = (request) => ({
    ...request,
    _jwt: token.jwt,
  });

  return {
    create: (request) =>
      socket.emit(SocketRequest.CREATE_GAME, secure(request)),
    rename: (request) =>
      socket.emit(SocketRequest.RENAME_GAME, secure(request)),
    close: (gameId) => socket.emit(SocketRequest.CLOSE_GAME, gameId),
    getGame: (request) =>
      socket.emit(SocketRequest.LOAD_CURRENT_GAME, secure(request)),
    playMove: (request) =>
      socket.emit(SocketRequest.PLAY_MOVE, secure(request)),
    resetRounds: (request) =>
      socket.emit(SocketRequest.RESET_GAME_ROUNDS, secure(request)),
    getCurrentUsers: (request) =>
      socket.emit(SocketRequest.LOAD_CURRENT_USERS, secure(request)),
    getRecentGames: (request) =>
      socket.emit(SocketRequest.LOAD_RECENT_GAMES, secure(request)),
  };
}
