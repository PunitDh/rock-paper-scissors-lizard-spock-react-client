import React, { useCallback, useRef, useState } from "react";
import { CellDiv, DivItem } from "../../styles";
import {
  resetHighlighted,
  setContent,
  highlightCells,
  selectCell,
  setHighlightedAnchor,
  setHighlightedCurrent,
  setHovered,
  setMenuAnchorElement,
  recalculateFormulae,
} from "../actions";
import { KeyboardEvent, MouseButton } from "../../constants";

const Cell2 = ({ id, state, dispatch }) => {
  const containerRef = useRef();
  const cellContentRef = useRef(state.content[id]?.value);

  const textRef = useCallback((node) => {
    if (node) {
      const focusInListener = node.addEventListener("focusin", () => {
        if (state.content[id]?.formula) {
          // setTimeout(() => setCellContent(state.content[id]?.formula), 0);
          cellContentRef.current = state.content[id]?.formula;
        }
      });

      const focusOutListener = node.addEventListener("focusout", () => {
        dispatch(setContent({ cell: id, value: cellContentRef.current }));
        dispatch(recalculateFormulae());
        cellContentRef.current = state.content[id]?.value;
        setTimeout(() => console.log(state.content[id]), 0);
      });

      return () => {
        if (node) {
          node.removeEventListener("focusin", focusInListener);
          node.removeEventListener("focusout", focusOutListener);
        }
      };
    }
  }, []);

  const handleClick = (e) => {
    if (e.button === MouseButton.LEFT_CLICK) {
      if (!state.mouseDown) dispatch(resetHighlighted());
      dispatch(selectCell(id));
    }
  };

  const handleInput = (e) => {
    cellContentRef.current = e.target.textContent; // Using a ref to avoid re-renders
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case KeyboardEvent.BACKSPACE:
        state.editMode && e.stopPropagation();
        break;
      case KeyboardEvent.ENTER:
        dispatch(setContent({ cell: id, value: cellContentRef.current }));
        dispatch(recalculateFormulae());
        // setCellContent(state.content[id]?.value);
        break;
      default:
        break;
    }
  };

  const handleMouseOver = (e) => {
    dispatch(setHovered(id));
    if (state.mouseDown) {
      dispatch(highlightCells(id, id));
    }
  };

  const handleMouseDown = (e) => {
    if (e.button === MouseButton.LEFT_CLICK) {
      // e.preventDefault();
      if (!state.mouseDown && !state.shiftKey) dispatch(resetHighlighted());
      dispatch(selectCell(id));
      dispatch(setHighlightedAnchor(id));
      dispatch(highlightCells(id, id));
    }
  };

  const handleMouseMove = () => {
    dispatch(setHighlightedCurrent(id));
  };

  const handleDoubleClick = () => {
    if (!state.mouseDown) dispatch(resetHighlighted());
    dispatch(selectCell(id));
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    dispatch(setMenuAnchorElement(e.currentTarget));
  };

  return (
    <DivItem
      ref={containerRef}
      onClick={handleClick}
      selected={
        id === state.selected.cell || state.highlighted.cells.includes(id)
      }
      onMouseOver={handleMouseOver}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
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
        {id === state.selected.cell
          ? state.content[id]?.formula || state.content[id]?.value
          : state.content[id]?.value}
      </CellDiv>
    </DivItem>
  );
};

export default Cell2;
