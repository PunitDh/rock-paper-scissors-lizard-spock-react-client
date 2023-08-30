import { resetOutput, setInput } from "../actions";
import { CalculatorButton } from "../styles";

function ScientificButton({ value, display, state, dispatch, operation }) {
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

  return <CalculatorButton onClick={handleClick}>{display}</CalculatorButton>;
}

export default ScientificButton;
