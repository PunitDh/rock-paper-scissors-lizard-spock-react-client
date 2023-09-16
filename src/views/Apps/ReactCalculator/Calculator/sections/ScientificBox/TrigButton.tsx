import React, { Dispatch } from "react";
import { Sup } from "../../styles";
import InvertedButton from "./InvertedButton";
import { Action, State } from "../../types";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
  value: string;
}

const TrigButton = ({ value, state, dispatch }: Props) => (
  <InvertedButton
    display={<span>{value}</span>}
    state={state}
    dispatch={dispatch}
    value={`${" "}${value}(`}
    invertedValue={`a${value}(`}
    invertedDisplay={
      <span>
        {value}
        {<Sup>-1</Sup>}
      </span>
    }
  // operation={true}
  // invertedOperation={true}
  />
);

export default TrigButton;
