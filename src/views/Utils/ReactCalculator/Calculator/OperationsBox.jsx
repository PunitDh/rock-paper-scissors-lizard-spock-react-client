import { FlexBox } from "src/components/shared/styles";
import CalcButton from "./CalcButton";

function OperationsBox({ state, dispatch }) {
  const operations = ["+", "-", "x", "/"];
  return (
    <FlexBox flexDirection="column">
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
