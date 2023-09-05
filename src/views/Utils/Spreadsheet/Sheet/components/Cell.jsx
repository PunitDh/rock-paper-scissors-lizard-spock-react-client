import { useEffect, useMemo, useRef } from "react";
import { CellInput, Item } from "../../styles";
import {
  resetHighlight,
  setContent,
  highlightCells,
  selectCell,
  setHighlightAnchor,
  setHighlightCurrent,
  setHovered,
  setEditMode,
  setMenuAnchorElement,
  recalculateFormulae,
  setFormulaMode,
} from "../actions";
import { KeyboardEvent, MouseButton, SheetConfig } from "../../constants";
import { getId } from "../utils/cellUtils";

const Cell = ({ id, state, dispatch }) => {
  const containerRef = useRef();
  const textRef = useRef();
  const { row, columnCharCode } = useMemo(() => getId(id), [id]);
  const isSelected =
    id === state.selected.cell || state.highlighted.cells.includes(id);

  const value =
    state.editMode && id === state.selected.cell
      ? state.content[id]?.formula
      : state.content[id]?.value;

  const focusTextArea = () => textRef.current.focus();

  function typeInTextField(
    newText,
    el = document.getElementById(state.selected.cell + "-input")
  ) {
    if (!el) return;
    const [start, end] = [el.selectionStart, el.selectionEnd];
    el.focus();
    el.setRangeText(newText, start, end, "end");
    return el.value;
  }

  const handleClick = (e) => {
    if (e.button === MouseButton.LEFT_CLICK) {
      if (state.formulaMode && id !== state.selected.cell) {
        const value = typeInTextField(id);
        dispatch(setContent(state.selected.cell, value));
      } else {
        if (!state.mouseDown) dispatch(resetHighlight());
        dispatch(selectCell(id));
      }
    }
  };

  const handleFocus = (e) => {
    // if (!state.mouseDown) dispatch(resetHighlighted());
    dispatch(setEditMode(true));
  };

  useEffect(() => {
    if (state.selected.cell === id) {
      setTimeout(() => {
        textRef.current?.focus();
        dispatch(setEditMode(true));
      }, 0);
    }
  }, [state.selected.cell, id]);

  useEffect(() => {
    if (state.editMode && id === state.selected.cell) {
      textRef.current.focus();
    }
  }, [id, state.editMode, state.selected.cell]);

  const handleChange = (e) => {
    dispatch(setContent(id, e.target.value));
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case KeyboardEvent.BACKSPACE:
        state.editMode && e.stopPropagation();
        break;
      case KeyboardEvent.ENTER:
        dispatch(setContent(id, e.target.value));
        dispatch(recalculateFormulae());
        dispatch(setFormulaMode(false));
        break;
      default:
        break;
    }
  };

  const handleBlur = (e) => {
    dispatch(setEditMode(false));
    !state.formulaMode && dispatch(recalculateFormulae());
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
      if (!state.mouseDown && !state.shiftKey) dispatch(resetHighlight());
      // dispatch(selectCell(id));
      dispatch(setHighlightAnchor(id));
      dispatch(highlightCells(id, id));
    }
  };

  const handleMouseMove = () => {
    dispatch(setHighlightCurrent(id));
  };

  const handleDoubleClick = () => {
    if (!state.mouseDown) dispatch(resetHighlight());
    dispatch(selectCell(id));
    dispatch(setEditMode(true));
    focusTextArea();
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    dispatch(setMenuAnchorElement(e.currentTarget));
  };

  return (
    <Item
      ref={containerRef}
      onClick={handleClick}
      selected={isSelected}
      onMouseOver={handleMouseOver}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      id={id}
      justifyContent={
        isNaN(state.content[id]?.value) ? "flex-start" : "flex-end"
      }
    >
      {isSelected ? (
        <CellInput
          ref={textRef}
          onFocus={handleFocus}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          type="text"
          tabIndex={row * SheetConfig.MAX_ROWS + (columnCharCode - 65)}
          value={value}
          id={`${id}-input`}
        />
      ) : (
        state.content[id]?.value
      )}
    </Item>
  );
};

export default Cell;
