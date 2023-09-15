import styled from "@emotion/styled";
import { Card, TextField } from "@mui/material";

export const ResponsiveCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  height: "85dvh",
  maxWidth: "90dvw",
});

export const Bold = styled.span({
  fontWeight: "bold",
});

export const WideTextField = styled(TextField)({
  width: "100%",
});
