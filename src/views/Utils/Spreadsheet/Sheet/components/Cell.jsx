import { useEffect, useMemo, useRef, useState } from "react";
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
  addCellsToHighlight,
} from "../actions";
import { KeyEvent, MouseButton } from "../../constants";
import { getId, typeInTextField } from "../utils/cellUtils";

const Cell = ({ id, state, dispatch }) => {
  const containerRef = useRef();
  const textRef = useRef();
  const { row, columnCharCode } = useMemo(() => getId(id), [id]);
  // const [isSelected, setIsSelected] = useState(
  //   id === state.selectedCell.id || state.highlighted.cells.includes(id)
  // );
  const isSelected =
    id === state.selectedCell.id || state.highlighted.cells.includes(id);
  const [selectInputBox, setSelectInputBox] = useState(false);

  const isLastHighlighted =
    id === state.highlighted.cells[state.highlighted.cells.length - 1];

  const value =
    state.editMode && id === state.selectedCell.id
      ? state.content[id]?.formula
      : state.content[id]?.value;

  const focusTextArea = () => textRef.current?.focus();

  const handleClick = (e) => {
    if (e.button === MouseButton.LEFT_CLICK) {
      if (state.shiftKey || state.commandKey) {
        state.shiftKey && dispatch(highlightCells(state.selectedCell.id, id));
        state.commandKey && dispatch(addCellsToHighlight([id]));
      } else {
        const formulaMode = state.formulaMode && id !== state.selectedCell.id;
        if (formulaMode) {
          if (state.inputTextFocused) {
            const value = typeInTextField("input-text", id);
            dispatch(setContent(state.selectedCell.id, value));
          } else {
            const value = typeInTextField(`${state.selectedCell.id}-input`, id);
            dispatch(setContent(state.selectedCell.id, value));
          }
        } else {
          if (!state.mouseDown) dispatch(resetHighlight());
          dispatch(selectCell(id));
          console.log(
            "It's coming from the click else",
            state.highlighted.cells
          );
          dispatch(highlightCells(id));
          setSelectInputBox(true);
        }
      }
    }
  };

  const handleFocus = (e) => {
    // if (!state.mouseDown) dispatch(resetHighlighted());
    dispatch(setEditMode(true));
  };

  useEffect(() => {
    if (state.selectedCell.id === id) {
      containerRef.current?.focus();
      setTimeout(() => {
        textRef.current?.focus();
        dispatch(setEditMode(true));
      }, 0);
    }
  }, [state.selectedCell.id, id]);

  useEffect(() => {
    if (state.editMode && id === state.selectedCell.id) {
      textRef.current?.focus();
    }
  }, [id, state.editMode, state.selectedCell.id]);

  const handleChange = (e) => {
    dispatch(setContent(id, e.target.value));
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case KeyEvent.ESCAPE:
        setSelectInputBox(false);
        containerRef.current?.focus();
        break;
      case KeyEvent.BACKSPACE:
        state.editMode && e.stopPropagation();
        break;
      case KeyEvent.ENTER:
        dispatch(setContent(id, e.target.value));
        dispatch(recalculateFormulae());
        dispatch(setFormulaMode(false));
        dispatch(highlightCells(id));
        setSelectInputBox(false);
        break;
      case KeyEvent.LOWERCASE_A:
        if (state.commandKey) {
          e.stopPropagation();
        }
        break;
      // case KeyboardEvent.ARROW_DOWN:
      // case KeyboardEvent.ARROW_UP:
      case KeyEvent.ARROW_LEFT:
      case KeyEvent.ARROW_RIGHT:
        if (selectInputBox && textRef.current?.value.length > 0)
          e.stopPropagation();
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
      dispatch(highlightCells(id));
    }
  };

  const handleMouseDown = (e) => {
    if (e.button === MouseButton.LEFT_CLICK) {
      // e.preventDefault();
      if (!state.mouseDown && !state.shiftKey && !state.commandKey)
        dispatch(resetHighlight());
      // dispatch(selectCell(id));
      dispatch(setHighlightAnchor(id));
      if (!state.commandKey) dispatch(highlightCells(id));
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

  const handleCellFocus = (e) => {
    // console.log("focused", id);
    // containerRef.current?.click();
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
      onFocus={handleCellFocus}
      id={id}
      tabIndex={row * state.maxRows + (columnCharCode - 65)}
      textAlign={isNaN(state.content[id]?.value) ? "left" : "right"}
      width={`${Math.floor((100 - 3) / state.maxColumns)}%`}
    >
      {id === state.selectedCell.id && selectInputBox ? (
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
