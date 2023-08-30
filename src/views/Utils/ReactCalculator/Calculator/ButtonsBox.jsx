import NumbersBox from "./NumbersBox";
import OperationsBox from "./OperationsBox";
import { CalculatorBox } from "./styles";

const ButtonsBox = ({ state, dispatch }) => (
  <CalculatorBox
    flexDirection="row"
    width="100%"
    justifyContent="flex-end"
    gap="0.5rem"
  >
    <NumbersBox state={state} dispatch={dispatch} />
    <OperationsBox state={state} dispatch={dispatch} />
  </CalculatorBox>
);

export default ButtonsBox;
