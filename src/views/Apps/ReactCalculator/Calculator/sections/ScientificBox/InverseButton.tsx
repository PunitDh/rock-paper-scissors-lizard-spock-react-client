import { Dispatch } from "react";
import { toggleInverseMode } from "../../actions";
import { CalculatorButton } from "../../styles";
import { Action, State } from "../../types";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
};

function InvButton({ state, dispatch }: Props): JSX.Element {
  const handleClick = () => dispatch(toggleInverseMode());

  return (
    <CalculatorButton
      color={state.inverse ? "primary" : "inherit"}
      variant={state.inverse ? "contained" : "outlined"}
      onClick={handleClick}
    >
      Inv
    </CalculatorButton>
  );
}

export default InvButton;
