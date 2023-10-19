import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";
import { NotificationParams } from "../context/NotificationContext/types";

export default function useNotification(): NotificationParams {
  return useContext(NotificationContext);
}
