import { createContext, useRef } from "react";
import EventHandler from "../eventHandlers/EventHandler";
import { useClipboard } from "src/hooks";

export const EventDelegatorContext = createContext();

export const EventProvider = ({ state, dispatch, children }) => {
  const inputFocusRef = useRef(false);

  const handleMouseUp = (e) => eventHandler.handleMouseUp(e);
  const handleMouseDown = (e) => eventHandler.handleMouseDown(e);
  const handleContextMenu = (e) => eventHandler.handleContextMenu(e);
  const handlePasteCapture = (e) => eventHandler.handlePasteCapture(e);
  const handleCopyCapture = (e) => eventHandler.handleCopyCapture(e);
  const handleCutCapture = (e) => eventHandler.handleCutCapture(e);
  const handleDoubleClick = (e) => eventHandler.handleDoubleClick(e);
  const handleMouseMove = (e) => eventHandler.handleMouseMove(e);
  const handleKeyUp = (e) => eventHandler.handleKeyUp(e);
  const handleKeyDown = (e) => eventHandler.handleKeyDown(e);

  const clipboard = useClipboard();
  const eventHandler = new EventHandler(
    state,
    dispatch,
    clipboard,
    inputFocusRef
  );

  return (
    <div
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onCopyCapture={handleCopyCapture}
      onPasteCapture={handlePasteCapture}
      onCutCapture={handleCutCapture}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      tabIndex={0}
    >
      <EventDelegatorContext.Provider value={eventHandler}>
        {children}
      </EventDelegatorContext.Provider>
    </div>
  );
};
