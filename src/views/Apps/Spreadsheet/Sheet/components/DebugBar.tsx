import React from "react";
import { FlexForm } from "./styles";
import styled from "@emotion/styled";
import { State } from "../types";
import { useToken } from "../../../../../hooks";
import CellData from "../models/CellData";
import { objectOf } from "../../../../../utils/Object";

const DebugButton = styled.button({
  cursor: "pointer",
});

type Props = {
  state: State;
};

const DebugBar = ({ state }: Props) => {
  const token = useToken();
  const selectedCell: string = state.selectedCell.id;
  const cellData = state.sheets[state.activeSheet].content.data[selectedCell];

  const testObj = objectOf({
    A1: new CellData({ id: "A1" }),
    B1: new CellData({ id: "B1" }),
    G1: new CellData({ id: "G1" }),
    D1: new CellData({ id: "D1" }),
    E1: new CellData({ id: "E1" }),
    F1: new CellData({ id: "F1" }),
  });

  const testObj1 = objectOf({
    A2: new CellData({ id: "A1" }),
  });

  return token.decoded?.isAdmin ? (
    <FlexForm>
      <DebugButton
        type="button"
        onClick={() => console.log(state.sheets[state.activeSheet].content)}
      >
        Show Content
      </DebugButton>
      <DebugButton type="button" onClick={() => console.log("cell", cellData)}>
        Show Current Cell
      </DebugButton>
      <DebugButton type="button" onClick={() => console.log(state)}>
        Show State
      </DebugButton>
      <DebugButton
        type="button"
        onClick={() => {
          const cellA1 = new CellData({ id: "A1" });
          console.log(testObj1.findKey(cellA1));
        }}
      >
        Test Object
      </DebugButton>
    </FlexForm>
  ) : null;
};

export default DebugBar;
