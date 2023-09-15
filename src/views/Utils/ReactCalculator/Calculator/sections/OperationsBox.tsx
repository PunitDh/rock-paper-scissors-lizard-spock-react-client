import React from "react";
import CalcButton from "../components/CalcButton";
import ClearButton from "../components/ClearButton";
import { resetState } from "../actions";
import FlexBox from "../../../../../components/shared/FlexBox";
import { Action, State } from "../types";
import { Dispatch } from "react";

type Props = {
  state: State;
  dispatch: Dispatch<Action>
}

function OperationsBox({ state, dispatch }: Props) {
  const operations = ["+", "-", "×", "÷"];
  return (
    <FlexBox flexDirection="column">
      <ClearButton
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
