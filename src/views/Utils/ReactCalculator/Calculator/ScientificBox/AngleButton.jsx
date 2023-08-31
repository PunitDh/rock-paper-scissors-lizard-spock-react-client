import { setDegMode } from "../actions";
import { Calc } from "../constants";
import { CalculatorButton } from "../styles";

function AngleButton({ state, dispatch, value }) {
  const isDeg = value === Calc.DEG;
  const handleClick = () => dispatch(setDegMode(isDeg));

  return (
    <CalculatorButton
      color={state.degrees === isDeg ? "primary" : "inherit"}
      variant={state.degrees === isDeg ? "contained" : "outlined"}
      onClick={handleClick}
    >
      {value}
    </CalculatorButton>
  );
}

export default AngleButton;
