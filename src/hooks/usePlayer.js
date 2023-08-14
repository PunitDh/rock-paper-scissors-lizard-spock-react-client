import { useNavigate } from "react-router";
import useToken from "./useToken";
import useSocket from "./useSocket";
import { SocketRequest } from "src/utils/constants";

export default function usePlayer() {
  const token = useToken();
  const navigate = useNavigate();
  const socket = useSocket();

  const secure = (request) => ({
    ...request,
    _jwt: token.jwt,
  });

  return {
    login: (request) => socket.emit(SocketRequest.LOGIN_USER, request),
    register: (request) => socket.emit(SocketRequest.REGISTER_USER, request),
    logout: () => {
      token.clear();
      navigate("/auth/login");
    },
    sendMessage: (request) =>
      socket.emit(SocketRequest.SEND_MESSAGE, secure(request)),
    updateProfile: (request) =>
      socket.emit(SocketRequest.UPDATE_PROFILE, secure(request)),
    updatePassword: (request) =>
      socket.emit(SocketRequest.UPDATE_PASSWORD, secure(request)),
    deleteProfile: (request) =>
      socket.emit(SocketRequest.DELETE_PROFILE, secure(request)),
  };
}
