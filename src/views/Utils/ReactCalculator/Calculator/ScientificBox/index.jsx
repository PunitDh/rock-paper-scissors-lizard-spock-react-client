import { FlexBox } from "src/components/shared/styles";
import ScientificButton from "./ScientificButton";
import AngleButton from "./AngleButton";
import InvButton from "./InvButton";
import TrigButton from "./TrigButton";
import { Sup } from "../styles";

const ScientificBox = ({ state, dispatch }) => {
  const numberGroups = [
    // ["Rad", "Deg", "x!"],
    // ["Inv", "sin", "ln"],
    // ["π", "cos", "log"],
    // ["e", "tan", "√"],
    // ["Ans", "EXP", "^"],
  ];

  return (
    <FlexBox width="100%" flexDirection="column" alignItems="flex-end">
      <FlexBox justifyContent="flex-end">
        <AngleButton value="Rad" state={state} dispatch={dispatch} />
        <AngleButton value="Deg" state={state} dispatch={dispatch} />
        <ScientificButton
          display={"x!"}
          state={state}
          dispatch={dispatch}
          value={"!"}
        />
      </FlexBox>
      <FlexBox justifyContent="flex-end">
        <InvButton state={state} dispatch={dispatch} />
        <TrigButton
          value="sin"
          invertedValue
          state={state}
          dispatch={dispatch}
        />
        <ScientificButton
          display={"ln"}
          state={state}
          dispatch={dispatch}
          value={"ln("}
        />
      </FlexBox>
      <FlexBox justifyContent="flex-end">
        <ScientificButton
          display={"π"}
          state={state}
          dispatch={dispatch}
          value={"π"}
        />
        <TrigButton
          value="cos"
          invertedValue
          state={state}
          dispatch={dispatch}
        />
        <ScientificButton
          display={"log"}
          state={state}
          dispatch={dispatch}
          value={"log("}
        />
      </FlexBox>
      <FlexBox justifyContent="flex-end">
        <ScientificButton
          display={"e"}
          state={state}
          dispatch={dispatch}
          value={"E"}
        />
        <TrigButton
          value="tan"
          invertedValue
          state={state}
          dispatch={dispatch}
        />
        <ScientificButton
          display={"√"}
          state={state}
          dispatch={dispatch}
          value={"√"}
        />
      </FlexBox>
      <FlexBox justifyContent="flex-end">
        <ScientificButton
          display={"Ans"}
          state={state}
          dispatch={dispatch}
          value={"Ans"}
        />
        <ScientificButton
          display={"EXP"}
          state={state}
          dispatch={dispatch}
          value={"e"}
        />
        <ScientificButton
          display={
            <span>
              x<Sup>y</Sup>
            </span>
          }
          state={state}
          dispatch={dispatch}
          value={"^"}
        />
      </FlexBox>
      {numberGroups.map((group, idx) => (
        <FlexBox key={idx} justifyContent="flex-end">
          {group.map((number) => (
            <ScientificButton
              key={number}
              state={state}
              dispatch={dispatch}
              value={number}
              display={number}
            />
          ))}
        </FlexBox>
      ))}
    </FlexBox>
  );
};

export default ScientificBox;
