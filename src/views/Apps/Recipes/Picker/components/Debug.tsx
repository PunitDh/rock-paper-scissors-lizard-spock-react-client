import { State } from "../types";

type Props = {
  state: State;
};

const Debug = ({ state }: Props): JSX.Element => (
  <div style={{ marginTop: "1rem" }}>
    <button onClick={() => console.log(state)}>Show state</button>
  </div>
);

export default Debug;
