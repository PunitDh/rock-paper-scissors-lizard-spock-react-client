import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function useSocket() {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const s = io(process.env.REACT_APP_SERVER_URL, {
      transports: ["websocket", "polling", "flashsocket"],
    });
    setSocket(s);
    return () => s.disconnect();
  }, []);

  return socket;
}
