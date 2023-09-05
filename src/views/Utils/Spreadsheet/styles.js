import styled from "@emotion/styled";
import { Paper } from "@mui/material";

export const Item = styled(Paper)(({ theme, selected }) => ({
  backgroundColor: selected ? theme.palette.primary.light : "#fff",
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxSizing: "border-box",
  outline: selected ? "2px solid blue" : "1px solid rgba(0,0,0,0.2)",
  borderRadius: 0,
  cursor: "cell",
  height: "1.5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginRight: "2px",
  marginTop: "2px",
  overflowX: "visible",
  "&:hover": {
    outline: "2px solid blue",
  },
}));

export const CellInput = styled.input(({ contentEditable }) => ({
  width: "100%",
  height: "100%",
  borderRadius: 0,
  outline: "none",
  border: "none",
  cursor: "cell",
  textAlign: "right",
  backgroundColor: "transparent",
  padding: "1px",
  userSelect: contentEditable ? "auto" : "none",
  "&:focus": {
    cursor: contentEditable ? "text" : "cell",
  },
  "&:disabled": {
    backgroundColor: "transparent",
  },
  "&:hover": {
    outline: "2px solid blue",
  },
}));

export const DivItem = styled(Paper)(({ theme, selected }) => ({
  backgroundColor: selected ? theme.palette.primary.light : "#fff",
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxSizing: "border-box",
  outline: selected ? "2px solid blue" : "1px solid rgba(0,0,0,0.2)",
  borderRadius: 0,
  cursor: "cell",
  height: "1.5rem",
  width: "4.5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginRight: "2px",
  marginTop: "2px",
  overflowX: "visible",
  "&:hover": {
    outline: "2px solid blue",
  },
}));

export const CellDiv = styled.div(({ contentEditable, focused }) => ({
  width: "100%",
  height: "100%",
  maxHeight: "100%",
  borderRadius: 0,
  outline: "none",
  border: "none",
  cursor: "cell",
  textAlign: "right",
  backgroundColor: "transparent",
  padding: "1px",
  userSelect: contentEditable ? "auto" : "none",
  "&:focus": {
    cursor: contentEditable ? "text" : "cell",
    zIndex: "999",
    overflowX: "visible"
  },
  "&:disabled": {
    backgroundColor: "transparent",
  },
  "&:hover": {
    outline: "2px solid blue",
  },
}));
