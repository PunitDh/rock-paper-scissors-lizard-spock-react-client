import { useContext } from "react";
import { NotificationContext } from "src/context/NotificationContext";

export default function useNotification() {
  return useContext(NotificationContext);
}
