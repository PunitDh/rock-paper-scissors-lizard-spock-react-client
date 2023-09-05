import { useEffect, useMemo, useRef, useState } from "react";
import { CellDiv, CellInput, DivItem, Item } from "../../styles";
import {
  resetHighlighted,
  setContent,
  highlightCells,
  selectCell,
  setHighlightedAnchor,
  setHighlightedCurrent,
  setHovered,
  setEditMode,
  setMenuAnchorElement,
  recalculateFormulae,
} from "../actions";
import { KeyboardEvent, MouseButton, SheetConfig } from "../../constants";
import { getId } from "../utils/cellUtils";

const Cell = ({ id, state, dispatch }) => {
  const containerRef = useRef();
  const [focused, setFocused] = useState(false);
  const textRef = useRef();
  const { row, columnCharCode } = useMemo(() => getId(id), [id]);

  // const focusTextArea = () =>
  //   setTimeout(function () {
  //     ref.current.focus();
  //   }, 0);

  const focusTextArea = () => textRef.current.focus();

  const handleClick = (e) => {
    if (e.button === MouseButton.LEFT_CLICK) {
      if (!state.mouseDown) dispatch(resetHighlighted());
      dispatch(selectCell(id));
    }
  };

  const handleFocus = (e) => {
    // if (!state.mouseDown) dispatch(resetHighlighted());
    setFocused(true);
  };

  // useEffect(() => {
  //   if (id === state.selected.cell && !focused) {
  //     focusTextArea();
  //   } else {
  //     ref.current.blur();
  //     if (state.editMode) dispatch(setEditMode(false));
  //   }
  // }, [state.selected.cell]);

  useEffect(() => {
    if (state.selected.cell === id) {
      setTimeout(() => textRef.current?.focus(), 0);
    }
  }, [state.selected.cell, id]);

  useEffect(() => {
    if (state.editMode && id === state.selected.cell) {
      textRef.current.focus();
    }
    // } else {
    //   ref.current.blur();
    // }
  }, [state.editMode]);

  const handleChange = (e) => {
    dispatch(setContent({ cell: id, value: e.target.value }));
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case KeyboardEvent.BACKSPACE:
        state.editMode && e.stopPropagation();
        break;
      case KeyboardEvent.ENTER:
        dispatch(setContent({ cell: id, value: e.target.value }));
        dispatch(recalculateFormulae());
        // setCellContent(state.content[id]?.value);
        break;
      default:
        break;
    }
  };

  const handleBlur = (e) => {
    dispatch(setEditMode(false));
    setFocused(false);
    dispatch(recalculateFormulae());
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
      selected={
        id === state.selected.cell || state.highlighted.cells.includes(id)
      }
      onMouseOver={handleMouseOver}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      id={id}
    >
      <CellInput
        ref={textRef}
        onFocus={handleFocus}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        type="text"
        tabIndex={row * SheetConfig.MAX_ROWS + (columnCharCode - 65)}
        value={
          state.editMode && id === state.selected.cell
            ? state.content[id]?.formula
            : state.content[id]?.value
        }
      />
    </Item>
  );
};

export default Cell;
