import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export const MessageContent = styled(Typography)({
  padding: 0,
  margin: 0,
  marginBottom: "0.25rem",
  fontSize: "0.85rem"
});

export const TimeStamp = styled(Typography)({
  font: "400 0.7rem 'Open Sans', sans-serif",
  color: "rgba(0, 0, 0, 0.5)",
  textAlign: "right",
});
