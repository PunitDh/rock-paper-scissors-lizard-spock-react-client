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
