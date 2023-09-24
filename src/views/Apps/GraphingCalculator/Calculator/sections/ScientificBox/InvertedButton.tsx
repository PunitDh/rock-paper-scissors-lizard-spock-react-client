import { Dispatch } from "react";
import CalcButton from "../../components/CalcButton";
import { Action, State } from "../../types";

type Props = {
  value: string;
  invertedValue: string;
  display: string | JSX.Element;
  invertedDisplay: string | JSX.Element;
  state: State;
  dispatch: Dispatch<Action>;
  operation?: boolean;
  invertedOperation?: boolean;
};

const InvertedButton = ({
  value,
  invertedValue,
  display,
  invertedDisplay,
  state,
  dispatch,
  operation,
  invertedOperation,
}: Props) => {
  return (
    <CalcButton
      display={state.inverse ? invertedDisplay : display}
      state={state}
      dispatch={dispatch}
      value={state.inverse ? invertedValue : value}
      operation={operation}
      invertedOperation={invertedOperation}
    />
  );
};

export default InvertedButton;
