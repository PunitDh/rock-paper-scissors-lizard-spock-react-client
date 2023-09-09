import React, { useCallback, useRef } from "react";
import { CellDiv, DivItem } from "../styles";
import {
  resetHighlight,
  setCellContent,
  highlightCells,
  selectCell,
  setHighlightCellAnchor,
  setHovered,
  openContextMenu,
} from "../actions";
import { KeyEvent, MouseButton } from "../constants";

const Cell2 = ({ id, state, dispatch }) => {
  const containerRef = useRef();
  const cellContentRef = useRef(state.content.data[id]?.value);

  const textRef = useCallback(
    (node) => {
      if (node) {
        const focusInListener = node.addEventListener("focusin", () => {
          if (state.content.data[id]?.formula) {
            // setTimeout(() => setCellContent(state.content.data[id]?.formula), 0);
            cellContentRef.current = state.content.data[id]?.formula;
          }
        });

        const focusOutListener = node.addEventListener("focusout", () => {
          dispatch(setCellContent(id, cellContentRef.current));
          // dispatch(recalculateFormulae());
          cellContentRef.current = state.content.data[id]?.value;
        });

        if (state.selectedCell.id === id) {
          setTimeout(() => node.focus(), 0);
        }

        return () => {
          if (node) {
            node.removeEventListener("focusin", focusInListener);
            node.removeEventListener("focusout", focusOutListener);
          }
        };
      }
    },
    [state.selectedCell.id]
  );

  const handleClick = (e) => {
    if (e.button === MouseButton.LEFT_CLICK) {
      if (!state.mouseDown) dispatch(resetHighlight());
      dispatch(selectCell(id));
    }
  };

  const handleInput = (e) => {
    cellContentRef.current = e.target.textContent; // Using a ref to avoid re-renders
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case KeyEvent.BACKSPACE:
        state.editMode && e.stopPropagation();
        break;
      case KeyEvent.ENTER:
        dispatch(setCellContent(id, cellContentRef.current));
        // dispatch(recalculateFormulae());
        // setCellContent(state.content.data[id]?.value);
        break;
      default:
        break;
    }
  };

  const handleMouseOver = (e) => {
    dispatch(setHovered(id));
    if (state.mouseDown) {
      dispatch(highlightCells(id));
    }
  };

  const handleMouseDown = (e) => {
    if (e.button === MouseButton.LEFT_CLICK) {
      // e.preventDefault();
      if (!state.mouseDown && !e.shiftKey) dispatch(resetHighlight());
      dispatch(selectCell(id));
      dispatch(setHighlightCellAnchor(id));
      dispatch(highlightCells(id));
    }
  };

  const handleDoubleClick = () => {
    if (!state.mouseDown) dispatch(resetHighlight());
    dispatch(selectCell(id));
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    dispatch(openContextMenu(e.currentTarget));
  };

  return (
    <DivItem
      ref={containerRef}
      onClick={handleClick}
      selected={
        id === state.selectedCell.id || state.highlighted.cells.includes(id)
      }
      onMouseOver={handleMouseOver}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      onKeyDown={handleKeyDown}
      id={id}
    >
      <CellDiv
        ref={textRef}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        contentEditable={true}
        suppressContentEditableWarning={true}
      >
        {id === state.selectedCell.id
          ? state.content.data[id]?.formula || state.content.data[id]?.value
          : state.content.data[id]?.value}
      </CellDiv>
    </DivItem>
  );
};

export default Cell2;
