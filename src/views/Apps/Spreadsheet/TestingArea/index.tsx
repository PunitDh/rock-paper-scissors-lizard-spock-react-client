import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import DashboardCard from "../../../../components/shared/DashboardCard";
import FlexBox from "../../../../components/shared/FlexBox";
import { useToken } from "../../../../hooks";
import { State } from "../Sheet/types";

const CellContainer = styled.div({
  width: "6.5rem",
  height: "2.5rem",
  border: "1px solid black",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "cell",
  position: "relative",
});

const CellLabel = styled.div({
  position: "absolute",
  top: "-2px",
  left: "0px",
  width: "100%",
  textAlign: "center",
  color: "darkblue",
  fontSize: "8px",
});

const Content = styled.div({
  position: "absolute",
  top: "14px",
  left: "0px",
  width: "100%",
  textAlign: "center",
});

type Props = {
  label: string;
  children: any;
};

const StatusCell = ({ label, children }: Props): JSX.Element => (
  <CellContainer>
    <CellLabel>{label}</CellLabel>
    <Content>{children}</Content>
  </CellContainer>
);

const TestingArea = ({ state }: { state: State }): JSX.Element | null => {
  const token = useToken();
  const [keyboard, setKeyboard] = useState("");

  useEffect(() => {
    const handlekey = (e: KeyboardEvent) => {
      setKeyboard(e.key);
    };
    window.addEventListener("keydown", handlekey);

    return () => {
      console.log("Debug key listener removed");
      window.removeEventListener("keydown", handlekey);
    };
  }, []);

  return token.decoded?.isAdmin ? (
    <DashboardCard sx={{ height: "100%" }} title="Testing Area">
      <FlexBox width="100%" height="100%" gap="0.5rem" flexWrap="wrap">
        {/* <StatusCell label="Test Obj">{state.selectedCell.id}</StatusCell> */}
        <StatusCell label="Keyboard">{keyboard}</StatusCell>
        {/* <StatusCell label="Mouse button">{mouse}</StatusCell> */}
        {/* <StatusCell label="MouseDown">{String(state.mouseDown)}</StatusCell>

        <StatusCell label="Hovered">{state.hovered}</StatusCell> */}
        <StatusCell label="Current Cell">{state.selectedCell.id}</StatusCell>
        <StatusCell label="Highlighted Anchor">
          {state.highlighted.cellAnchor}
        </StatusCell>
        <StatusCell label="Highlighted Anchor">
          {state.highlighted.cellAnchor}
        </StatusCell>
        <StatusCell label="Highlighted Cells">
          {state.highlighted.cells.toArray().join(",")}
        </StatusCell>
        <StatusCell label="Filler Mode">{String(state.fillerMode)}</StatusCell>
        <StatusCell label="Formula Mode">
          {String(state.formulaMode)}
        </StatusCell>
        <StatusCell label="Multi Select">
          {String(state.highlighted.multiSelect)}
        </StatusCell>
        <StatusCell label="Active Sheet">
          {String(state.activeSheet)}
        </StatusCell>
        {/* <StatusCell label="Selection Range">
          {eventHandler.formulaFieldRef.selectionStart},
          {eventHandler.formulaFieldRef.selectionEnd}
        </StatusCell> */}
      </FlexBox>
    </DashboardCard>
  ) : null;
};

export default TestingArea;
