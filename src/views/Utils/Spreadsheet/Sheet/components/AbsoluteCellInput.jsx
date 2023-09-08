import styled from "@emotion/styled";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  addMemento,
  highlightCells,
  openContextMenu,
  recalculateFormulae,
  selectCell,
  setContent,
  setFormulaMode,
  setHighlightAnchor,
  setInputBoxFocused,
} from "../actions";
import { KeyEvent } from "../constants";
import {
  isCtrlKeyPressed,
  getNextColumn,
  getNextRow,
  getPreviousColumn,
  getPreviousRow,
} from "../utils/cellUtils";

const Container = styled.div(({ top, left }) => ({
  position: "absolute",
  top: `${top}px`,
  left: `${left}px`,
  transition: "top 200ms ease-in-out, left 200ms ease-in-out",
  zIndex: "50000",
}));

const InputField = styled.input(({ width, height, isfocused, formatting }) => ({
  width: `${width}px`,
  height: `${height}px`,
  borderRadius: 0,
  outline: "none",
  border: "2px solid blue",
  cursor: "cell",
  padding: "1px",
  backgroundColor: isfocused ? "white" : "transparent",
  color: isfocused ? "black" : "transparent",
  ...formatting,
  "&:focus": {
    // zIndex: "4 !important",
    cursor: "text",
  },
}));

const AbsoluteCellInput = ({ state, dispatch }) => {
  const textRef = useRef();
  const cell = useMemo(() => state.selectedCell, [state.selectedCell]);
  const rowHeight = state.content.rowHeights[cell.row];
  const getValue = useCallback(
    () =>
      state.content[cell.id]?.formula || state.content[cell.id]?.value || "",
    [state.content, cell.id]
  );

  const [value, setValue] = useState(getValue());
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  const setTextBoxPosition = useCallback(() => {
    const rect = document.getElementById(cell.id)?.getBoundingClientRect();
    setPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
      height: rect.height,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, rowHeight]);

  useEffect(() => {
    setValue(getValue());
    dispatch(setInputBoxFocused(true));
    setTextBoxPosition();

    const handleResize = () => setTextBoxPosition();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [getValue, dispatch, setTextBoxPosition]);

  useEffect(() => {
    if (state.highlighted.cells.length > 0) {
      dispatch(setInputBoxFocused(false));
    }
  }, [dispatch, state.highlighted.cells]);

  const handleBlur = () => {
    dispatch(setInputBoxFocused(false));
    if (!state.formulaMode) {
      dispatch(addMemento());
      dispatch(recalculateFormulae());
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    dispatch(setFormulaMode(newValue.startsWith("=")));
    dispatch(setContent(cell.id, newValue));
  };

  const handleKeyDown = useCallback(
    (e) => {
      switch (e.key) {
        case KeyEvent.SHIFT:
          console.log("Here");
          dispatch(setHighlightAnchor(cell.id));
          break;
        case KeyEvent.ESCAPE:
          dispatch(setInputBoxFocused(false));
          dispatch(setFormulaMode(false));
          break;
        case KeyEvent.BACKSPACE:
          state.inputBoxFocused && e.stopPropagation();
          break;
        case KeyEvent.ENTER:
          dispatch(setInputBoxFocused(false));
          dispatch(setContent(cell.id, e.target.value));
          dispatch(setFormulaMode(false));
          dispatch(recalculateFormulae());
          dispatch(addMemento());
          dispatch(highlightCells(cell.id));
          dispatch(
            selectCell(
              e.shiftKey
                ? getPreviousRow(cell.id)
                : getNextRow(cell.id, state.maxRows)
            )
          );
          break;
        case KeyEvent.LOWERCASE_A:
          if (isCtrlKeyPressed(e)) {
            e.stopPropagation();
          }
          break;
        case KeyEvent.TAB: {
          e.preventDefault();
          e.shiftKey
            ? dispatch(selectCell(getPreviousColumn(cell.id, state.maxColumns)))
            : dispatch(selectCell(getNextColumn(cell.id, state.maxRows)));
          break;
        }
        case KeyEvent.ARROW_LEFT: {
          if (textRef.current?.value.length === 0)
            dispatch(selectCell(getPreviousColumn(cell.id, state.maxColumns)));
          break;
        }
        case KeyEvent.ARROW_RIGHT: {
          if (textRef.current?.value.length === 0)
            dispatch(selectCell(getNextColumn(cell.id, state.maxRows)));
          break;
        }
        case KeyEvent.ARROW_UP: {
          dispatch(selectCell(getPreviousRow(cell.id)));
          break;
        }
        case KeyEvent.ARROW_DOWN: {
          dispatch(selectCell(getNextRow(cell.id, state.maxRows)));
          break;
        }
        default:
          dispatch(setInputBoxFocused(true));
          break;
      }
    },
    [dispatch, cell.id, state.inputBoxFocused, state.maxRows, state.maxColumns]
  );

  const handleFocus = () => dispatch(setInputBoxFocused(true));

  const handleContextMenu = (e) => {
    e.preventDefault();
    dispatch(openContextMenu(e.currentTarget));
  };

  return (
    <Container top={position.top} left={position.left}>
      <InputField
        type="text"
        ref={textRef}
        value={value}
        id={`${cell.id}-input`}
        autoComplete="off"
        width={position.width}
        height={position.height}
        isfocused={state.inputBoxFocused}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onContextMenu={handleContextMenu}
        formatting={
          state.content[cell.id]?.formula?.length > 0
            ? undefined
            : state.content[cell.id]?.formatting
        }
      />
    </Container>
  );
};

export default AbsoluteCellInput;
