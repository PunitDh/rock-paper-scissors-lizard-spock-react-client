import styled from "@emotion/styled";
import { Box, TextField, Theme as MuiTheme, Typography } from "@mui/material";
import FlexBox from "../../../components/shared/FlexBox";

type Props = {
  theme: MuiTheme;
};

export const IndentedBox = styled(Box)(({ theme }: Props) => ({
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

type ResponsiveFlexBoxProps = {
  reversed: boolean;
} & Props;

export const ResponsiveFlexBox = styled(FlexBox)(
  ({ theme, reversed }: ResponsiveFlexBoxProps) => ({
    alignItems: reversed ? "flex-start" : "center",
    [theme.breakpoints.up("lg")]: {
      alignItems: reversed ? "center" : "flex-start",
    },
  })
);

export const ResponsiveForm = styled.form(({ theme }: Props) => ({
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

export const ResponsiveTypography = styled(Typography)(({ theme }: Props) => ({
  alignSelf: "center",
  textAlign: "center",
  fontWeight: "500",
  [theme.breakpoints.up("lg")]: {
    alignSelf: "flex-start",
    textAlign: "left",
  },
}));

export const ResponsiveTextField = styled(TextField)(({ theme }: Props) => ({
  width: "100%",
  [theme.breakpoints.up("lg")]: {
    width: "60%",
  },
}));
