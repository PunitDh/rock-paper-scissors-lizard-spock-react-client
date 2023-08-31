import { FlexBox } from "src/components/shared/styles";
import CalcButton from "./components/CalcButton";
import ClearButton from "./components/ClearButton";
import { backspace, resetState } from "./actions";

function OperationsBox({ state, dispatch }) {
  const operations = ["+", "-", "×", "÷"];
  return (
    <FlexBox flexDirection="column">
      {/* <ClearButton
        state={state}
        dispatch={dispatch}
        fn={backspace}
        display={"DEL"}
      /> */}
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
