import React from "react";
import { FlexForm } from "./styles";
import styled from "@emotion/styled";
import { State } from "../types";
import { useToken } from "../../../../../hooks";

const DebugButton = styled.button({
  cursor: "pointer",
});

const DebugBar = ({ state }: { state: State }) => {
  const token = useToken();
  const selectedCell: string = state.selectedCell.id;
  const cellData = state.content.data[selectedCell]
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
              cellData.value
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
              cellData?.referenceCells
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
