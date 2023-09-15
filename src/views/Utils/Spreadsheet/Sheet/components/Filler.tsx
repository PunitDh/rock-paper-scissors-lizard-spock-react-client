import React, { Dispatch } from "react";
import styled from "@emotion/styled";
import { useCallback, useEffect, useState } from "react";
import useEventHandler from "../hooks/useEventHandler";
import { setFillerMode } from "../actions";
import { Action, State } from "../types";
import Cell from "../models/Cell";

type ContainerProps = {
  top: number;
  left: number;
}

const Container = styled.div(({ top, left }: ContainerProps) => ({
  position: "absolute",
  top: `${top}px`,
  left: `${left}px`,
  zIndex: "60000",
  userSelect: "none",
}));

const FillerObject = styled.div({
  width: `6px`,
  height: `6px`,
  borderRadius: 0,
  outline: "none",
  border: "2px solid blue",
  backgroundColor: "blue",
  cursor: "crosshair",
});

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
}

const Filler = ({ state, dispatch }: Props): JSX.Element => {
  const eventHandler = useEventHandler();

  const fillerRef = useCallback(
    (node: HTMLDivElement) => eventHandler.setFillerRef(node),
    [eventHandler]
  );

  const cell: Cell = state.selectedCell;
  const selectedCells: string[] = state.highlighted.cells;
  const lastSelected: string = selectedCells[state.highlighted.cells.length - 1];

  const [position, setPosition] = useState({ top: 0, left: 0 });

  const setTextBoxStats = useCallback(() => {
    const selectedCellRect = document
      .getElementById(lastSelected || cell.id)
      ?.getBoundingClientRect();

    if (selectedCellRect) {
      const top =
        selectedCellRect.top + window.scrollY + selectedCellRect.height - 6;
      const left =
        selectedCellRect.left + window.scrollX + selectedCellRect.width - 6;
      setPosition({ top, left });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, lastSelected]);

  useEffect(() => {
    setTextBoxStats();
    const handleResize = () => setTextBoxStats();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setTextBoxStats]);

  const handleMouseDown = (e: React.MouseEvent) => {
    dispatch(setFillerMode(true));
  };

  return (
    <Container top={position.top} left={position.left}>
      <FillerObject
        onMouseDown={handleMouseDown}
        ref={fillerRef}
      />
    </Container>
  );
};

export default Filler;
