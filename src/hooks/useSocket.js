import { useContext } from "react";
import { SocketContext } from "src/context/SocketContext";

export default function useSocket() {
  return useContext(SocketContext);
}
