import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { Dispatch, SyntheticEvent, useCallback, useRef } from "react";
import { openContextMenu, setCellContent, setFormulaMode } from "../../actions";
import { isFormula } from "../../utils/cellUtils";
// eslint-disable-next-line no-unused-vars
import useEventHandler from "../../hooks/useEventHandler";
import { Action, State } from "../../types";
import CellFormatting from "../../models/CellFormatting";
import Cell from "../../models/Cell";
import { Position } from "./types";

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
  position: Position;
  cell: Cell;
  value: string;
}

const CellInput = ({ state, dispatch, position, cell, value }: Props): JSX.Element => {
  const eventHandler = useEventHandler();
  const navigateRef = useRef(true);
  const inputRef = useCallback(
    (node: HTMLInputElement) => eventHandler.setInputRef(node),
    [eventHandler]
  );

  useEffect(() => {
    navigateRef.current = true;
    console.log("Cell input navigateref hook triggered");
    setTimeout(() => console.log("----------end--------"), 0)
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

  const handleFocus = () => {
    eventHandler.setFocusInput(true);
  };

  const handleContextMenu = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(openContextMenu(document.getElementById(state.selectedCell.id)));
  };

  const handleClick = () => {
    navigateRef.current = false;
  };

  return (
    <Container top={position.cellInput.top} left={position.cellInput.left}>
      <InputField
        type="text"
        ref={inputRef}
        value={value}
        id={"input-box"}
        autoComplete="off"
        width={position.cellInput.width}
        height={position.cellInput.height}
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
