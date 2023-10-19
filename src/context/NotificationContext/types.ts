import { NotificationType } from "../../utils/constants";
import { NotificationAction } from "./actions";

export type Action = {
  type: NotificationAction;
  payload?: any;
};

export type State = {
  message: string | null;
  type: NotificationType;
  duration: number;
  open: boolean;
};

export type NotificationParams = {
  set: (
    message: string | null,
    type: NotificationType,
    duration?: number
  ) => void;
  success: (message: string | null, duration?: number) => void;
  error: (message: string | null, duration?: number) => void;
  close: () => void;
} & State;
