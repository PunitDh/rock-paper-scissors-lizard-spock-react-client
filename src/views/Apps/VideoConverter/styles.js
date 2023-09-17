import styled from "@emotion/styled";
import { Box, TextField, Typography } from "@mui/material";
import FlexBox from "../../../components/shared/FlexBox";

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

export const ResponsiveForm = styled.form(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "1rem",
  width: "100%",
  marginLeft: 0,
  [theme.breakpoints.up("lg")]: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: "1rem",
  },
}));

export const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  alignSelf: "center",
  textAlign: "center",
  fontWeight: "500",
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
