import React, { Dispatch } from "react";
import { CalculatorButton } from "../styles";
import { Action } from "../types";

type Props = {
  dispatch: Dispatch<Action>;
  fn: () => Action,
  display: string;
}

const ClearButton = ({ dispatch, fn, display }: Props) => (
  <CalculatorButton
    variant="contained"
    color="error"
    onClick={() => dispatch(fn())}
  >
    {display}
  </CalculatorButton>
);

export default ClearButton;
