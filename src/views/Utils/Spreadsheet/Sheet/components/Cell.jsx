import { useEffect, useMemo, useRef } from "react";
import { CellInput, Item, Resize } from "../../styles";
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
  setInputText,
} from "../actions";
import { KeyboardEvent, MouseButton, SheetConfig } from "../../constants";
import { getId, typeInTextField } from "../utils/cellUtils";

const Cell = ({ id, state, dispatch }) => {
  const containerRef = useRef();
  const textRef = useRef();
  const { row, columnCharCode } = useMemo(() => getId(id), [id]);
  const isSelected =
    id === state.selected.cell || state.highlighted.cells.includes(id);
  const isLastHighlighted =
    id === state.highlighted.cells[state.highlighted.cells.length - 1];

  const value =
    state.editMode && id === state.selected.cell
      ? state.content[id]?.formula
      : state.content[id]?.value;

  const focusTextArea = () => textRef.current.focus();

  const handleClick = (e) => {
    if (e.button === MouseButton.LEFT_CLICK) {
      const formulaMode = state.formulaMode && id !== state.selected.cell;
      if (formulaMode) {
        if (state.inputTextFocused) {
          const value = typeInTextField("input-text", id);
          dispatch(setContent(state.selected.cell, value));
        } else {
          const value = typeInTextField(`${state.selected.cell}-input`, id);
          dispatch(setContent(state.selected.cell, value));
        }
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
        dispatch(highlightCells(id));
        console.log(state.highlighted.cells);
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

  const handleDragStart = (e) => {
    console.log("drag start");
  };

  const handleDragEnd = (e) => {
    console.log("drag end");
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
      tabIndex={row * SheetConfig.MAX_ROWS + (columnCharCode - 65)}
      justifyContent={
        isNaN(state.content[id]?.value) ? "flex-start" : "flex-end"
      }
    >
      {id === state.selected.cell ? (
        <>
          <CellInput
            ref={textRef}
            onFocus={handleFocus}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            type="text"
            // tabIndex={row * SheetConfig.MAX_ROWS + (columnCharCode - 65)}
            value={value}
            id={`${id}-input`}
            autoComplete="off"
          />
          {isLastHighlighted &&
            // <Resize draggable={true} onDragStart={handleDragStart} />
            null}
        </>
      ) : (
        state.content[id]?.value
      )}
    </Item>
  );
};

export default Cell;
