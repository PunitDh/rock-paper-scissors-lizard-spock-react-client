import { useNavigate } from "react-router";
import useToken from "./useToken";
import useSocket from "./useSocket";

export default function usePlayer() {
  const token = useToken();
  const navigate = useNavigate();
  const socket = useSocket();

  const createSecureRequest = (request) => ({
    ...request,
    _jwt: token.jwt,
  });

  return {
    login: (payload) => {
      socket.emit("login-user", payload);
    },
    register: (payload) => {
      socket.emit("register-user", payload);
    },
    logout: () => {
      token.clear();
      navigate("/auth/login");
    },
    updateProfile: (request) => {
      socket.emit("update-profile", createSecureRequest(request));
    },
    updatePassword: (request) => {
      socket.emit("update-password", createSecureRequest(request));
    },
    deleteProfile: (request) => {
      socket.emit("delete-profile", createSecureRequest(request));
    },
  };
}
