import {
  addCellsToHighlight,
  addMemento,
  highlightCells,
  setColumnWidth,
  setSelectedColumn,
} from "../actions";
import { HeaderItem } from "../styles";
import styled from "@emotion/styled";
import CellRange from "../models/CellRange";
import { useRef } from "react";
import EventHandler from "../eventHandlers/EventHandler";

const ColumnHeaderItem = styled(HeaderItem)(({ width }) => ({
  cursor: "s-resize",
  position: "relative",
  width,
  "&:active": {
    backgroundColor: "#555",
    color: "white",
  },
}));

const Resizer = styled.div({
  position: "absolute",
  top: 0,
  right: 0,
  height: "100%",
  width: "0.5rem",
  borderRight: "1px solid #aaa",
  cursor: "col-resize",
});

const ColumnHeader = ({
  state,
  dispatch,
  column,
  onContextMenu,
  eventHandler,
}) => {
  const headerRef = useRef();
  const columnLeft = useRef();
  const selected =
    state.selectedCell.column === column ||
    state.highlighted.columns.includes(column);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", "");
    columnLeft.current = headerRef.current?.getBoundingClientRect().left;
  };

  const handleDragEnd = (e) => {
    dispatch(setColumnWidth(column, e.clientX - columnLeft.current));
    dispatch(addMemento());
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (eventHandler.isCtrlKeyPressed(e)) {
      const range = CellRange.createFlat(
        `${column}1`,
        `${column}${state.maxRows}`
      ).cellIds;
      dispatch(addCellsToHighlight(range));
    } else if (e.shiftKey) {
      dispatch(
        highlightCells(
          `${state.selectedCell.column}1`,
          `${column}${state.maxRows}`
        )
      );
    } else {
      dispatch(setSelectedColumn(column));
    }
  };

  const resetWidth = () => {
    dispatch(setColumnWidth(column, state.defaultColumnWidth));
    dispatch(addMemento());
  };

  return (
    <ColumnHeaderItem
      ref={headerRef}
      colSpan={1}
      selected={selected}
      onClick={handleClick}
      width={`${Math.round(state.content.columnWidths[column])}px`}
      onContextMenu={onContextMenu}
      id={`column-${column}`}
    >
      {column}
      <Resizer
        draggable={true}
        onDragStart={handleDragStart}
        onDragEndCapture={handleDragEnd}
        onDoubleClick={resetWidth}
      />
    </ColumnHeaderItem>
  );
};

export default ColumnHeader;
