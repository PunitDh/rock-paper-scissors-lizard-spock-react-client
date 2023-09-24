import { createContext } from "react";
import { Socket, io } from "socket.io-client";

const socket = io(process.env.REACT_APP_SERVER_URL!, {
  transports: ["websocket", "polling", "flashsocket"],
});

export const SocketContext = createContext<Socket>(socket);

export const SocketProvider = ({ children }) => (
  <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
);
