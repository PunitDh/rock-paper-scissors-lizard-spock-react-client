import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { FlexBox } from "src/components/shared/styles";

export const MessageContent = styled(Typography)({
  padding: 0,
  margin: 0,
});

export const TimeStamp = styled(FlexBox)({
  fontSize: "0.85em",
  justifyContent: "flex-end",
});
