import { useEffect } from "react";
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
import CellData from "../../models/CellData";
import { Theme } from "@mui/material";

type ContainerProps = {
  top: number;
  left: number;
};

const Container = styled.div(({ top, left }: ContainerProps) => ({
  position: "absolute",
  top: `${top}px`,
  left: `${left}px`,
  transition: "top 200ms ease-in-out, left 200ms ease-in-out",
  zIndex: "5",
}));

type InputFieldProps = {
  width: number;
  height: number;
  isfocused: boolean;
  theme?: Theme;
  formatting: CellFormatting | undefined;
};

const InputField = styled.input(
  ({ width, height, isfocused, formatting, theme }: InputFieldProps) => {
    return {
      width: `${width}px`,
      height: `${height}px`,
      borderRadius: 0,
      outline: "none",
      border: `2px solid ${theme?.palette.primary.dark}`,
      cursor: "cell",
      padding: "1px",
      ...formatting?.styles,
      // backgroundColor: formatting?.styles?.backgroundColor || "transparent",
      // color: formatting?.styles?.color || "transparent",
      backgroundColor: isfocused
        ? "white"
        : formatting?.styles?.backgroundColor || "transparent",
      color: isfocused ? "black" : formatting?.styles?.color || "transparent",
      "&:focus": {
        cursor: "text",
      },
    };
  },
);

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
  position: Position;
  cell: Cell;
  value: string;
};

const CellInput = ({
  state,
  dispatch,
  position,
  cell,
  value,
}: Props): JSX.Element => {
  const eventHandler = useEventHandler();
  const navigateRef = useRef(true);
  const inputRef: (node: HTMLInputElement) => void = useCallback(
    (node: HTMLInputElement) => eventHandler.setInputRef(node),
    [eventHandler],
  );
  const currentCell: CellData | undefined =
    state.sheets[state.activeSheet].content.data[cell.id];

  useEffect(() => {
    navigateRef.current = true;
    console.log("Cell input navigateref hook triggered");
    setTimeout(() => console.log("----------end--------"), 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id]);

  const handleBlur = (e: React.FocusEvent) =>
    eventHandler.handleInputBoxBlur(e, cell.id);

  const handleChange = (e: React.ChangeEvent) => {
    const newValue = (e.target as HTMLInputElement).value;
    if (isFormula(newValue)) dispatch(setFormulaMode(true));
    dispatch(setCellContent(cell.id, newValue));
  };

  const handleKeyDown: (event: React.KeyboardEvent) => void = useCallback(
    (event: React.KeyboardEvent) =>
      eventHandler.handleCellInputKeyDown(event, navigateRef.current),
    [eventHandler],
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

  const formatting = isFormula(currentCell?.formula)
    ? undefined
    : currentCell?.formatting;

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
        formatting={formatting}
      />
    </Container>
  );
};

export default CellInput;
