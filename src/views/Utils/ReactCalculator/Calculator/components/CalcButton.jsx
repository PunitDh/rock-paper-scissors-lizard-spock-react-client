import { addInput, resetOutput } from "../actions";
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
      } else if (state.inverse && invertedOperation) {
        dispatch(addInput(value, Calc.ANS));
      } else if (state.inverse && !invertedOperation) {
        dispatch(addInput(Calc.ANS, value));
      } else {
        dispatch(addInput(value));
      }
    } else {
      if (operation) {
        if (state.input.length) dispatch(addInput(value));
      } else dispatch(addInput(value));
    }
  };

  return (
    <CalculatorButton onClick={handleClick}>
      {display ?? value}
    </CalculatorButton>
  );
}

export default CalcButton;
