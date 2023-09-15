import { Box } from '@mui/material';
import React from 'react'

type FlexBoxProps = {
  children: any,
  justifyContent?: "center" | "flex-start" | "flex-end" | "space-between"
  alignItems?: "center" | "flex-start" | "flex-end" | "space-between"
  flexDirection?: "row" | "column";
  flexWrap?: "wrap" | "nowrap";
  flexGrow?: number;
  gap?: string;
  height?: string;
  width?: string;
  styles?: object;
}

export function FlexBox({
  children,
  justifyContent = "center",
  alignItems = "center",
  flexDirection = "row",
  flexWrap,
  flexGrow,
  height,
  width,
  ...styles
}: FlexBoxProps): JSX.Element {
  return (<Box sx={{ display: "flex", justifyContent, alignItems, flexWrap, flexDirection, flexGrow, height, width, ...styles, }}>
    {children}
  </Box>)
}

export default FlexBox