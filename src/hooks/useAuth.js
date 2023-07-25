import { useNavigate } from "react-router";
import useToken from "./useToken";
import useSocket from "./useSocket";
import { isSuccess } from "src/utils";

export default function useAuth () {
  const token = useToken();
  const navigate = useNavigate();
  const socket = useSocket();

  const handleToken = (response) =>
    isSuccess(response)
      .then((payload) => {
        token.set(payload);
        navigate("/");
      })
      .catch(console.error);

  if (socket) {
    socket.on("user-logged-in", handleToken);
    socket.on("user-registered", handleToken);
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
  };
};
