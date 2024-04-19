import CalcButton from "../components/CalcButton";
import EvalButton from "../components/EvalButton";
import ClearButton from "../components/ClearButton";
import { backspace } from "../actions";
import FlexBox from "../../../../../components/shared/FlexBox";
import { Action, State } from "../types";
import { Dispatch } from "react";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
};

const NumbersBox = ({ state, dispatch }: Props): JSX.Element => {
  const numberGroups: string[][] = [
    // ["(", ")", "%"],
    ["x", "7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
  ];

  return (
    <FlexBox width="100%" flexDirection="column" alignItems="flex-end">
      <FlexBox justifyContent="flex-end">
        <CalcButton state={state} dispatch={dispatch} value="(" />
        <CalcButton state={state} dispatch={dispatch} value=")" />
        <ClearButton dispatch={dispatch} fn={backspace} display="DEL" />
      </FlexBox>
      {numberGroups.map((group, idx) => (
        <FlexBox key={idx} justifyContent="flex-end">
          {group.map((number) => (
            <CalcButton
              key={number}
              state={state}
              dispatch={dispatch}
              value={String(number)}
            />
          ))}
        </FlexBox>
      ))}
      <FlexBox justifyContent="flex-end">
        <CalcButton state={state} dispatch={dispatch} value="0" />
        <CalcButton state={state} dispatch={dispatch} value="." />
        <EvalButton state={state} dispatch={dispatch} />
      </FlexBox>
    </FlexBox>
  );
};

export default NumbersBox;
