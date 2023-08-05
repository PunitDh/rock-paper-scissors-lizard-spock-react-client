import { useNavigate } from "react-router";
import useToken from "./useToken";
import useSocket from "./useSocket";
import { isSuccess } from "src/utils";

export default function usePlayer() {
  const token = useToken();
  const navigate = useNavigate();
  const socket = useSocket();

  const handleToken = (response, navigateTo = "/") =>
    isSuccess(response)
      .then((payload) => {
        token.set(payload);
        navigate(navigateTo);
      })
      .catch(console.error);

  const createRequest = (request) => ({
    ...request,
    _jwt: token.jwt,
  });

  if (socket) {
    socket.once("user-logged-in", handleToken);
    socket.once("user-registered", handleToken);
    socket.once("profile-updated", (response) => {
      console.log("Profile Updated", response.payload);
      handleToken(response, "/profile");
    });
  }

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
      socket.emit("update-profile", createRequest(request));
    },
    updatePassword: (request) => {
      socket.emit("update-password", createRequest(request));
    },
    deletePermanently: (request) => {
      socket.emit("delete-permanently", createRequest(request));
    },
  };
}
