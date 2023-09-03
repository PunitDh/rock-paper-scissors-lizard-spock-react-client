import { addInput, resetOutput, setInverseMode } from "../actions";
import { Calc } from "../constants";
import { CalculatorButton } from "../styles";

function CalcButton({
  value,
  display,
  state,
  dispatch,
  operation,
  invertedOperation,
}) {
  const handleClick = () => {
    if (state.evaled) {
      dispatch(resetOutput());
      if (!state.inverse && operation) {
        dispatch(addInput(Calc.ANS, value));
      } else if (state.inverse && operation && invertedOperation) {
        dispatch(addInput(value, Calc.ANS));
      } else if (state.inverse && operation && !invertedOperation) {
        dispatch(addInput(Calc.ANS, value));
      } else {
        dispatch(addInput(value));
      }
    } else {
      dispatch(addInput(value));
    }
    dispatch(setInverseMode(false));
  };

  return (
    <CalculatorButton onClick={handleClick}>
      {display ?? value}
    </CalculatorButton>
  );
}

export default CalcButton;
