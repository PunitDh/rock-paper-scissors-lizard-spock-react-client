import styled from "@emotion/styled";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  addMemento,
  highlightCells,
  openContextMenu,
  recalculateFormulae,
  selectCell,
  setCellContent,
  setFormulaMode,
  setHighlightCellAnchor,
  setInputRef,
} from "../actions";
import { KeyEvent } from "../constants";
import { isFormula } from "../utils/cellUtils";
import EventHandler from "../eventHandlers/EventHandler";

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

const AbsoluteCellInput = ({
  state,
  dispatch,
  eventHandler,
  top,
  left,
  width,
  height,
}) => {
  const inputRef = useRef();
  const navigateRef = useRef(true);

  useEffect(() => {
    dispatch(setInputRef(inputRef.current));
  }, [dispatch]);

  const cell = useMemo(() => state.selectedCell, [state.selectedCell]);
  const rowHeight = useMemo(
    () =>
      (state.content.rowHeights && state.content.rowHeights[cell.row]) ||
      state.defaultRowHeight,
    [cell.row, state.content.rowHeights, state.defaultRowHeight]
  );

  const currentValue = useMemo(
    () =>
      state.content.data[cell.id]?.formula ||
      state.content.data[cell.id]?.value ||
      "",
    [state.content.data, cell.id]
  );

  const [originalValue, setOriginalValue] = useState(currentValue);
  const [value, setValue] = useState(currentValue);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  const setTextBoxPosition = useCallback(() => {
    const selectedCellRect = document
      .getElementById(cell.id)
      ?.getBoundingClientRect();

    if (selectedCellRect) {
      setPosition({
        top: selectedCellRect.top + window.scrollY,
        left: selectedCellRect.left + window.scrollX,
        width: selectedCellRect.width,
        height: selectedCellRect.height,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, rowHeight]);

  useEffect(() => {
    setValue(currentValue);
    setTextBoxPosition();

    const handleResize = () => setTextBoxPosition();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [currentValue, dispatch, setTextBoxPosition]);

  useEffect(() => {
    setOriginalValue(currentValue);
    navigateRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id]);

  const handleBlur = (e) => eventHandler.handleInputBoxBlur(e);

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (isFormula(newValue)) dispatch(setFormulaMode(true));
    dispatch(setCellContent(cell.id, newValue));
  };

  const handleKeyDown = useCallback(
    (e) => {
      switch (e.key) {
        case KeyEvent.SHIFT:
          dispatch(setHighlightCellAnchor(cell.id));
          break;
        case KeyEvent.ESCAPE:
          dispatch(setFormulaMode(false));
          break;
        case KeyEvent.BACKSPACE:
          break;
        case KeyEvent.ENTER:
          const triggerRecalculation =
            state.formulaTrackedCells.includes(cell.id) ||
            isFormula(e.target.value);
          dispatch(setCellContent(cell.id, e.target.value));
          dispatch(setFormulaMode(false));
          triggerRecalculation && dispatch(recalculateFormulae());
          originalValue !== currentValue && dispatch(addMemento());
          dispatch(highlightCells(cell.id));
          dispatch(
            selectCell(
              e.shiftKey
                ? cell.getPreviousRow()
                : cell.getNextRow(state.maxRows)
            )
          );
          break;
        case KeyEvent.LOWERCASE_A:
          if (EventHandler.isCtrlKeyPressed(e)) {
            e.stopPropagation();
          }
          break;
        case KeyEvent.TAB: {
          e.preventDefault();
          e.shiftKey
            ? dispatch(selectCell(cell.getPreviousColumn(state.maxColumns)))
            : dispatch(selectCell(cell.getNextColumn(state.maxRows)));
          break;
        }
        case KeyEvent.ARROW_LEFT: {
          const { current } = inputRef;
          if (current?.value.length === 0 || navigateRef.current)
            dispatch(selectCell(cell.getPreviousColumn(state.maxColumns)));
          break;
        }
        case KeyEvent.ARROW_RIGHT: {
          const { current } = inputRef;
          if (current?.value.length === 0 || navigateRef.current)
            dispatch(selectCell(cell.getNextColumn(state.maxRows)));
          break;
        }
        case KeyEvent.ARROW_UP: {
          dispatch(selectCell(cell.getPreviousRow()));
          break;
        }
        case KeyEvent.ARROW_DOWN: {
          dispatch(selectCell(cell.getNextRow(state.maxRows)));
          break;
        }
        default:
          break;
      }
    },
    [
      dispatch,
      cell,
      state.formulaTrackedCells,
      state.maxRows,
      state.maxColumns,
      originalValue,
      currentValue,
    ]
  );

  const handleFocus = (e) => {
    eventHandler.setInputFocusRef(true);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    dispatch(openContextMenu(document.getElementById(state.selectedCell.id)));
  };

  const handleClick = (e) => {
    navigateRef.current = false;
  };

  return (
    <Container top={position.top} left={position.left}>
      <InputField
        type="text"
        ref={inputRef}
        value={value}
        id={"input-box"}
        autoComplete="off"
        width={position.width}
        height={position.height}
        isfocused={eventHandler.inputFocusRef.current}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onContextMenu={handleContextMenu}
        onClick={handleClick}
        formatting={
          state.content.data[cell.id]?.formula?.length > 0
            ? undefined
            : state.content.data[cell.id]?.formatting
        }
      />
    </Container>
  );
};

export default AbsoluteCellInput;
