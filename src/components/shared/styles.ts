import styled from "@emotion/styled";
import { Card, TextField, Theme } from "@mui/material";
import FlexBox from "./FlexBox";

export type FlexDirection = "row" | "column";
export type AlignItems = "center" | "flex-start" | "flex-end" | "space-between";
export type JustifyContent =
  | "center"
  | "flex-start"
  | "flex-end"
  | "space-between"
  | "space-around";
export type FlexWrap = "wrap" | "nowrap";
export type TextAlign =
  | "left"
  | "right"
  | "center"
  | "justify"
  | "inherit"
  | "start"
  | "end";

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

type ResponsiveFlexBoxProps = {
  theme: Theme;
  reversed: boolean;
};

export const ResponsiveFlexBox = styled(FlexBox)(
  ({ theme, reversed }: ResponsiveFlexBoxProps) => ({
    alignItems: reversed ? "flex-start" : "center",
    [theme.breakpoints.up("lg")]: {
      alignItems: reversed ? "center" : "flex-start",
    },
  }),
);
