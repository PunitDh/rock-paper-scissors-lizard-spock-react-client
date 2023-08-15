import useToken from "./useToken";
import useSocket from "./useSocket";
import { SocketRequest } from "src/utils/constants";

export default function useAdmin() {
  const token = useToken();
  const socket = useSocket();

  const restricted = (request) => {
    if (token.decoded.isAdmin) {
      return {
        ...request,
        _jwt: token.jwt,
      };
    }
  };

  return {
    setSiteSettings: (request) =>
      socket.emit(SocketRequest.UPDATE_SITE_SETTINGS, restricted(request)),
  };
}
