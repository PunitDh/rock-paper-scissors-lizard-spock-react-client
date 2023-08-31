import { CalculatorButton } from "../styles";

const ClearButton = ({ dispatch, fn, display }) => (
  <CalculatorButton
    variant="contained"
    color="error"
    onClick={() => dispatch(fn())}
  >
    {display}
  </CalculatorButton>
);

export default ClearButton;
