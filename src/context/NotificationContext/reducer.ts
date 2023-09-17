import { NotificationType } from "../../utils/constants";
import { NotificationAction } from "./actions";
import { Action, State } from "./types";

export const initialState: State = {
  message: null,
  type: NotificationType.SUCCESS,
  duration: 6000,
  open: false,
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case NotificationAction.SET_MESSAGE:
      return {
        ...action.payload,
        open: true,
      };
    case NotificationAction.SHOW_NOTIFICATION:
      return {
        ...state,
        open: true,
      };
    case NotificationAction.CLOSE_NOTIFICATION:
    case NotificationAction.RESET_STATE:
    default:
      return initialState;
  }
};
