import { FlexBox } from "src/components/shared/styles";
import CalcButton from "./CalcButton";
import ClearButton from "./ClearButton";
import EvalButton from "./EvalButton";

const NumbersBox = ({ state, dispatch }) => {
  const numberGroups = [
    [9, 8, 7],
    [6, 5, 4],
    [3, 2, 1],
  ];

  return (
    <FlexBox width="100%" flexDirection="column" alignItems="flex-end">
      {numberGroups.map((group, idx) => (
        <FlexBox key={idx} justifyContent="flex-end">
          {group.map((number) => (
            <CalcButton
              key={number}
              state={state}
              dispatch={dispatch}
              value={number}
            />
          ))}
        </FlexBox>
      ))}
      <FlexBox justifyContent="flex-end">
        <ClearButton dispatch={dispatch} />
        <CalcButton state={state} dispatch={dispatch} value="0" />
        <EvalButton state={state} dispatch={dispatch} />
      </FlexBox>
    </FlexBox>
  );
};

export default NumbersBox;
