import { Dispatch } from "react";
import styled from "@emotion/styled";
import { selectCell } from "../actions";
import { Action, State } from "../types";

const ZeroInput = styled.input({
  opacity: "0",
  width: "1px",
  height: "1px",
  position: "absolute",
});

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
};

const FocusGuard = ({ state, dispatch }: Props): JSX.Element => {
  const handleFocusGuard = (e: React.FocusEvent<HTMLInputElement>): void => {
    e.preventDefault();
    e.target.blur();
    dispatch(selectCell("A1"));
  };

  return (
    <ZeroInput
      type="text"
      tabIndex={(state.maxRows + 1) * state.maxColumns}
      onFocus={handleFocusGuard}
    />
  );
};

export default FocusGuard;
