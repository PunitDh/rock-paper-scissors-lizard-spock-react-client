import styled from "@emotion/styled";
import { Autocomplete, Theme as MuiTheme } from "@mui/material";
import {
  AlignItems,
  FlexDirection,
  FlexWrap,
  JustifyContent,
} from "../../../../../components/shared/styles";

export const InputTextField = styled.input({
  width: "100%",
  outline: "none",
  borderRadius: 0,
  border: "1px solid rgba(0,0,0,0.2)",
  lineHeight: "1.5rem",
});

export const SmallInputField = styled(InputTextField)({
  width: "4rem",
  textAlign: "center",
});

export const SmallAutoComplete = styled(Autocomplete)({
  outline: "none",
  borderRadius: 0,
  border: "1px solid rgba(0,0,0,0.2)",
  lineHeight: "1.5rem",
  width: "4rem",
  padding: 0,
  textAlign: "center",
});

type FlexFormProps = {
  gap?: string;
  flexWrap?: FlexWrap;
  flexDirection?: FlexDirection;
  height?: string;
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
  width?: string;
  marginLeft?: string;
  backgroundColor?: string;
  paddingRight?: string;
  paddingLeft?: string;
  borderRadius?: string;
};

export const FlexForm = styled.form(
  ({
    gap = "0.2rem",
    flexWrap,
    flexDirection = "row",
    height,
    alignItems,
    justifyContent,
    width,
    marginLeft,
    backgroundColor,
    paddingRight = "0.5rem",
    paddingLeft = "0.5rem",
    borderRadius = "0",
  }: FlexFormProps) => ({
    display: "flex",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    backgroundColor: backgroundColor || "#eaedef",
    borderRadius,
    gap,
    flexWrap,
    flexDirection,
    height,
    alignItems,
    justifyContent,
    width,
    marginLeft,
    paddingRight,
    paddingLeft,
  })
);

type FieldButtonProps = {
  variant?: string;
  theme?: MuiTheme;
  isactive?: boolean;
  width?: string;
};

export const FieldButton = styled.button(
  ({ variant, theme, isactive, width }: FieldButtonProps) => ({
    width: width || "1.75rem",
    outline: "none",
    border: isactive ? "1px solid black" : "1px solid rgba(0,0,0,0.3)",
    height: "1.75rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "3px",
    cursor: "pointer",
    color: theme?.palette[variant!]?.dark || "black",
    backgroundColor: isactive ? "#E0E9F7" : "inherit",
    "&:hover": {
      color: "blue",
      backgroundColor: "#E0E9F7",
      border: "1px solid blue",
    },
    "&:active": {
      color: theme?.palette[variant!]?.main || "black",
      backgroundColor: "#999",
      border: "1px solid black",
    },
    "&:disabled": {
      color: "#bbb",
      backgroundColor: "#eee",
    },
  })
);

export const SheetTab = styled.div({
  width: "4rem",
  backgroundColor: "white",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  alignSelf: "flex-start",
  lineHeight: "1.5rem",
  position: "relative",
  marginTop: "-0.1rem",
  zIndex: "1",
  "&:before": {
    content: '""',
    position: "absolute",
    backgroundColor: "white",
    width: "1rem",
    height: "0.1rem",
    top: -7,
    left: "-1rem",
    // outline: "1px solid red",
    border: "6px solid white",
    borderBottomColor: "rgba(255,0,0,0.1)",
    borderLeftColor: "rgba(255,0,0,0.1)",
    zIndex: "2",
  },
  "&:after": {
    content: '""',
    position: "absolute",
    backgroundColor: "white",
    width: "1rem",
    height: "0.1rem",
    top: -7,
    right: "-1rem",
    // outline: "1px solid red",
    border: "6px solid white",
    borderBottomColor: "rgba(255,0,0,0.1)",
    borderRightColor: "rgba(255,0,0,0.1)",
    zIndex: "2",
  },
});
