import { useNavigate } from "react-router";
import useToken from "./useToken";
import useSocket from "./useSocket";
import { SocketRequest } from "src/utils/constants";

export default function usePlayer() {
  const token = useToken();
  const navigate = useNavigate();
  const socket = useSocket();

  const createSecureRequest = (request) => ({
    ...request,
    _jwt: token.jwt,
  });

  return {
    login: (payload) => socket.emit(SocketRequest.LOGIN_USER, payload),
    register: (payload) => socket.emit(SocketRequest.REGISTER_USER, payload),
    logout: () => {
      token.clear();
      navigate("/auth/login");
    },
    updateProfile: (request) =>
      socket.emit(SocketRequest.UPDATE_PROFILE, createSecureRequest(request)),
    updatePassword: (request) =>
      socket.emit(SocketRequest.UPDATE_PASSWORD, createSecureRequest(request)),
    deleteProfile: (request) =>
      socket.emit(SocketRequest.DELETE_PROFILE, createSecureRequest(request)),
  };
}
