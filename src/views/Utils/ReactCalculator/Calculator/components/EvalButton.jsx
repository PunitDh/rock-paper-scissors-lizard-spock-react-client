import { setOutput } from "../actions";
import { CalculatorButton } from "../styles";
import { evaluateExpression } from "../utils";

const EvalButton = ({ state, dispatch }) => {
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
