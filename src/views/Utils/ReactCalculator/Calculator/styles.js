import styled from "@emotion/styled";
import { Button } from "@mui/material";
import FlexBox from "../../../../components/shared/FlexBox";

export const CalculatorBox = styled(FlexBox)({
  border: "1px solid lightgray",
  borderRadius: "0.25rem",
  margin: "0.25rem 1rem",
  textAlign: "center",
});

export const CalculatorButton = styled(Button)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  minWidth: "2.5rem",
  margin: "1px",
  aspectRatio: "1/1",
  border: "1px solid gray",
  textTransform: "none",
  padding: 0,
});

export const Sup = styled("sup")({
  fontSize: "0.4rem",
});
