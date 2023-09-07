import styled from "@emotion/styled";
import { addMemento, setRowHeight, setSelectedRow } from "../actions";
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
  borderBottom: "1px solid #aaa",
  cursor: "row-resize",
});

const RowHeader = ({ state, dispatch, row, onContextMenu }) => {
  const headerRef = useRef();
  const [newHeight, setNewHeight] = useState(state.content.rowHeights[row]);
  const selected = useMemo(
    () =>
      state.selectedCell.row === row || state.highlighted.rows.includes(row),
    [row, state.highlighted.rows, state.selectedCell.row]
  );
  const rowTop = useRef();

  const handleRowHeaderClick = (e, row) => {
    dispatch(setSelectedRow(row));
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", ""); // This initializes the drag operation
  };

  const handleDragEnd = (e) => {
    setNewHeight(e.clientY - rowTop.current);
  };

  useEffect(() => {
    dispatch(setRowHeight(row, newHeight));
    dispatch(addMemento());
  }, [dispatch, newHeight, row]);

  const resetHeight = () => dispatch(setRowHeight(row, 24));

  return (
    <RowHeaderItem
      onClick={(e) => handleRowHeaderClick(e, row)}
      selected={selected}
      onContextMenu={onContextMenu}
      height={`${Math.floor(state.content.rowHeights[row])}px`}
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
