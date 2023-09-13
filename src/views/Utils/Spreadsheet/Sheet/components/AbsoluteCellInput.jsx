import styled from "@emotion/styled";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  openContextMenu,
  setCellContent,
  setFormulaMode,
  setInputRef,
} from "../actions";
import { isFormula } from "../utils/cellUtils";
// eslint-disable-next-line no-unused-vars
import useEventHandler from "../hooks/useEventHandler";

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
    cursor: "text",
  },
}));

/**
 *
 * @param {Object} props
 * @returns
 */
const AbsoluteCellInput = ({ state, dispatch }) => {
  const navigateRef = useRef(true);
  const eventHandler = useEventHandler();

  const inputRef = useCallback(
    (node) => dispatch(setInputRef(node)),
    [dispatch]
  );

  const cell = useMemo(() => state.selectedCell, [state.selectedCell]);
  const currentCellContentData = state.content.data[cell.id];
  const rowHeight = useMemo(
    () => ({
      value:
        (state.content.rowHeights && state.content.rowHeights[cell.row]) ||
        state.defaultRowHeight,
    }),
    [cell.row, state.content.rowHeights, state.defaultRowHeight]
  );

  const columnWidth = useMemo(
    () => ({
      value:
        (state.content.columnWidths &&
          state.content.columnWidths[cell.column]) ||
        state.defaultColumnWidth,
    }),
    [cell.column, state.content.columnWidths, state.defaultColumnWidth]
  );

  const currentValue = useMemo(
    () =>
      currentCellContentData?.formula || currentCellContentData?.value || "",
    [currentCellContentData?.formula, currentCellContentData?.value]
  );

  const [originalValue, setOriginalValue] = useState(currentValue);
  const [value, setValue] = useState(currentValue);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  const setTextBoxStats = useCallback(() => {
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
  }, [cell.id, rowHeight, columnWidth]);

  useEffect(() => {
    setValue(currentValue);
    setTextBoxStats();

    const handleResize = () => setTextBoxStats();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [currentValue, dispatch, setTextBoxStats]);

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
    (e) =>
      eventHandler.handleCellInputKeyDown(
        e,
        originalValue,
        currentValue,
        navigateRef.current,
        inputRef.current
      ),
    [currentValue, eventHandler, inputRef, originalValue]
  );

  const handleFocus = () => eventHandler.setFocusInput(true);

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
          !(state.content.data[cell.id]?.formula?.length > 0) &&
          state.content.data[cell.id]?.formatting
        }
      />
    </Container>
  );
};

export default AbsoluteCellInput;
