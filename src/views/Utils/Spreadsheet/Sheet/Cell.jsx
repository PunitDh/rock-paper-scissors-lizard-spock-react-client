import { useCallback, useEffect, useRef, useState } from "react";
import { CellInput, Item } from "../styles";
import {
  resetHighlighted,
  setContent,
  setHighlightedCells,
  setSelected,
  setHighlightedAnchor,
  setHighlightedDestination,
  setHighlightedCurrent,
  setCurrentEditing,
} from "./actions";
import { MouseButton, SheetConfig } from "../constants";
import { getId } from "../utils";

const Cell = ({ id, state, dispatch }) => {
  const [editMode] = useState(false);
  const { row, columnCharCode } = getId(id);

  const ref = useRef();

  const handleClick = (e) => {
    if (e.button === MouseButton.LEFT_CLICK) {
      e.stopPropagation();
      if (!state.mouseDown) dispatch(resetHighlighted());
      dispatch(setSelected(id));
    }
  };

  const handleFocus = (e) => {
    // e.stopPropagation();
    if (!state.mouseDown) dispatch(resetHighlighted());
    dispatch(setSelected(id));
  };

  useEffect(() => {
    if (id === state.selected && id === state.currentEditing) {
      ref.current.focus();
    } else {
      ref.current.blur();
    }
  }, [state.selected, state.currentEditing]);

  useEffect(() => {}, [editMode]);

  useEffect(() => {
    console.log(ref.current?.textContent, id);
  }, [ref.current?.textContent]);

  const handleChange = (e) =>
    dispatch(setContent({ cell: id, value: e.target.textContent }));

  const handleMouseOver = (e) => {
    if (state.mouseDown) {
      dispatch(setHighlightedCells(id));
    }
  };

  const handleMouseDown = (e) => {
    if (e.button === MouseButton.LEFT_CLICK) {
      if (!state.mouseDown) dispatch(resetHighlighted());
      dispatch(setSelected(id));
      dispatch(resetHighlighted());
      dispatch(setHighlightedAnchor(id));
      dispatch(setHighlightedCells(id));
    } else {
    }
  };

  const handleMouseUp = () => {
    dispatch(setHighlightedDestination(id));
  };

  const handleMouseMove = () => {
    dispatch(setHighlightedCurrent(id));
  };

  const handleContextMenu = (e) => {
    // e.preventDefault();
  };

  const handleDoubleClick = () => {
    if (!state.mouseDown) dispatch(resetHighlighted());
    dispatch(setSelected(id));
    dispatch(setCurrentEditing(id));
    ref.current.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key !== "Enter" || e.key !== "Escape") {
      dispatch(setCurrentEditing(id));
      ref.current.focus();
    }
  };

  return (
    <Item
      onClick={handleClick}
      selected={id === state.selected || state.highlighted.cells.includes(id)}
      onMouseOver={handleMouseOver}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
    >
      <CellInput
        ref={ref}
        onFocus={handleFocus}
        tabIndex={row * SheetConfig.MAX_ROWS + (columnCharCode - 65)}
        contentEditable={true}
        onContextMenu={handleContextMenu}
        onInput={handleChange}
      >
        {state.content[id]?.value}
      </CellInput>
    </Item>
  );
};

export default Cell;
