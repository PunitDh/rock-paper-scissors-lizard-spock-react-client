import { Dispatch } from "react";
import { setOutput } from "../actions";
import { CalculatorButton } from "../styles";
import { evaluateExpression } from "../utils";
import { Action, State } from "../types";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
};

const EvalButton = ({ state, dispatch }: Props): React.ReactNode => {
  const handleClick = () => {
    const output = evaluateExpression(state);
    dispatch(setOutput(output));
  };

  return (
    <CalculatorButton variant="contained" onClick={handleClick}>
      =
    </CalculatorButton>
  );
};

export default EvalButton;
