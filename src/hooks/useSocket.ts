import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { Socket } from "socket.io-client";

export default function useSocket(): Socket {
  return useContext(SocketContext);
}
