import { Dispatch, createContext, useRef } from "react";
import EventHandler from "../eventHandlers/EventHandler";
import { useClipboard } from "../../../../../hooks";
import { Action, State } from "../types";
import { Clipboard } from "../../../../../hooks/types";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
  children: any;
};

export const EventDelegatorContext = createContext<EventHandler>(
  {} as EventHandler
);

export const EventProvider = ({
  state,
  dispatch,
  children,
}: Props): JSX.Element => {
  const inputFocusRef = useRef(false);
  const clipboard: Clipboard = useClipboard();

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
