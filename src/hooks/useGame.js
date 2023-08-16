import { SocketRequest } from "src/utils/constants";
import useSocket from "./useSocket";
import useToken from "./useToken";
import { useSelector } from "react-redux";

export default function useGame() {
  const socket = useSocket();
  const token = useToken();
  const { currentGame } = useSelector((state) => state.player);

  const secure = (request) => ({
    ...request,
    _jwt: token.jwt,
  });

  return {
    currentGame,
    fetchPlayer: (playerId) =>
      currentGame?.players.find((player) => player.id === playerId),
    create: (request) =>
      socket.emit(SocketRequest.CREATE_GAME, secure(request)),
    rename: (request) =>
      socket.emit(SocketRequest.RENAME_GAME, secure(request)),
    delete: (request) => socket.emit(SocketRequest.DELETE_GAME, secure(request)),
    getGame: (request) =>
      socket.emit(SocketRequest.LOAD_CURRENT_GAME, secure(request)),
    playMove: (request) =>
      socket.emit(SocketRequest.PLAY_MOVE, secure(request)),
    resetRounds: (request) =>
      socket.emit(SocketRequest.RESET_GAME_ROUNDS, secure(request)),
    getCurrentGames: (request) =>
      socket.emit(SocketRequest.LOAD_CURRENT_GAMES, secure(request)),
    getCurrentUsers: (request) =>
      socket.emit(SocketRequest.LOAD_CURRENT_USERS, secure(request)),
    getRecentGames: (request) =>
      socket.emit(SocketRequest.LOAD_RECENT_GAMES, secure(request)),
    changeIcon: (request) =>
      socket.emit(SocketRequest.CHANGE_ICON, secure(request)),
  };
}
