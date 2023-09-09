import React from "react";
import { useToken } from "src/hooks";

const DebugBar = ({ state }) => {
  const token = useToken();
  return (
    token.decoded.isAdmin && (
      <>
        <button onClick={() => console.log(state.content)}>Show Content</button>
        <button
          onClick={() =>
            console.log(
              "cell",
              state.selectedCell.id,
              state.content.data[state.selectedCell.id]
            )
          }
        >
          Show Current Cell
        </button>
        <button
          onClick={() => {
            console.log("cell", state.selectedCell.id);
            console.log("formulahighlighted", state.formulaHighlighted);
            console.log(
              "referencecells",
              state.content.data[state.selectedCell.id]?.referenceCells
            );
          }}
        >
          Show FormulaHighlighted
        </button>
        <button onClick={() => console.log(state)}>Show State</button>
      </>
    )
  );
};

export default DebugBar;
