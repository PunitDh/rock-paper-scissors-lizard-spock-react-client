
import CalcButton from "../components/CalcButton";
import ClearButton from "../components/ClearButton";
import { resetState } from "../actions";
import FlexBox from "../../../../../components/shared/FlexBox";

function OperationsBox({ state, dispatch }) {
  const operations = ["+", "-", "×", "÷"];
  return (
    <FlexBox flexDirection="column">
      <ClearButton
        state={state}
        dispatch={dispatch}
        fn={resetState}
        display="AC"
      />
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
