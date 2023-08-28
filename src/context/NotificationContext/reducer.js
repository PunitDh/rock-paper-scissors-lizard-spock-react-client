import { NotificationType } from "src/utils/constants";
import { NotificationAction } from "./actions";

export const initialState = {
  message: null,
  type: NotificationType.SUCCESS,
  duration: 6000,
  open: false,
};

export const reducer = (state, action) => {
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
