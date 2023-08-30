import { Sup } from "../styles";
import ScientificButton from "./ScientificButton";

const TrigButton = ({ value, state, dispatch }) => {
  return (
    <ScientificButton
      display={
        <span>
          {value}
          {state.inv && <Sup>-1</Sup>}
        </span>
      }
      state={state}
      dispatch={dispatch}
      value={`${state.inv ? "a" : " "}${value}(`}
    />
  );
};

export default TrigButton;
