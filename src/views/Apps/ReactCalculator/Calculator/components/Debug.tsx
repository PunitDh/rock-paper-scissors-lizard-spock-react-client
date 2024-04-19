import { State } from "../types";

type Props = {
  state: State;
};

const Debug = ({ state }: Props) => (
  <div>
    <button onClick={() => console.log(state)}>Show State</button>
  </div>
);

export default Debug;
