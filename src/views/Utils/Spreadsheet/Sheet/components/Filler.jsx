import styled from "@emotion/styled";
import { useCallback, useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import useEventHandler from "../hooks/useEventHandler";
import { setFillerMode } from "../actions";

const Container = styled.div(({ top, left }) => ({
  position: "absolute",
  top: `${top}px`,
  left: `${left}px`,
  zIndex: "60000",
  userSelect: "none"
}));

const FillerObject = styled.div({
  width: `6px`,
  height: `6px`,
  borderRadius: 0,
  outline: "none",
  border: "2px solid blue",
  backgroundColor: "blue",
  cursor: "crosshair",
});

const Filler = ({ state, dispatch }) => {
  const eventHandler = useEventHandler();

  const fillerRef = useCallback(
    (node) => eventHandler.setFillerRef(node),
    [eventHandler]
  );

  const cell = state.selectedCell;
  const selectedCells = state.highlighted.cells;
  const lastSelected = selectedCells[state.highlighted.cells.length - 1];

  const [position, setPosition] = useState({ top: 0, left: 0 });

  const setTextBoxStats = useCallback(() => {
    const selectedCellRect = document
      .getElementById(lastSelected || cell.id)
      ?.getBoundingClientRect();

    if (selectedCellRect) {
      const top =
        selectedCellRect.top + window.scrollY + selectedCellRect.height - 6;
      const left =
        selectedCellRect.left + window.scrollX + selectedCellRect.width - 6;
      setPosition({ top, left });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, lastSelected]);

  useEffect(() => {
    setTextBoxStats();
    const handleResize = () => setTextBoxStats();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setTextBoxStats]);

  const handleDragStart = (e) => {
    // e.dataTransfer.setData("text/plain", cell.value);
    // dispatch(setDragging(true));
    dispatch(setFillerMode(true));

  };

  const handleDrag = (e) => {
    // console.log(e);
  };
  const handleDragEnd = (e) => {
    // console.log(e);
    console.log(e.target);
    // dispatch(setDragging(false));
    dispatch(setFillerMode(false));
  };

  return (
    <Container top={position.top} left={position.left}>
      <FillerObject
        onMouseDown={handleDragStart}
        onDrag={handleDrag}
        // onMouseUp={handleDragEnd}
        draggable={false}
        ref={fillerRef}
      />
    </Container>
  );
};

export default Filler;
