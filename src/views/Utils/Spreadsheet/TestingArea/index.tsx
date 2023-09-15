import React from "react";
import styled from "@emotion/styled";
import useEventHandler from "../Sheet/hooks/useEventHandler";
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

const Contente = styled.div({
  position: "absolute",
  top: "14px",
  left: "0px",
  width: "100%",
  textAlign: "center",
});

type Props = {
  label: string
  children: any
}

const StatusCell = function ({ label, children }: Props) {
  return (
    <CellContainer>
      <CellLabel>{label}</CellLabel>
      <Contente>{children}</Contente>
    </CellContainer>
  );
};

const TestingArea = ({ state }: { state: State }) => {
  const token = useToken();
  const eventHandler = useEventHandler();

  return token.decoded.isAdmin ? (
    <DashboardCard sx={{ height: "100%" }} title="Testing Area" subtitle={undefined} action={undefined} footer={undefined} cardheading={undefined} headtitle={undefined} headsubtitle={undefined} middlecontent={undefined}>
      <FlexBox width="100%" height="100%" gap="0.5rem">
        {/* <StatusCell label="Keyboard">{keyboard && keyboard.key}</StatusCell>
        <StatusCell label="Mouse button">{mouse && mouse.buttons}</StatusCell>
        <StatusCell label="MouseDown">{String(state.mouseDown)}</StatusCell> */}
        <StatusCell label="Hovered">{state.hovered}</StatusCell>

        <StatusCell label="Current Cell">{state.selectedCell.id}</StatusCell>
        <StatusCell label="Highlighted Anchor">
          {state.highlighted.cellAnchor}
        </StatusCell>
        <StatusCell label="Highlighted Cells">
          {state.highlighted.cells.join(",")}
        </StatusCell>
        <StatusCell label="Filler Mode">{String(state.fillerMode)}</StatusCell>
        <StatusCell label="Formula Mode">
          {String(state.formulaMode)}
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
