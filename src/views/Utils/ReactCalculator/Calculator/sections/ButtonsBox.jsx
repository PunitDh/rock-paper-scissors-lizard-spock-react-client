import NumbersBox from "./NumbersBox";
import OperationsBox from "./OperationsBox";
import ScientificBox from "./ScientificBox";
import { CalculatorBox } from "../styles";
import MemoryBox from "./MemoryBox";

const ButtonsBox = ({ state, dispatch }) => (
  <CalculatorBox
    flexDirection="row"
    width="100%"
    justifyContent="flex-end"
    gap="0.5rem"
    alignItems="flex-start"
  >
    <MemoryBox state={state} dispatch={dispatch} />
    <ScientificBox state={state} dispatch={dispatch} />
    <NumbersBox state={state} dispatch={dispatch} />
    <OperationsBox state={state} dispatch={dispatch} />
  </CalculatorBox>
);

export default ButtonsBox;
