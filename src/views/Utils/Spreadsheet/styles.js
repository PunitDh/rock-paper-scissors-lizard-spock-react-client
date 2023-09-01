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
  "&:hover": {
    outline: "2px solid blue",
  },
}));

export const CellInput = styled.input({
  width: "100%",
  height: "100%",
  borderRadius: 0,
  outline: "none",
  border: "none",
  cursor: "cell",
  backgroundColor: "transparent",
  "&:focus": {
    cursor: "text",
  },
  "&:disabled": {
    backgroundColor: "transparent"
  }
});
