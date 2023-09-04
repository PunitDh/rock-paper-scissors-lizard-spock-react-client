import { useEffect, useMemo, useRef, useState } from "react";
import { CellInput, Item } from "../../styles";
import {
  resetHighlighted,
  setContent,
  highlightCells,
  setSelected,
  setHighlightedAnchor,
  setHighlightedCurrent,
  setHovered,
  setEditMode,
  setMenuAnchorElement,
  calculateContentFormula,
} from "../actions";
import { KeyboardEvent, MouseButton, SheetConfig } from "../../constants";
import { getId } from "../../utils";

const Cell = ({ id, state, dispatch }) => {
  const containerRef = useRef();
  const [focused, setFocused] = useState(false);
  const ref = useRef();
  const { row, columnCharCode } = useMemo(() => getId(id), [id]);

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
    if (id === state.selected.cell && !focused) {
      focusTextArea();
    } else {
      ref.current.blur();
    }
  }, [state.selected.cell]);

  const handleChange = (e) => {
    dispatch(setContent({ cell: id, value: e.target.value }));
  };

  const handleKeyDown = (e) => {
    if (e.key === KeyboardEvent.BACKSPACE) {
      state.editMode && e.stopPropagation();
    }
  };

  const handleBlur = (e) => {
    setEditMode(false);
    setFocused(false);
    dispatch(calculateContentFormula({ cell: id, value: e.target.value }));
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
      dispatch(setSelected(id));
      dispatch(setHighlightedAnchor(id));
      dispatch(highlightCells(id, id));
    }
  };

  const handleMouseMove = () => {
    dispatch(setHighlightedCurrent(id));
  };

  const handleDoubleClick = () => {
    if (!state.mouseDown) dispatch(resetHighlighted());
    dispatch(setSelected(id));
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
    >
      <CellInput
        ref={ref}
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
