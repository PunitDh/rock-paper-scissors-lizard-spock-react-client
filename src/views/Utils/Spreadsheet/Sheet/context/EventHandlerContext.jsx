import { createContext, useRef } from "react";
import EventHandler from "../eventHandlers/EventHandler";
import { useClipboard } from "../../../../../hooks";

export const EventDelegatorContext = createContext();

export const EventProvider = ({ state, dispatch, children }) => {
  const inputFocusRef = useRef(false);
  const clipboard = useClipboard();

  const eventHandler = new EventHandler(
    state,
    dispatch,
    clipboard,
    inputFocusRef
  );

  return (
    <EventDelegatorContext.Provider value={eventHandler}>
      {children}
    </EventDelegatorContext.Provider>
  );
};
