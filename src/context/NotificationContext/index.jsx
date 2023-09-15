import { createContext, useEffect, useReducer } from "react";
import { initialState, reducer } from "./reducer";
import { closeNotification, showNotification, setMessage } from "./actions";
import { NotificationType } from "../../utils/constants";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch(showNotification());
  }, [state.message]);

  const set = (message, type = NotificationType.SUCCESS, duration = 6000) => {
    dispatch(setMessage({ message, type, duration }));
  };

  const success = (message, duration = 6000) =>
    set(message, NotificationType.SUCCESS, duration);

  const error = (message, duration = 6000) =>
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
