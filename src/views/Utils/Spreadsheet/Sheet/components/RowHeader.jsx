import styled from "@emotion/styled";
import {
  addCellsToHighlight,
  addMemento,
  highlightCells,
  setRowHeight,
  setSelectedRow,
} from "../actions";
import { HeaderItem } from "../styles";
import { useRef } from "react";
import { SheetConfig } from "../constants";
import CellRange from "../models/CellRange";
import EventHandler from "../eventHandlers/EventHandler";

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
  const rowTop = useRef();
  const selected =
    state.selectedCell.row === row || state.highlighted.rows.includes(row);

  const handleClick = (e) => {
    e.stopPropagation();
    if (EventHandler.isCtrlKeyPressed(e)) {
      const range = CellRange.createFlat(
        `${SheetConfig.COLUMNS[0]}${row}`,
        `${SheetConfig.COLUMNS[state.maxColumns - 1]}${row}`
      ).cellIds;
      dispatch(addCellsToHighlight(range));
    } else if (e.shiftKey) {
      dispatch(
        highlightCells(
          `${SheetConfig.COLUMNS[0]}${state.selectedCell.row}`,
          `${SheetConfig.COLUMNS[state.maxColumns - 1]}${row}`
        )
      );
    } else {
      dispatch(setSelectedRow(row));
    }
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", "");
    rowTop.current = headerRef.current?.getBoundingClientRect().top;
  };

  const handleDragEnd = (e) => {
    dispatch(setRowHeight(row, e.clientY - rowTop.current));
    dispatch(addMemento());
  };

  const resetHeight = () => {
    dispatch(setRowHeight(row, state.defaultRowHeight));
    dispatch(addMemento());
  };

  return (
    <RowHeaderItem
      selected={selected}
      onContextMenu={onContextMenu}
      height={`${Math.round(state.content.rowHeights[row])}px`}
      onMouseDown={handleClick}
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
