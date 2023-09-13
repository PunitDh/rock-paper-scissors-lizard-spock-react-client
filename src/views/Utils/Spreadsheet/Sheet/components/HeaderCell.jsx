import styled from "@emotion/styled";
import { HeaderItem } from "../styles";
import { useRef } from "react";
import {
  addCellsToHighlight,
  addMemento,
  highlightCells,
  setColumnWidth,
  setRowHeight,
  setSelectedColumn,
  setSelectedRow,
} from "../actions";
import { Dimension, SheetConfig } from "../constants";
import CellRange from "../models/CellRange";

const HeaderItemComponent = styled(HeaderItem)(({ dimension, size }) => ({
  cursor: dimension === Dimension.ROW ? "e-resize" : "s-resize",
  position: "relative",
  width: dimension === Dimension.ROW ? "1.75rem" : size + "px",
  "&:active": {
    backgroundColor: "#555",
    color: "#FFFFFF",
  },
  height: dimension === Dimension.ROW ? size + "px" : "initial",
}));

const ResizerComponent = styled.div(({ dimension }) => ({
  position: "absolute",
  [dimension === Dimension.ROW ? "bottom" : "top"]: 0,
  [dimension === Dimension.ROW ? "right" : "right"]: 0,
  height: dimension === Dimension.ROW ? "0.5rem" : "100%",
  width: dimension === Dimension.ROW ? "100%" : "0.5rem",
  cursor: dimension === Dimension.ROW ? "row-resize" : "col-resize",
  [dimension === Dimension.ROW
    ? "borderBottom"
    : "borderRight"]: `2px solid #aaa`,
}));

const HeaderCell = ({
  state,
  dispatch,
  id,
  onContextMenu,
  dimension,
  eventHandler,
}) => {
  const headerRef = useRef();
  const posRef = useRef();
  const selected =
    state.selectedCell[dimension] === id ||
    state.highlighted[dimension + "s"].includes(id);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", "");
    const rect = headerRef.current?.getBoundingClientRect();
    if (rect) {
      posRef.current = dimension === Dimension.ROW ? rect.top : rect.left;
    }
  };

  const handleDragEnd = (e) => {
    const newSize =
      dimension === Dimension.ROW
        ? e.clientY - posRef.current
        : e.clientX - posRef.current;

    const action =
      dimension === Dimension.ROW
        ? setRowHeight(id, newSize)
        : setColumnWidth(id, newSize);

    dispatch(action);
    dispatch(addMemento());
  };

  const handleResizerClick = (e) => e.stopPropagation();

  const handleClick = (e) => {
    e.stopPropagation();
    if (eventHandler.isCtrlKeyPressed(e)) {
      const start =
        dimension === Dimension.ROW
          ? `${SheetConfig.COLUMNS[0]}${id}`
          : `${id}1`;
      const end =
        dimension === Dimension.ROW
          ? `${SheetConfig.COLUMNS[state.maxColumns - 1]}${id}`
          : `${id}${state.maxRows}`;

      const range = CellRange.createFlat(start, end).cellIds;
      dispatch(addCellsToHighlight(range));
    } else if (e.shiftKey) {
      const start =
        dimension === Dimension.ROW
          ? `${SheetConfig.COLUMNS[0]}${state.selectedCell.row}`
          : `${state.selectedCell.column}1`;
      const end =
        dimension === Dimension.ROW
          ? `${SheetConfig.COLUMNS[state.maxColumns - 1]}${id}`
          : `${id}${state.maxRows}`;

      dispatch(highlightCells(start, end));
    } else {
      dimension === Dimension.ROW
        ? dispatch(setSelectedRow(id))
        : dispatch(setSelectedColumn(id));
    }
  };

  const resetDimension = () => {
    const defaultSize =
      dimension === Dimension.ROW
        ? state.defaultRowHeight
        : state.defaultColumnWidth;

    const action =
      dimension === Dimension.ROW
        ? setRowHeight(id, defaultSize)
        : setColumnWidth(id, defaultSize);

    dispatch(action);
    dispatch(addMemento());
  };

  const dimensionSize =
    dimension === Dimension.ROW
      ? state.content.rowHeights
        ? state.content.rowHeights[id]
        : state.defaultRowHeight
      : state.content.columnWidths
      ? state.content.columnWidths[id]
      : state.defaultColumnWidth;

  return (
    <HeaderItemComponent
      ref={headerRef}
      dimension={dimension}
      size={String(dimensionSize)}
      selected={selected}
      onClick={handleClick}
      onContextMenu={onContextMenu}
      id={`${dimension}-${id}`}
    >
      {id}
      <ResizerComponent
        draggable={true}
        dimension={dimension}
        onClick={handleResizerClick}
        onMouseDown={handleResizerClick}
        onDragStart={handleDragStart}
        onDragEndCapture={handleDragEnd}
        onDoubleClick={resetDimension}
      />
    </HeaderItemComponent>
  );
};

export default HeaderCell;
