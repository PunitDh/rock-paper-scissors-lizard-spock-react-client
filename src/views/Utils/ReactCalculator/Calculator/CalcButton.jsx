import { Tooltip } from "@mui/material";
import { resetOutput, setEvaled, setInput } from "./actions";
import { CalculatorButton } from "./styles";

function CalcButton({ value, state, dispatch, operation }) {
  const handleClick = () => {
    if (state.evaled) {
      dispatch(resetOutput());
      dispatch(setEvaled(false));
      if (operation) {
        dispatch(setInput(state.output.toString().concat(value)));
      } else {
        dispatch(setInput(value));
      }
    } else {
      dispatch(setInput(state.input.concat(value)));
    }
  };

  return (
    <Tooltip title={value} disableInteractive>
      <CalculatorButton onClick={handleClick} type="button">
        {value}
      </CalculatorButton>
    </Tooltip>
  );
}

export default CalcButton;
