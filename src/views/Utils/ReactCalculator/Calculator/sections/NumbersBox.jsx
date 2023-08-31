import { FlexBox } from "src/components/shared/styles";
import CalcButton from "../components/CalcButton";
import EvalButton from "../components/EvalButton";
import ClearButton from "../components/ClearButton";
import { backspace } from "../actions";

const NumbersBox = ({ state, dispatch }) => {
  const numberGroups = [
    // ["(", ")", "%"],
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
  ];

  return (
    <FlexBox width="100%" flexDirection="column" alignItems="flex-end">
      <FlexBox justifyContent="flex-end">
        <CalcButton state={state} dispatch={dispatch} value="(" />
        <CalcButton state={state} dispatch={dispatch} value=")" />
        <ClearButton
          state={state}
          dispatch={dispatch}
          fn={backspace}
          display="DEL"
        />
      </FlexBox>
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
        <CalcButton state={state} dispatch={dispatch} value="0" />
        <CalcButton state={state} dispatch={dispatch} value="." />
        <EvalButton state={state} dispatch={dispatch} />
      </FlexBox>
    </FlexBox>
  );
};

export default NumbersBox;