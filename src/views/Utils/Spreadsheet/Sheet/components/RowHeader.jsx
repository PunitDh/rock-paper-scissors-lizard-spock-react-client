import styled from "@emotion/styled";
import {
  addMemento,
  setHighlightRowAnchor,
  setHovered,
  setRowHeight,
  setSelectedRow,
} from "../actions";
import { HeaderItem } from "../styles";
import { useEffect, useMemo, useRef, useState } from "react";

const RowHeaderItem = styled(HeaderItem)(({ height }) => ({
  width: "3%",
  cursor: "e-resize",
  position: "relative",
  "&:active": {
    backgroundColor: "#555",
    color: "white",
  },
  height,
}));

const Resizer = styled.div({
  position: "absolute",
  bottom: 0,
  right: 0,
  width: "100%",
  height: "0.5rem",
  borderBottom: "1px solid #aaa",
  cursor: "row-resize",
});

const RowHeader = ({ state, dispatch, row, onContextMenu }) => {
  const headerRef = useRef();
  const rowHeight = useMemo(
    () =>
      (state.content.rowHeights && state.content.rowHeights[row]) ||
      state.defaultRowHeight,
    [row, state.content.rowHeights, state.defaultRowHeight]
  );
  const [newHeight, setNewHeight] = useState(rowHeight);
  const selected = useMemo(
    () =>
      state.selectedCell.row === row || state.highlighted.rows.includes(row),
    [row, state.highlighted.rows, state.selectedCell.row]
  );
  const rowTop = useRef();

  const handleRowHeaderClick = () => dispatch(setSelectedRow(row));

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", "");
    rowTop.current = headerRef.current?.getBoundingClientRect().top;
  };

  const handleDragEnd = (e) => setNewHeight(e.clientY - rowTop.current);

  useEffect(() => {
    dispatch(setRowHeight(row, newHeight));
    dispatch(addMemento());
  }, [dispatch, newHeight, row]);

  const resetHeight = () => dispatch(setRowHeight(row, 24));

  const handleMouseDown = () => {
    dispatch(setHighlightRowAnchor(row));
  };
  const handleMouseMove = (e) => {
  };
  const handleMouseUp = (e) => {
  };
  const handleMouseOver = (e) => {
    dispatch(setHovered(row));
  };

  return (
    <RowHeaderItem
      selected={selected}
      onContextMenu={onContextMenu}
      height={`${Math.round(rowHeight)}px`}
      onMouseDown={handleRowHeaderClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseOver={handleMouseOver}
      id={`row-${row}`}
      ref={headerRef}
    >
      {row}
      <Resizer
        draggable={true}
        onDragStart={handleDragStart}
        onDragEndCapture={handleDragEnd}
        onDoubleClick={resetHeight}
      />
    </RowHeaderItem>
  );
};

export default RowHeader;
