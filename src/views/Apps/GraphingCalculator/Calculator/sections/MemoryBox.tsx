import { Dispatch } from "react";
import FlexBox from "../../../../../components/shared/FlexBox";
import MemoryButton from "../components/MemoryButton";
import { MemoryOperation } from "../constants";
import InvButton from "./ScientificBox/InverseButton";
import { Action, State } from "../types";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
};

function MemoryBox({ state, dispatch }: Props) {
  return (
    <FlexBox flexDirection="column" justifyContent="flex-start">
      <InvButton state={state} dispatch={dispatch} />
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
