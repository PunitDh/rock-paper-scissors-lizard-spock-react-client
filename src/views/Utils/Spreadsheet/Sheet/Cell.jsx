import { useEffect, useRef, useState } from "react";
import { CellInput, Item } from "../styles";
import {
  resetHighlighted,
  setContent,
  setHighlightedCells,
  setSelected,
  setHighlightedAnchor,
  setHighlightedDestination,
  setHighlightedCurrent,
} from "./actions";

const Cell = ({ id, state, dispatch, row, column }) => {
  const [editMode, setEditMode] = useState(false);

  const ref = useRef();
  const handleSelect = (e) => {
    e.stopPropagation();
    if (!state.mouseDown) dispatch(resetHighlighted());
    dispatch(setSelected(id));
  };

  useEffect(() => {
    if (id === state.selected) {
      ref.current.focus();
    }
  }, [state.selected]);

  const handleChange = (e) =>
    dispatch(setContent({ cell: id, value: e.target.value }));

  const handleMouseOver = (e) => {
    if (state.mouseDown) {
      dispatch(setHighlightedCells(id));
    }
  };

  const handleMouseDown = () => {
    dispatch(resetHighlighted());
    dispatch(setHighlightedAnchor(id));
    dispatch(setHighlightedCells(id));
  };

  const toggleEditMode = () => setEditMode((mode) => !mode);

  const handleMouseUp = () => {
    dispatch(setHighlightedDestination(id));
  };

  const handleMouseMove = () => {
    dispatch(setHighlightedCurrent(id));
  };

  return (
    <Item
      column={column}
      onClick={handleSelect}
      selected={id === state.selected || state.highlighted.cells.includes(id)}
      onMouseOver={handleMouseOver}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <CellInput
        ref={ref}
        onFocus={handleSelect}
        type="text"
        tabIndex={row * 12 + column}
        value={state.content[id]?.value}
        onChange={handleChange}
        // disabled={!editMode}
      />
    </Item>
  );
};

export default Cell;
