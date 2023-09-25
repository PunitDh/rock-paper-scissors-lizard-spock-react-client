import { State } from "../types";

const Debug = ({ state }: { state: State }) => {
  return (
    <div>
      <button onClick={() => console.log(state)}>Show State</button>
    </div>
  );
};

export default Debug;
