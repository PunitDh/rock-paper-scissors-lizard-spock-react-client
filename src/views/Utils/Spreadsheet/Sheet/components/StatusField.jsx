import { useEffect, useRef } from "react";
import { selectCell } from "../actions";
import styled from "@emotion/styled";
import Cell from "../models/Cell";
import { FlexForm, InputTextField } from "./styles";

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

const SmallInputField = styled(InputTextField)({
  width: "2rem",
  textAlign: "center",
  opacity: 0,
});

const StatusField = ({ state, dispatch }) => {
  const handleSubmit = (e) => e.preventDefault();

  return (
    <div tabIndex="1000">
      <FlexForm onSubmit={handleSubmit}>
        <SmallInputField type="text" autoComplete="off" />
        {/* <SheetTab>Sheet 1</SheetTab> */}
      </FlexForm>
    </div>
  );
};

export default StatusField;
