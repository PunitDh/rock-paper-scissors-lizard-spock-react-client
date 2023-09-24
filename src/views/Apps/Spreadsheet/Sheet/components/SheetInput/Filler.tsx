import { Dispatch } from "react";
import styled from "@emotion/styled";
import { useCallback } from "react";
import useEventHandler from "../../hooks/useEventHandler";
import { setFillerMode } from "../../actions";
import { Action, State } from "../../types";
import { Position } from "./types";

type ContainerProps = {
  top: number;
  left: number;
};

const Container = styled.div(({ top, left }: ContainerProps) => ({
  position: "absolute",
  top: `${top}px`,
  left: `${left}px`,
  zIndex: "6",
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
  position: Position;
};

const Filler = ({ dispatch, position }: Props): JSX.Element => {
  const eventHandler = useEventHandler();
  const fillerRef: (node: HTMLInputElement) => void = useCallback(
    (node: HTMLDivElement) => eventHandler.setFillerRef(node),
    [eventHandler],
  );

  const handleMouseDown = () => dispatch(setFillerMode(true));

  return (
    <Container top={position.filler.top} left={position.filler.left}>
      <FillerObject onMouseDown={handleMouseDown} ref={fillerRef} />
    </Container>
  );
};

export default Filler;
