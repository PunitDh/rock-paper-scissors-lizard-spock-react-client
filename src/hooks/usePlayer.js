import { useNavigate } from "react-router";
import useToken from "./useToken";
import useSocket from "./useSocket";
import { isSuccess } from "src/utils";
import useNotification from "./useNotification";

export default function usePlayer() {
  const token = useToken();
  const navigate = useNavigate();
  const socket = useSocket();
  const notification = useNotification();

  const handleToken = (response, navigateTo = "/") => {
    console.log(response);
    isSuccess(response)
      .then((payload) => {
        token.set(payload);
        notification.success("Done")
        navigate(navigateTo);
      })
      .catch((error) => notification.error(error));
  };

  const createSecureRequest = (request) => ({
    ...request,
    _jwt: token.jwt,
  });

  const playerFunctions = {
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

  if (socket) {
    socket.on("user-logged-in", handleToken);
    socket.on("user-registered", handleToken);
    socket.on("profile-updated", (response) => {
      handleToken(response, "/profile");
    });
    socket.on("profile-deleted", (response) => {
      token.clear();
      isSuccess(response)
        .then(() => playerFunctions.logout())
        .catch(console.error);
    });
  }

  return playerFunctions;
}
