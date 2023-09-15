import React from "react";
import styled from "@emotion/styled";
import { Dispatch, SyntheticEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { openContextMenu, setCellContent, setFormulaMode } from "../actions";
import { isFormula } from "../utils/cellUtils";
// eslint-disable-next-line no-unused-vars
import useEventHandler from "../hooks/useEventHandler";
import { Action, State } from "../types";
import CellData from "../models/CellData";
import CellFormatting from "../models/CellFormatting";
import Cell from "../models/Cell";

type ContainerProps = {
  top: number;
  left: number;
}

const Container = styled.div(({ top, left }: ContainerProps) => ({
  position: "absolute",
  top: `${top}px`,
  left: `${left}px`,
  transition: "top 200ms ease-in-out, left 200ms ease-in-out",
  zIndex: "50000",
}));

type InputFieldProps =
  {
    width: number
    height: number
    isfocused: boolean
    formatting: CellFormatting | undefined
  }


const InputField = styled.input(({ width, height, isfocused, formatting }: InputFieldProps) => ({
  width: `${width}px`,
  height: `${height}px`,
  borderRadius: 0,
  outline: "none",
  border: "2px solid blue",
  cursor: "cell",
  padding: "1px",
  ...formatting,
  backgroundColor: isfocused ? "white" : formatting?.backgroundColor || "transparent",
  color: isfocused ? "black" : formatting?.color || "transparent",
  "&:focus": {
    cursor: "text",
  },
}));

type Props = {
  state: State
  dispatch: Dispatch<Action>
}

type Position = {
  top: number;
  left: number;
  width: number;
  height: number;
}

const CellInput = ({ state, dispatch }: Props): JSX.Element => {
  const navigateRef = useRef(true);
  const eventHandler = useEventHandler();

  const inputRef = useCallback(
    (node: HTMLInputElement) => eventHandler.setInputRef(node),
    [eventHandler]
  );

  const cell = useMemo<Cell>(() => state.selectedCell, [state.selectedCell]);
  const currentCellContentData = state.content.data[cell.id] as CellData;
  const rowHeight = useMemo<{ value: number }>(
    () => ({
      value:
        (state.content.rowHeights && state.content.rowHeights[cell.row]) ||
        state.defaultRowHeight,
    }),
    [cell.row, state.content.rowHeights, state.defaultRowHeight]
  );

  const columnWidth = useMemo<{ value: number }>(
    () => ({
      value:
        (state.content.columnWidths &&
          state.content.columnWidths[cell.column]) ||
        state.defaultColumnWidth,
    }),
    [cell.column, state.content.columnWidths, state.defaultColumnWidth]
  );

  const currentValue = useMemo<string | number>(
    () =>
      currentCellContentData?.formula || currentCellContentData?.value || "",
    [currentCellContentData?.formula, currentCellContentData?.value]
  );

  // const [originalValue, setOriginalValue] = useState<string | number>(currentValue);
  // const [value, setValue] = useState<string | number>(currentValue);
  const [position, setPosition] = useState<Position>({
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
    // setValue(currentValue);
    setTextBoxStats();

    const handleResize = () => setTextBoxStats();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [currentValue, dispatch, setTextBoxStats]);

  useEffect(() => {
    // setOriginalValue(currentValue);
    navigateRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id]);

  const handleBlur = (e: React.FocusEvent) => eventHandler.handleInputBoxBlur(e, cell.id);

  const handleChange = (e: React.ChangeEvent) => {
    const newValue = (e.target as HTMLInputElement).value;
    if (isFormula(newValue)) dispatch(setFormulaMode(true));
    dispatch(setCellContent(cell.id, newValue));
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) =>
      eventHandler.handleCellInputKeyDown(
        e,
        navigateRef.current
      ),
    [eventHandler]
  );

  const handleFocus = () => eventHandler.setFocusInput(true);

  const handleContextMenu = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(openContextMenu(document.getElementById(state.selectedCell.id)));
  };

  const handleClick = () => {
    navigateRef.current = false;
  };

  return (
    <Container top={position.top} left={position.left}>
      <InputField
        type="text"
        ref={inputRef}
        value={currentValue}
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
          !(state.content.data[cell.id]?.formula?.length as number > 0) ?
            state.content.data[cell.id]?.formatting : undefined
        }
      />
    </Container>
  );
};

export default CellInput;
