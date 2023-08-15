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
      socket.emit(SocketRequest.SEND_MESSAGE, secure(request)),
  };
}
