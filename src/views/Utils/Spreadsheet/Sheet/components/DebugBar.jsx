import { useToken } from "src/hooks";
import { FlexForm } from "./styles";
import styled from "@emotion/styled";

const DebugButton = styled.button({
  cursor: "pointer",
});

const DebugBar = ({ state }) => {
  const token = useToken();
  return (
    token.decoded.isAdmin && (
      <FlexForm>
        <DebugButton type="button" onClick={() => console.log(state.content)}>
          Show Content
        </DebugButton>
        <DebugButton
          type="button"
          onClick={() =>
            console.log(
              "cell",
              state.selectedCell.id,
              state.content.data[state.selectedCell.id]
            )
          }
        >
          Show Current Cell
        </DebugButton>
        <DebugButton
          type="button"
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
        </DebugButton>
        <DebugButton type="button" onClick={() => console.log(state)}>
          Show State
        </DebugButton>
      </FlexForm>
    )
  );
};

export default DebugBar;
