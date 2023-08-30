import { setDegMode } from "../actions";
import { CalculatorButton } from "../styles";

function AngleButton({ state, dispatch, value }) {
  const isDeg = value === "Deg";
  const handleClick = () => dispatch(setDegMode(isDeg));

  return (
    <CalculatorButton
      color={state.deg === isDeg ? "primary" : "inherit"}
      variant={state.deg === isDeg ? "contained" : "outlined"}
      onClick={handleClick}
    >
      {value}
    </CalculatorButton>
  );
}

export default AngleButton;
