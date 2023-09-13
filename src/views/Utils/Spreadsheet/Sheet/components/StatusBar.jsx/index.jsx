import styled from "@emotion/styled";
import { FlexForm } from "../styles";
import { FlexBox } from "src/components/shared/styles";
import { Typography } from "@mui/material";
import DelayedTooltip from "../DelayedTooltip";
import HighlightedStats from "./HighlightedStats";

const SheetTab = styled.div({
  width: "4rem",
  backgroundColor: "white",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  alignSelf: "flex-start",
  lineHeight: "1.5rem",
  position: "relative",
  marginTop: "-0.1rem",
  zIndex: "1",
  "&:before": {
    content: '""',
    position: "absolute",
    backgroundColor: "white",
    width: "1rem",
    height: "0.1rem",
    top: -7,
    left: "-1rem",
    // outline: "1px solid red",
    border: "6px solid white",
    borderBottomColor: "rgba(255,0,0,0.1)",
    borderLeftColor: "rgba(255,0,0,0.1)",
    zIndex: "2",
  },
  "&:after": {
    content: '""',
    position: "absolute",
    backgroundColor: "white",
    width: "1rem",
    height: "0.1rem",
    top: -7,
    right: "-1rem",
    // outline: "1px solid red",
    border: "6px solid white",
    borderBottomColor: "rgba(255,0,0,0.1)",
    borderRightColor: "rgba(255,0,0,0.1)",
    zIndex: "2",
  },
});

const StatusBar = ({ state, dispatch }) => {
  const handleSubmit = (e) => e.preventDefault();
  const { average, sum, count } = state.highlighted;

  return (
    <div tabIndex="1000">
      <FlexForm
        onSubmit={handleSubmit}
        justifyContent="space-between"
        height="2rem"
      >
        <FlexBox gap="1.5rem"> </FlexBox>
        <FlexBox gap="0.75rem">
          {state.highlighted.cells.length > 1 && (
            <>
              <HighlightedStats title="Average" data={average.toFixed(5)} />
              <HighlightedStats title="Count" data={count} />
              <HighlightedStats title="Sum" data={sum} />
            </>
          )}
        </FlexBox>
      </FlexForm>
    </div>
  );
};

export default StatusBar;
