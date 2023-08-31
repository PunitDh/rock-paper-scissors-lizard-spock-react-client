import { addInput, resetOutput, setInput } from "../actions";
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
      if (!state.inv && operation) {
        dispatch(addInput("Ans", value));
      } else if (state.inv && invertedOperation) {
        dispatch(addInput(value, "Ans"));
      } else {
        dispatch(addInput(value));
      }
    } else {
      dispatch(addInput(value));
    }
  };

  return (
    <CalculatorButton onClick={handleClick}>
      {display ?? value}
    </CalculatorButton>
  );
}

export default CalcButton;
