import React from "react";
import { selectCell } from "../actions";
import styled from "@emotion/styled";

const ZeroSizeInput = styled.input({
  opacity: "0",
  width: "1px",
  height: "1px",
  position: "absolute",
});

const FocusGuard = ({ state, dispatch }) => {
  const handleFocusGuard = (e) => {
    e.preventDefault();
    e.target.blur();
    dispatch(selectCell("A1"));
  };

  return (
    <ZeroSizeInput
      type="text"
      tabIndex={(state.maxRows + 1) * state.maxColumns}
      onFocus={handleFocusGuard}
    />
  );
};

export default FocusGuard;
