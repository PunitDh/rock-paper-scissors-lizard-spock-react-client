import useToken from "./useToken";
import useSocket from "./useSocket";
import { SocketRequest } from "src/utils/constants";

export default function useUtils() {
  const token = useToken();
  const socket = useSocket();

  const secure = (request) => ({
    ...request,
    _jwt: token.jwt,
  });

  return {
    requestProgressUpdate: (request) =>
      socket.emit(SocketRequest.PROGRESS_UPDATE, secure(request)),
  };
}
