import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

/**
 *
 * @returns {{set: Function, success: Function, error: Function}}
 */
export default function useNotification() {
  return useContext(NotificationContext);
}
