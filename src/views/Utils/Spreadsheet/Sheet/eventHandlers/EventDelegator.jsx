const EventDelegator = ({ eventHandler, children }) => {
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
