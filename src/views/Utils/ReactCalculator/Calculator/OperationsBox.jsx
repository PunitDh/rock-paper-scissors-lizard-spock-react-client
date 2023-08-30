import { FlexBox } from "src/components/shared/styles";
import CalcButton from "./components/CalcButton";
import ClearButton from "./components/ClearButton";

function OperationsBox({ state, dispatch }) {
  const operations = ["+", "-", "×", "÷"];
  return (
    <FlexBox flexDirection="column">
      <ClearButton dispatch={dispatch} />
      {operations.map((operation) => (
        <CalcButton
          key={operation}
          operation={true}
          state={state}
          dispatch={dispatch}
          value={operation}
        />
      ))}
    </FlexBox>
  );
}

export default OperationsBox;
