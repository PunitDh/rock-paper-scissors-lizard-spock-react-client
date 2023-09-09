import { useCallback, useMemo, useRef } from "react";
import { Item } from "../styles";
import {
  resetHighlight,
  setContent,
  highlightCells,
  selectCell,
  setHighlightCellAnchor,
  setHovered,
  setEditMode,
  openContextMenu,
  addCellsToHighlight,
  updateReferenceCells,
  setFormulaMode,
  recalculateFormulae,
} from "../actions";
import { MouseButton } from "../constants";
import { isCtrlKeyPressed, addCellToFocusedBox } from "../utils/cellUtils";

const Cell = ({ id, state, dispatch }) => {
  const containerRef = useRef();
  const { row, columnCharCode } = useMemo(
    () => state.selectedCell,
    [state.selectedCell]
  );

  const isSelected = useMemo(
    () => id === state.selectedCell.id || state.highlighted.cells.includes(id),
    [id, state.highlighted.cells, state.selectedCell.id]
  );

  const isFormulaHighLighted = useMemo(
    () => state.formulaHighlighted.includes(id),
    [id, state.formulaHighlighted]
  );

  const isLastHighlighted =
    id === state.highlighted.cells[state.highlighted.cells.length - 1];

  const handleClick = useCallback(
    (e) => {
      const isLeftClick = e.button === MouseButton.LEFT_CLICK;
      if (!isLeftClick) return;

      const isLastValueClosedBracket = /(\))$/gi.test(
        state.content[state.selectedCell.id]?.formula
      );
      const isLastValueOperation = /[+-/*^:,]$/gi.test(
        state.content[state.selectedCell.id]?.formula
      );
      const isShiftOrCtrlPressed = e.shiftKey || isCtrlKeyPressed(e);
      const isSameCellSelected = id === state.selectedCell.id;

      const addCellsToFormula = () => {
        const value = addCellToFocusedBox(state, id, !isCtrlKeyPressed(e));
        dispatch(setContent(state.selectedCell.id, value));
        dispatch(
          updateReferenceCells(
            state.selectedCell.id,
            [id],
            !isCtrlKeyPressed(e)
          )
        );
      };

      if (state.isFormulaModeActive) {
        if (
          !isSameCellSelected &&
          (!isLastValueClosedBracket || isLastValueOperation)
        ) {
          addCellsToFormula();
        } else {
          dispatch(setFormulaMode(false));
          dispatch(recalculateFormulae());
          dispatch(resetHighlight());
          dispatch(selectCell(id));
          dispatch(highlightCells(id));
        }
      } else {
        if (isShiftOrCtrlPressed) {
          if (e.shiftKey) {
            dispatch(highlightCells(state.selectedCell.id, id));
          }
          if (isCtrlKeyPressed(e)) {
            dispatch(addCellsToHighlight([id]));
          }
          return;
        }
        if (!state.mouseDown) dispatch(resetHighlight());
        dispatch(selectCell(id));
        dispatch(highlightCells(id));
      }
    },
    [dispatch, id, state]
  );

  const handleMouseOver = (e) => {
    dispatch(setHovered(id));
    if (state.mouseDown) {
      dispatch(highlightCells(id));
    }
  };

  const handleMouseDown = (e) => {
    if (e.button === MouseButton.LEFT_CLICK) {
      // dispatch(selectCell(id));
      if (!state.mouseDown && !e.shiftKey && !isCtrlKeyPressed(e))
        dispatch(resetHighlight());
      dispatch(setHighlightCellAnchor(id));
      if (!isCtrlKeyPressed(e)) dispatch(highlightCells(id));
    }
  };

  const handleDoubleClick = () => {
    if (!state.mouseDown) dispatch(resetHighlight());
    dispatch(selectCell(id));
    dispatch(setEditMode(true));
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    dispatch(openContextMenu(e.currentTarget));
  };

  return (
    <Item
      colSpan={1}
      ref={containerRef}
      onClick={handleClick}
      selected={isSelected}
      formulacell={Number(isFormulaHighLighted)}
      onMouseOver={handleMouseOver}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      id={id}
      tabIndex={row * state.maxRows + (columnCharCode - 65)}
      textalign={isNaN(state.content[id]?.value) ? "left" : "right"}
      width={`${Math.floor((100 - 3) / state.maxColumns)}%`}
      formatting={state.content[id]?.formatting}
    >
      {state.content[id]?.value}
      {/* {id === state.selectedCell.id && inputBoxFocused ? (
      ) : (
        
      )} */}
    </Item>
  );
};

export default Cell;
