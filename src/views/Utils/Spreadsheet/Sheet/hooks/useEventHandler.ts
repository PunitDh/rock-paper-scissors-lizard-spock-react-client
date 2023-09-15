import { useContext } from "react";
import { EventDelegatorContext } from "../context/EventHandlerContext";
import EventHandler from "../eventHandlers/EventHandler";

export default function useEventHandler(): EventHandler {
  return useContext(EventDelegatorContext);
}
