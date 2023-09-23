import { Box } from "@mui/material";
import React from "react";
import { AlignItems, FlexDirection, FlexWrap, JustifyContent } from "./styles";

type FlexBoxProps = {
  children: any;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  flexDirection?: FlexDirection;
  flexWrap?: FlexWrap;
  flexGrow?: number;
  gap?: string;
  height?: string;
  width?: string;
  cursor?: string;
  backgroundColor?: string;
  border?: string;
  borderRadius?: string;
  flex?: string;
  margin?: string;
  marginLeft?: string;
  marginTop?: string;
  padding?: string;
  paddingLeft?: string;
  paddingRight?: string;
  position?: string;
  textAlign?: string;
  styles?: { [key: string]: string };
} & any;

export function FlexBox({
  children,
  justifyContent = "center",
  alignItems = "center",
  flexDirection = "row",
  flexWrap,
  flexGrow,
  height,
  width,
  backgroundColor,
  border,
  borderRadius,
  cursor,
  flex,
  gap,
  margin,
  marginLeft,
  marginTop,
  padding,
  paddingLeft,
  paddingRight,
  position,
  textAlign,
  onClick,
}: FlexBoxProps): JSX.Element {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        justifyContent,
        alignItems,
        flexDirection,
        flexWrap,
        flexGrow,
        height,
        width,
        backgroundColor,
        border,
        borderRadius,
        cursor,
        flex,
        gap,
        margin,
        marginLeft,
        marginTop,
        padding,
        paddingLeft,
        paddingRight,
        position,
        textAlign,
      }}
    >
      {children}
    </Box>
  );
}

export default FlexBox;
