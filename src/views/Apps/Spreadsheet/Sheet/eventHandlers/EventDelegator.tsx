import useEventHandler from "../hooks/useEventHandler";

type Props = {
  children: React.ReactNode;
};

const EventDelegator = ({ children }: Props) => {
  const eventHandler = useEventHandler();

  const handleMouseUp = (e: React.MouseEvent) => eventHandler.handleMouseUp(e);
  const handleMouseDown = (e: React.MouseEvent) =>
    eventHandler.handleMouseDown(e);
  const handleContextMenu = (e: React.MouseEvent) =>
    eventHandler.handleContextMenu(e);
  const handlePasteCapture = (e: React.SyntheticEvent) =>
    eventHandler.handlePasteCapture(e);
  const handleCopyCapture = (e: React.SyntheticEvent) =>
    eventHandler.handleCopyCapture(e);
  const handleCutCapture = (e: React.SyntheticEvent) =>
    eventHandler.handleCutCapture(e);
  const handleDoubleClick = (e: React.MouseEvent) =>
    eventHandler.handleDoubleClick();
  const handleMouseMove = (e: React.MouseEvent) =>
    eventHandler.handleMouseMove(e);
  const handleKeyUp = (e: React.KeyboardEvent) => eventHandler.handleKeyUp(e);
  const handleKeyDown = (e: React.KeyboardEvent) =>
    eventHandler.handleKeyDown(e);

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
      {children}
    </div>
  );
};

export default EventDelegator;
