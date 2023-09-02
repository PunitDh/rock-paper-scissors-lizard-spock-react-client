import { useEffect, useRef, useState } from "react";
import { CellInput, Item } from "../styles";
import {
  resetHighlighted,
  setContent,
  setHighlightedCells,
  setSelected,
  setHighlightedAnchor,
  setHighlightedCurrent,
  setHovered,
  setEditMode,
} from "./actions";
import { MouseButton, SheetConfig } from "../constants";
import { getId } from "../utils";

const Cell = ({ id, state, dispatch }) => {
  const containerRef = useRef();
  const [focused, setFocused] = useState(false);
  const ref = useRef();
  const { row, columnCharCode } = getId(id);

  // const focusTextArea = () =>
  //   setTimeout(function () {
  //     ref.current.focus();
  //   }, 0);

  const focusTextArea = () => ref.current.focus();

  const handleClick = (e) => {
    if (e.button === MouseButton.LEFT_CLICK) {
      if (!state.mouseDown) dispatch(resetHighlighted());
      dispatch(setSelected(id));
    }
  };

  const handleFocus = (e) => {
    // if (!state.mouseDown) dispatch(resetHighlighted());
    setFocused(true);
  };

  useEffect(() => {
    if (id === state.selected && !focused) {
      focusTextArea();
    } else {
      ref.current.blur();
    }
  }, [state.selected]);

  const handleInput = (e) =>
    dispatch(setContent({ cell: id, value: e.target.value }));

  const handleMouseOver = (e) => {
    dispatch(setHovered(id));
    if (state.mouseDown) {
      dispatch(setHighlightedCells(id));
    }
  };

  const handleMouseDown = (e) => {
    if (e.button === MouseButton.LEFT_CLICK) {
      // e.preventDefault();
      if (!state.mouseDown && !state.shiftKey) dispatch(resetHighlighted());
      dispatch(setSelected(id));
      dispatch(setHighlightedAnchor(id));
      dispatch(setHighlightedCells(id));
    } else {
    }
  };

  const handleMouseMove = () => {
    dispatch(setHighlightedCurrent(id));
  };

  const handleDoubleClick = () => {
    if (!state.mouseDown) dispatch(resetHighlighted());
    dispatch(setSelected(id));
    // dispatch(setCurrentEditing(id));
    dispatch(setEditMode(true));
    focusTextArea();
  };

  return (
    <Item
      ref={containerRef}
      onClick={handleClick}
      selected={id === state.selected || state.highlighted.cells.includes(id)}
      onMouseOver={handleMouseOver}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onDoubleClick={handleDoubleClick}
    >
      <CellInput
        ref={ref}
        onFocus={handleFocus}
        onChange={handleInput}
        onBlur={() => setFocused(false)}
        type="text"
        tabIndex={row * SheetConfig.MAX_ROWS + (columnCharCode - 65)}
        value={state.content[id]}
      />
    </Item>
  );
};

export default Cell;