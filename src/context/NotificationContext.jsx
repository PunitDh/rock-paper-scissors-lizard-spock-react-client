import { createContext, useEffect, useState } from "react";
import { NotificationType } from "src/utils/constants";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [options, setOptions] = useState({
    message: null,
    type: NotificationType.SUCCESS,
    duration: 6000,
  });

  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(true);
  }, [options.message]);

  const set = (message, type = NotificationType.SUCCESS, duration = 6000) => {
    setOptions({ message, type, duration });
    setOpen(true);
  };

  const success = (message, duration = 6000) =>
    set(message, NotificationType.SUCCESS, duration);

  const error = (message, duration = 6000) =>
    set(message, NotificationType.ERROR, duration);

  return (
    <NotificationContext.Provider
      value={{
        set,
        success,
        error,
        message: options.message,
        type: options.type,
        duration: options.duration,
        open,
        setOpen,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
