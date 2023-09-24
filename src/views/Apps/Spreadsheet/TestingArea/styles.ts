import styled from "@emotion/styled";
import { Paper, Theme as MuiTheme } from "@mui/material";
import { JustifyContent } from "../../../../components/shared/styles";

type ItemProps = {
  theme: MuiTheme;
  selected: boolean;
  justifyContent: JustifyContent;
};

export const CellItem = styled(Paper)(
  ({ theme, selected, justifyContent = "center" }: ItemProps) => ({
    backgroundColor: selected ? theme.palette.primary.light : "#fff",
    color: theme.palette.text.secondary,
    boxSizing: "border-box",
    border: "none",
    outline: selected ? "2px solid blue" : "1px solid rgba(0,0,0,0.2)",
    borderRadius: 0,
    cursor: "cell",
    height: "1.5rem",
    display: "flex",
    justifyContent,
    padding: "2px",
    alignItems: "center",
    marginRight: "2px",
    marginTop: "2px",
    width: "100%",
    overflowX: "hidden",
    position: "relative",
    whiteSpace: "nowrap",
    zIndex: "5",
    "&:hover": {
      outline: "2px solid blue",
    },
  }),
);

export const Resize = styled.div({
  "&:after": {
    content: '""',
    zIndex: "5 !important",
    position: "absolute",
    right: "0",
    bottom: "0",
    border: "4px solid black",
    width: "1px",
    height: "1px",
    cursor: "crosshair",
  },
});

type CellInputProps = {
  selected: boolean;
};

export const CellInput = styled.input(({ selected }: CellInputProps) => ({
  width: "100%",
  height: "100%",
  borderRadius: 0,
  boxSizing: "border-box",
  position: "absolute",
  top: "0",
  left: "0",
  outline: "none",
  border: "none",
  cursor: "cell",
  // textAlign: "right",
  backgroundColor: "transparent",
  padding: "1px",
  font: "inherit",
  color: "inherit",
  userSelect: selected ? "auto" : "none",
  "&:focus": {
    zIndex: "4 !important",
    cursor: "text",
    overflowX: "auto",
    width: "auto",
  },
  "&:disabled": {
    backgroundColor: "transparent",
  },
  "&:hover": {
    outline: "2px solid blue",
  },
}));
