import { setEvaled, setOutput } from "./actions";
import { CalculatorButton } from "./styles";

function EvalButton({ state, dispatch }) {
  const evaluateExpression = () => {
    let value;
    try {
      value = eval(state.input.replace("x", "*"));
    } catch {
      value = "Syntax Error";
    }
    return value;
  };

  const handleClick = () => {
    dispatch(setOutput(evaluateExpression()));
    dispatch(setEvaled(true));
  };

  return (
    <CalculatorButton variant="contained" onClick={handleClick}>
      =
    </CalculatorButton>
  );
}

export default EvalButton;
