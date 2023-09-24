import { Dispatch } from "react";
import FlexBox from "../../../../../../../components/shared/FlexBox";
import CellSelector from "./CellSelector";
import FormulaField from "./FormulaField";
import { Action, State } from "../../../types";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
  value: string;
  originalValue: string;
};

const FormulaBar = ({ state, dispatch, value, originalValue }: Props) => (
  <div tabIndex={1}>
    <FlexBox width="100%" justifyContent="flex-start">
      <CellSelector state={state} />
      <FormulaField
        state={state}
        dispatch={dispatch}
        value={value}
        originalValue={originalValue}
      />
    </FlexBox>
  </div>
);

export default FormulaBar;
