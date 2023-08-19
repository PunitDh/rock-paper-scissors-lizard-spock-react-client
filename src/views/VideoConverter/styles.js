import styled from "@emotion/styled";
import { Box, TextField, Typography } from "@mui/material";
import { FlexBox } from "src/components/shared/styles";

export const IndentedBox = styled(Box)(({ theme }) => ({
  marginLeft: "auto",
  marginRight: "auto",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.up("lg")]: {
    marginLeft: "2rem",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
}));

export const ResponsiveFlexBox = styled(FlexBox)(({ theme }) => ({
  alignItems: "flex-start",
  [theme.breakpoints.up("lg")]: {
    alignItems: "flex-start",
  },
}));

export const ResponsiveTypography = styled(Typography)(({ theme, bold }) => ({
  alignSelf: "center",
  textAlign: "center",
  fontWeight: bold ? "bold" : "500",
  [theme.breakpoints.up("lg")]: {
    alignSelf: "flex-start",
    textAlign: "left",
  },
}));

export const ResponsiveTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("lg")]: {
    width: "60%",
  },
}));
