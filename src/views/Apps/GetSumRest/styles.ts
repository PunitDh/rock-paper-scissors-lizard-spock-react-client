import styled from "@emotion/styled";
import { Box, TextField, Theme as MuiTheme, Typography } from "@mui/material";

export const IndentedBox = styled(Box)(({ theme }: { theme: MuiTheme }) => ({
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

export const ResponsiveForm = styled.form(({ theme }: { theme: MuiTheme }) => ({
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

export const ResponsiveTypography = styled(Typography)(
  ({ theme }: { theme: MuiTheme }) => ({
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "500",
    [theme.breakpoints.up("lg")]: {
      alignSelf: "flex-start",
      textAlign: "left",
    },
  })
);

export const ResponsiveTextField = styled(TextField)(
  ({ theme }: { theme: MuiTheme }) => ({
    width: "100%",
    [theme.breakpoints.up("lg")]: {
      width: "60%",
    },
  })
);
