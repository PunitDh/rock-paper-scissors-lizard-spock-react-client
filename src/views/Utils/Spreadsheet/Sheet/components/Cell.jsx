import { useEffect, useMemo, useRef, useState } from "react";
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
} from "../actions";
import { KeyboardEvent, MouseButton, SheetConfig } from "../../constants";
import { getId, typeInTextField } from "../utils/cellUtils";

const Cell = ({ id, state, dispatch }) => {
  const containerRef = useRef();
  const textRef = useRef();
  const { row, columnCharCode } = useMemo(() => getId(id), [id]);
  // const [isSelected, setIsSelected] = useState(
  //   id === state.selected.cell || state.highlighted.cells.includes(id)
  // );
  const isSelected =
    id === state.selected.cell || state.highlighted.cells.includes(id);
  const [selectInputBox, setSelectInputBox] = useState(false);

  const isLastHighlighted =
    id === state.highlighted.cells[state.highlighted.cells.length - 1];

  const value =
    state.editMode && id === state.selected.cell
      ? state.content[id]?.formula
      : state.content[id]?.value;

  const focusTextArea = () => textRef.current?.focus();

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
        setSelectInputBox(true);
      }
    }
  };

  const handleFocus = (e) => {
    // if (!state.mouseDown) dispatch(resetHighlighted());
    dispatch(setEditMode(true));
  };

  useEffect(() => {
    if (state.selected.cell === id) {
      containerRef.current?.focus();
      setTimeout(() => {
        textRef.current?.focus();
        dispatch(setEditMode(true));
      }, 0);
    }
  }, [state.selected.cell, id]);

  useEffect(() => {
    if (state.editMode && id === state.selected.cell) {
      textRef.current?.focus();
    }
  }, [id, state.editMode, state.selected.cell]);

  const handleChange = (e) => {
    dispatch(setContent(id, e.target.value));
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case KeyboardEvent.ESCAPE:
        setSelectInputBox(false);
        containerRef.current?.focus();
        break;
      case KeyboardEvent.BACKSPACE:
        state.editMode && e.stopPropagation();
        break;
      case KeyboardEvent.ENTER:
        dispatch(setContent(id, e.target.value));
        dispatch(recalculateFormulae());
        dispatch(setFormulaMode(false));
        dispatch(highlightCells(id));
        setSelectInputBox(false);
        break;
      case KeyboardEvent.LOWERCASE_A:
        if (state.commandKey) {
          e.stopPropagation();
        }
        break;
      // case KeyboardEvent.ARROW_DOWN:
      // case KeyboardEvent.ARROW_UP:
      case KeyboardEvent.ARROW_LEFT:
      case KeyboardEvent.ARROW_RIGHT:
        if (selectInputBox) e.stopPropagation();
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
    // TODO
  };

  const handleDragEnd = (e) => {
    // TODO
  };

  return (
    <Item
      colSpan={1}
      ref={containerRef}
      onClick={handleClick}
      selected={isSelected}
      onMouseOver={handleMouseOver}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      id={id}
      tabIndex={row * state.maxRows + (columnCharCode - 65)}
      textAlign={isNaN(state.content[id]?.value) ? "left" : "right"}
      width={`${Math.floor((100 - 3) / state.maxColumns)}%`}
    >
      {id === state.selected.cell && selectInputBox ? (
        <>
          <CellInput
            ref={textRef}
            onFocus={handleFocus}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            type="text"
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
