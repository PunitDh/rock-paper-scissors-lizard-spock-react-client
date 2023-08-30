import { FlexBox } from "src/components/shared/styles";

const { Button } = require("@mui/material");
const { styled } = require("@mui/styles");

export const CalculatorBox = styled(FlexBox)({
  border: "1px solid lightgray",
  borderRadius: "0.25rem",
  margin: "0.25rem 1rem",
  textAlign: "center",
});

export const CalculatorButton = styled(Button)({
  cursor: "pointer",
  minWidth: "3rem",
  height: "3rem",
  margin: "1px",
  maxWidth: "1rem",
  textAlign: "center",
  border: "1px solid gray",
});
