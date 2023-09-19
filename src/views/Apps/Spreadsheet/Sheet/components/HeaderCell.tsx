import styled from "@emotion/styled";
import { HeaderItem } from "../styles";
import React, { Dispatch, useRef } from "react";
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
import useEventHandler from "../hooks/useEventHandler";
import { Action, State } from "../types";
import { TableCellProps } from "@mui/material";

type HeaderItemProps = {
  dimension: Dimension;
  dimensionsize: number;
  children?: JSX.Element | JSX.Element[];
} & TableCellProps;

const HeaderItemComponent = styled(HeaderItem)(
  ({ dimension, dimensionsize }: HeaderItemProps) => ({
    cursor: dimension === Dimension.ROW ? "e-resize" : "s-resize",
    position: "relative",
    width: dimension === Dimension.ROW ? "1.75rem" : dimensionsize + "px",
    "&:active": {
      backgroundColor: "#555",
      color: "#FFFFFF",
    },
    height: dimension === Dimension.ROW ? dimensionsize + "px" : "initial",
  })
);

type ResizerProps = {
  dimension: Dimension;
};

const ResizerComponent = styled.div(({ dimension }: ResizerProps) => ({
  position: "absolute",
  [dimension === Dimension.ROW ? "bottom" : "top"]: 0,
  [dimension === Dimension.ROW ? "right" : "right"]: 0,
  height: dimension === Dimension.ROW ? "0.5rem" : "100%",
  width: dimension === Dimension.ROW ? "100%" : "0.5rem",
  cursor: dimension === Dimension.ROW ? "row-resize" : "col-resize",
  [dimension === Dimension.ROW
    ? "borderBottom"
    : "borderRight"]: `1px solid #aaa`,
}));

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
  id: string | number;
  dimension: Dimension;
};

const HeaderCell = ({ state, dispatch, id, dimension }: Props): JSX.Element => {
  const eventHandler = useEventHandler();
  const headerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef<number>(0);
  const selected: boolean =
    state.selectedCell[dimension] === id ||
    (dimension === Dimension.ROW
      ? state.highlighted.rows.has(Number(id))
      : state.highlighted.columns.has(String(id)));

  const handleContextMenu = (e: React.MouseEvent) =>
    eventHandler.handleContextMenu(e);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", "");
    const rect = headerRef.current?.getBoundingClientRect();
    if (rect) {
      posRef.current = dimension === Dimension.ROW ? rect.top : rect.left;
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const newSize =
      dimension === Dimension.ROW
        ? e.clientY - posRef.current
        : e.clientX - posRef.current;

    const action =
      dimension === Dimension.ROW
        ? setRowHeight(Number(id), newSize)
        : setColumnWidth(String(id), newSize);

    dispatch(action);
    dispatch(addMemento());
  };

  const handleResizerClick = (e: React.MouseEvent) => e.stopPropagation();

  const handleClick = (e: React.MouseEvent) => {
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
      dispatch(addCellsToHighlight(range as string[]));
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
        ? dispatch(setSelectedRow(String(id)))
        : dispatch(setSelectedColumn(String(id)));
    }
  };

  const resetDimension = () => {
    const defaultSize =
      dimension === Dimension.ROW
        ? state.defaultRowHeight
        : state.defaultColumnWidth;

    const action =
      dimension === Dimension.ROW
        ? setRowHeight(Number(id), defaultSize)
        : setColumnWidth(String(id), defaultSize);

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
      dimensionsize={dimensionSize}
      selected={selected}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      id={`${dimension}-${id}`}
    >
      <>{id}</>
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
