import React, { Dispatch } from "react";
import { setDegreesMode } from "../../actions";
import { Calc } from "../../constants";
import { CalculatorButton } from "../../styles";
import { Action, State } from "../../types";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
  value: string;
}

function AngleButton({ state, dispatch, value }: Props) {
  const isDeg = value === Calc.DEG;
  const handleClick = () => dispatch(setDegreesMode(isDeg));

  return (
    <CalculatorButton
      color={state.degrees === isDeg ? "primary" : "inherit"}
      variant={state.degrees === isDeg ? "contained" : "outlined"}
      onClick={handleClick}
    >
      {value}
    </CalculatorButton>
  );
}

export default AngleButton;
