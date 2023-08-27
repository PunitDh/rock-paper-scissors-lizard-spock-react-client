import useToken from "./useToken";
import useSocket from "./useSocket";
import { SocketRequest } from "src/utils/constants";

export default function useConversation() {
  const token = useToken();
  const socket = useSocket();

  const secure = (request) => ({
    ...request,
    _jwt: token.jwt,
  });

  return {
    start: (request) =>
      socket.emit(SocketRequest.START_CONVERSATION, secure(request)),
    joinChats: () => socket.emit(SocketRequest.JOIN_CHATS, secure()),
    joinChat: (request) =>
      socket.emit(SocketRequest.JOIN_CHAT, secure(request)),
    markAsRead: (request) =>
      socket.emit(SocketRequest.MARK_AS_READ, secure(request)),
  };
}
