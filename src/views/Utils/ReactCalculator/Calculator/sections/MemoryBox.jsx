import { FlexBox } from "src/components/shared/styles";
import MemoryButton from "../components/MemoryButton";
import { MemoryOperation } from "../constants";

function MemoryBox({ state, dispatch }) {
  return (
    <FlexBox flexDirection="column" justifyContent="flex-start">
      {Object.values(MemoryOperation).map((operation) => (
        <MemoryButton
          key={operation}
          state={state}
          dispatch={dispatch}
          value={operation}
        />
      ))}
    </FlexBox>
  );
}

export default MemoryBox;
