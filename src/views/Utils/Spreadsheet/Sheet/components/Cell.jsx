import { useCallback, useMemo, useRef } from "react";
import { Item } from "../styles";
import {
  resetHighlight,
  setContent,
  highlightCells,
  selectCell,
  setHighlightAnchor,
  setHighlightCurrent,
  setHovered,
  setEditMode,
  openContextMenu,
  addCellsToHighlight,
} from "../actions";
import { MouseButton } from "../constants";
import { getCtrlKey, getId, typeInTextField } from "../utils/cellUtils";

const Cell = ({ id, state, dispatch }) => {
  const containerRef = useRef();
  const { row, columnCharCode } = useMemo(() => getId(id), [id]);

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
      if (e.button === MouseButton.LEFT_CLICK) {
        if (e.shiftKey || getCtrlKey(e)) {
          e.shiftKey && dispatch(highlightCells(state.selectedCell.id, id));
          getCtrlKey(e) && dispatch(addCellsToHighlight([id]));
        } else {
          const formulaMode = state.formulaMode && id !== state.selectedCell.id;
          if (formulaMode) {
            if (state.formulaFieldFocused) {
              const value = typeInTextField("formula-field", id);
              dispatch(setContent(state.selectedCell.id, value));
            } else {
              console.log("Herer12123");
              const value = typeInTextField(
                `${state.selectedCell.id}-input`,
                id
              );
              dispatch(setContent(state.selectedCell.id, value));
            }
          } else {
            if (!state.mouseDown) dispatch(resetHighlight());
            dispatch(selectCell(id));
            dispatch(highlightCells(id));
          }
        }
      }
    },
    [
      dispatch,
      id,
      state.formulaFieldFocused,
      state.formulaMode,
      state.mouseDown,
      state.selectedCell.id,
    ]
  );

  const handleMouseOver = (e) => {
    dispatch(setHovered(id));
    if (state.mouseDown) {
      dispatch(highlightCells(id));
    }
  };

  const handleMouseDown = (e) => {
    if (e.button === MouseButton.LEFT_CLICK) {
      if (!state.mouseDown && !e.shiftKey && !getCtrlKey(e))
        dispatch(resetHighlight());
      dispatch(setHighlightAnchor(id));
      if (!getCtrlKey(e)) dispatch(highlightCells(id));
    }
  };

  const handleMouseMove = () => {
    dispatch(setHighlightCurrent(id));
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
      formulacell={isFormulaHighLighted}
      onMouseOver={handleMouseOver}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      id={id}
      tabIndex={row * state.maxRows + (columnCharCode - 65)}
      textalign={isNaN(state.content[id]?.value) ? "left" : "right"}
      width={`${Math.floor((100 - 3) / state.maxColumns)}%`}
    >
      {state.content[id]?.value}
      {/* {id === state.selectedCell.id && inputBoxFocused ? (
      ) : (
        
      )} */}
    </Item>
  );
};

export default Cell;
