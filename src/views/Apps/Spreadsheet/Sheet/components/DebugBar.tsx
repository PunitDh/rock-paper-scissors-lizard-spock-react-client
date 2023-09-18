import React from "react";
import { FlexForm } from "./styles";
import styled from "@emotion/styled";
import { State } from "../types";
import { useToken } from "../../../../../hooks";

const DebugButton = styled.button({
  cursor: "pointer",
});

type Props = {
  state: State;
};

const DebugBar = ({ state }: Props) => {
  const token = useToken();
  const selectedCell: string = state.selectedCell.id;
  const cellData = state.content.data[selectedCell];
  return token.decoded?.isAdmin ? (
    <FlexForm>
      <DebugButton type="button" onClick={() => console.log(state.content)}>
        Show Content
      </DebugButton>
      <DebugButton
        type="button"
        onClick={() => console.log("cell", cellData)}
      >
        Show Current Cell
      </DebugButton>
      <DebugButton type="button" onClick={() => console.log(state)}>
        Show State
      </DebugButton>
    </FlexForm>
  ) : null;
};

export default DebugBar;
