import { Box } from '@mui/material';
import React from 'react'
import { AlignItems, FlexDirection, FlexWrap, JustifyContent } from './styles';

type FlexBoxProps = {
  children: any,
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  flexDirection?: FlexDirection;
  flexWrap?: FlexWrap;
  flexGrow?: number;
  gap?: string;
  height?: string;
  width?: string;
  styles?: { [key: string]: string };
} & any

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