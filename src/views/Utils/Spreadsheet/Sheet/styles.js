import styled from "@emotion/styled";
import { Paper, TableCell } from "@mui/material";
import { Border } from "./components/Toolbar/constants";
import CellFormatting from "./models/CellFormatting";

export const HeaderItem = styled(TableCell)(({ selected, theme }) => ({
  backgroundColor: selected ? "#eee" : "#f5f6f7",
  fontWeight: "700",
  color: theme.palette.text.secondary,
  textAlign: "center",
  border: selected ? "2px solid blue" : "1px solid rgba(0,0,0,0.2)",
  borderRadius: 0,
  cursor: "cell",
  padding: "2px",
  userSelect: "none",
  overflowY: "hidden",
  "&:hover": {
    border: "2px solid blue",
  },
}));

export const Container = styled.div({
  boxShadow: "8px 8px 18px -10px rgba(0,0,0,0.5)",
});

const getBorder = (formatting) => {
  const noBorder = "1px solid rgba(0,0,0,0.2)";
  const border = "1px double rgba(0,0,0,1)";

  const initialBorder = {
    borderTop: noBorder,
    borderRight: noBorder,
    borderBottom: noBorder,
    borderLeft: noBorder,
  };

  switch (formatting.borderId) {
    case Border.BORDER_BOTTOM:
    case Border.BORDER_LEFT:
    case Border.BORDER_TOP:
    case Border.BORDER_RIGHT:
      return {
        ...initialBorder,
        [formatting.borderId]: border,
      };
    case Border.ALL_BORDERS:
      return {
        borderTop: border,
        borderRight: border,
        borderBottom: border,
        borderLeft: border,
      };
    case Border.OUTSIDE_BORDERS:
      const { borders } = formatting;
      return borders.reduce((acc, cur) => {
        return {
          ...acc,
          [cur]: border,
        };
      }, initialBorder);
    case Border.NO_BORDER:
      return initialBorder;
    default:
      return initialBorder;
  }
};

const getBorderProperties = (selected, formulacell, formatting) => {
  const getProperty = (property) =>
    selected
      ? "2px solid blue"
      : formulacell > 0
      ? "2px dashed blue"
      : getBorder(formatting)[property];

  return ["borderTop", "borderRight", "borderBottom", "borderLeft"].reduce(
    (borderProperties, property) => {
      return {
        ...borderProperties,
        [property]: getProperty(property),
      };
    },
    {}
  );
};

export const Item = styled(TableCell)(
  ({
    theme,
    selected,
    textalign,
    tabIndex,
    width,
    formulacell,
    formatting = new CellFormatting(),
  }) => {
    const borderProperties = getBorderProperties(
      selected,
      formulacell,
      formatting
    );
    return {
      backgroundColor: selected ? theme.palette.primary.light : "#fff",
      color: theme.palette.text.secondary,
      ...borderProperties,
      borderRadius: 0,
      cursor: "cell",
      height: "1.5rem",
      padding: "2px",
      overflowX: "hidden",
      position: "relative",
      whiteSpace: "nowrap",
      userSelect: "none",
      zIndex: tabIndex,
      borderCollapse: "collapse",
      width,
      textAlign: textalign,
      ...formatting,
      "&:hover": {
        // border: "2px solid blue",
        border: "2px solid blue",
      },
    };
  }
);

export const Resize = styled.div({
  "&:after": {
    content: '""',
    zIndex: "500000 !important",
    position: "absolute",
    right: "0",
    bottom: "0",
    border: "4px solid black",
    width: "1px",
    height: "1px",
    cursor: "crosshair",
    boxSizing: "border-box",
  },
});

export const CellInput = styled.input(({ selected }) => ({
  width: "100%",
  height: "100%",
  borderRadius: 0,
  position: "absolute",
  top: "0",
  left: "0",
  outline: "none",
  border: "none",
  cursor: "cell",
  backgroundColor: "transparent",
  padding: "1px",
  font: "inherit",
  color: "inherit",
  userSelect: selected ? "auto" : "none",
  "&:focus": {
    zIndex: "4 !important",
    cursor: "text",
  },
  "&:hover": {
    // border: "1px solid blue",
  },
}));

export const DivItem = styled(Paper)(({ theme, selected }) => ({
  backgroundColor: selected ? theme.palette.primary.light : "#fff",
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxSizing: "border-box",
  // outline: selected ? "2px solid blue" : "1px solid rgba(0,0,0,0.2)",
  borderRadius: 0,
  cursor: "cell",
  height: "1.5rem",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginRight: "2px",
  marginTop: "2px",
  overflowX: "visible",
  position: "relative",
  // "&:hover": {
  //   outline: "2px solid blue",
  // },
}));

export const CellDiv = styled.div(({ contentEditable }) => ({
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
    overflowX: "auto",
    position: "absolute",
    width: "auto",
    top: 0,
    left: 0,
  },
  "&:disabled": {
    backgroundColor: "transparent",
  },
  "&:hover": {
    outline: "2px solid blue",
  },
}));
