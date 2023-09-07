import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CellInput, Item } from "../styles";
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
  setFormulaMode,
  addCellsToHighlight,
} from "../actions";
import { KeyEvent, MouseButton } from "../constants";
import { getCtrlKey, getId, typeInTextField } from "../utils/cellUtils";

const Cell = ({ id, state, dispatch }) => {
  const containerRef = useRef();
  const textRef = useRef();
  const { row, columnCharCode } = useMemo(() => getId(id), [id]);

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
              const value = typeInTextField("input-text", id);
              dispatch(setContent(state.selectedCell.id, value));
            } else {
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
            setSelectInputBox(true);
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

  const handleFocus = (e) => {
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
    e.preventDefault();
    dispatch(setContent(id, e.target.value));
  };

  const handleKeyDown = useCallback(
    (e) => {
      switch (e.key) {
        case KeyEvent.SHIFT:
          dispatch(setHighlightAnchor(id));
          break;
        case KeyEvent.ESCAPE:
          setSelectInputBox(false);
          containerRef.current?.focus();
          break;
        case KeyEvent.BACKSPACE:
          state.editMode && e.stopPropagation();
          break;
        case KeyEvent.ENTER:
          dispatch(setContent(id, e.target.value));
          // dispatch(recalculateFormulae());
          dispatch(setFormulaMode(false));
          dispatch(highlightCells(id));
          setSelectInputBox(false);
          break;
        case KeyEvent.LOWERCASE_A:
          if (getCtrlKey(e)) {
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
    },
    [dispatch, id, selectInputBox, state.editMode]
  );

  const handleBlur = (e) => {
    dispatch(setEditMode(false));
    // !state.formulaMode && dispatch(recalculateFormulae());
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
      if (!state.mouseDown && !e.shiftKey && !getCtrlKey(e))
        dispatch(resetHighlight());
      // dispatch(selectCell(id));
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
    focusTextArea();
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    dispatch(setMenuAnchorElement(e.currentTarget));
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
      textalign={isNaN(state.content[id]?.value) ? "left" : "right"}
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
            suppressHydrationWarning={true}
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
