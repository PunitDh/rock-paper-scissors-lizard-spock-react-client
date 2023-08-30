import { toggleInverseMode } from "../actions";
import { CalculatorButton } from "../styles";

function InvButton({ state, dispatch }) {
  const handleClick = () => dispatch(toggleInverseMode());

  return (
    <CalculatorButton
      color={state.inv ? "primary" : "inherit"}
      variant={state.inv ? "contained" : "outlined"}
      onClick={handleClick}
    >
      Inv
    </CalculatorButton>
  );
}

export default InvButton;
