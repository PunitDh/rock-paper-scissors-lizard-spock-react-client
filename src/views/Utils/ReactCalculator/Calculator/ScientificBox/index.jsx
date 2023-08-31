import { FlexBox } from "src/components/shared/styles";
import AngleButton from "./AngleButton";
import InvButton from "./InverseButton";
import TrigButton from "./TrigButton";
import { Sup } from "../styles";
import CalcButton from "../components/CalcButton";
import InvertedButton from "./InvertedButton";

const ScientificBox = ({ state, dispatch }) => (
  <FlexBox width="100%" flexDirection="column" alignItems="flex-end">
    <FlexBox justifyContent="flex-end">
      <AngleButton value="Rad" state={state} dispatch={dispatch} />
      <AngleButton value="Deg" state={state} dispatch={dispatch} />
      <CalcButton
        display={"x!"}
        state={state}
        dispatch={dispatch}
        value={"!"}
      />
    </FlexBox>
    <FlexBox justifyContent="flex-end">
      <InvButton state={state} dispatch={dispatch} />
      <TrigButton value="sin" state={state} dispatch={dispatch} />
      <InvertedButton
        display={"ln"}
        invertedDisplay={
          <span>
            e<Sup>x</Sup>
          </span>
        }
        state={state}
        dispatch={dispatch}
        value={"ln("}
        invertedValue={"E^"}
      />
    </FlexBox>
    <FlexBox justifyContent="flex-end">
      <CalcButton display={"π"} state={state} dispatch={dispatch} value={"π"} />
      <TrigButton value="cos" invertedValue state={state} dispatch={dispatch} />
      <InvertedButton
        display={"log"}
        state={state}
        dispatch={dispatch}
        value={"log("}
        invertedDisplay={
          <span>
            10<Sup>x</Sup>
          </span>
        }
        invertedValue={"e"}
      />
    </FlexBox>
    <FlexBox justifyContent="flex-end">
      <CalcButton display={"e"} state={state} dispatch={dispatch} value={"E"} />
      <TrigButton value="tan" state={state} dispatch={dispatch} />
      <InvertedButton
        invertedDisplay={"√"}
        display={
          <span>
            x<Sup>2</Sup>
          </span>
        }
        state={state}
        dispatch={dispatch}
        invertedValue={"√"}
        value={"²"}
        operation={true}
        invertedOperation={true}
      />
    </FlexBox>
    <FlexBox justifyContent="flex-end">
      <InvertedButton
        display={"Ans"}
        invertedDisplay={"Rnd"}
        state={state}
        dispatch={dispatch}
        value={"Ans"}
        invertedValue={"Rnd"}
      />
      <CalcButton
        display={"EXP"}
        state={state}
        dispatch={dispatch}
        value={"e"}
      />
      <InvertedButton
        invertedDisplay={
          <span>
            <Sup>y</Sup>√x
          </span>
        }
        display={
          <span>
            x<Sup>y</Sup>
          </span>
        }
        state={state}
        dispatch={dispatch}
        value={"^"}
        invertedValue={"√"}
        operation={true}
      />
    </FlexBox>
  </FlexBox>
);

export default ScientificBox;
