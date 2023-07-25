import { useEffect, useState } from "react";
import useSocket from "./useSocket";
import useToken from "./useToken";
import { isSuccess } from "src/utils";

export default function useRequest(message, payload) {
  const socket = useSocket();
  const token = useToken();
  const [response, setResponse] = useState(null);

  useEffect(() => {
    socket?.emit(message.request, { ...payload, _jwt: token.jwt });
  }, [socket]);

  if (socket) {
    socket.on(message.response, (response) =>
      isSuccess(response).then(setResponse).catch(console.error)
    );
    return response;
  }
  return null;
}
