import { resetOutput, setInput } from "../actions";
import { CalculatorButton } from "../styles";

function CalcButton({ value, state, dispatch, operation }) {
  const handleClick = () => {
    if (state.evaled) {
      dispatch(resetOutput());
      if (operation) {
        dispatch(setInput(state.output.toString().concat(value)));
      } else {
        dispatch(setInput(value));
      }
    } else {
      dispatch(setInput(state.input.concat(value)));
    }
  };

  return <CalculatorButton onClick={handleClick}>{value}</CalculatorButton>;
}

export default CalcButton;
