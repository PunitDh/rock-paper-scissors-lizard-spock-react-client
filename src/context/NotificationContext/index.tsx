import { createContext, useEffect, useReducer } from "react";
import { initialState, reducer } from "./reducer";
import { closeNotification, showNotification, setMessage } from "./actions";
import { NotificationType } from "../../utils/constants";
import { NotificationParams } from "./types";

export const NotificationContext = createContext<NotificationParams>(
  {} as NotificationParams
);

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch(showNotification());
  }, [state.message]);

  const set = (
    message: string | null,
    type = NotificationType.SUCCESS,
    duration = 6000
  ) => {
    dispatch(setMessage({ message, type, duration }));
  };

  const success = (message: string | null, duration: number = 6000) =>
    set(message, NotificationType.SUCCESS, duration);

  const error = (message: string | null, duration = 6000) =>
    set(message, NotificationType.ERROR, duration);

  const close = () => dispatch(closeNotification());

  return (
    <NotificationContext.Provider
      value={{
        set,
        success,
        error,
        close,
        ...state,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
