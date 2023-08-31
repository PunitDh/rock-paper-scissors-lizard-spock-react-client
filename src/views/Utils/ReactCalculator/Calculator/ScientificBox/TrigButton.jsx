import { Sup } from "../styles";
import InvertedButton from "./InvertedButton";

const TrigButton = ({ value, state, dispatch }) => (
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
  />
);

export default TrigButton;
