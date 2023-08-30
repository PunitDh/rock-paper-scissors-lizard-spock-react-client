import { resetState } from "./actions";
import { CalculatorButton } from "./styles";

function ClearButton({ dispatch }) {
  const handleClick = () => dispatch(resetState());

  return (
    <CalculatorButton variant="contained" color="error" onClick={handleClick}>
      C
    </CalculatorButton>
  );
}

export default ClearButton;
