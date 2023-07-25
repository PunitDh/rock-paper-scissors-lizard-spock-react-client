import { useSelector } from "react-redux";

export default function useSocketMessage() {
  const messages = useSelector((state) => state.messages.all);
  return messages;
}
