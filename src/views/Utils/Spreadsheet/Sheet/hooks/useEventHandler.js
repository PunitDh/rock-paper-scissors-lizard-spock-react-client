import { useContext } from "react";
import { EventDelegatorContext } from "../context/EventHandlerContext";

export default function useEventHandler() {
  return useContext(EventDelegatorContext);
}
