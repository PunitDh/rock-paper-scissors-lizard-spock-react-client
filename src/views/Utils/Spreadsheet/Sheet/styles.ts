import styled from "@emotion/styled";
import { Paper, TableCell, TableCellProps } from "@mui/material";
import { BorderType } from "./components/Toolbar/constants";
import CellFormatting from "./models/CellFormatting";
import { Theme as MuiTheme } from "@mui/material/styles";
import { TextAlign } from "../../../../components/shared/styles";

type HeaderItemProps = {
  selected: boolean;
  theme?: MuiTheme;
};

export const HeaderItem = styled(TableCell)(
  ({ selected, theme }: HeaderItemProps) => ({
    backgroundColor: selected ? "#eee" : "#f5f6f7",
    fontWeight: "700",
    color: theme?.palette.text.secondary,
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
  })
);

export const Container = styled.div({
  boxShadow: "8px 8px 18px -10px rgba(0,0,0,0.5)",
});

const BorderStyles = Object.freeze({
  NO_BORDER: "1px solid rgba(0,0,0,0.2)",
  THIN_BORDER: "1px double rgba(0,0,0,1)",
  THICK_BORDER: "2px solid rgba(0,0,0,1)",
});

const initialBorders = {
  borderTop: BorderStyles.NO_BORDER,
  borderRight: BorderStyles.NO_BORDER,
  borderBottom: BorderStyles.NO_BORDER,
  borderLeft: BorderStyles.NO_BORDER,
};

type Borders = {
  borderTop: string;
  borderRight: string;
  borderBottom: string;
  borderLeft: string;
};

const getBorder = (formatting: CellFormatting): Borders => {
  switch (formatting.borderId) {
    case BorderType.BORDER_BOTTOM:
    case BorderType.BORDER_LEFT:
    case BorderType.BORDER_TOP:
    case BorderType.BORDER_RIGHT:
      return {
        ...initialBorders,
        [formatting.borderId]: BorderStyles.THIN_BORDER,
      };
    case BorderType.ALL_BORDERS:
      return {
        borderTop: BorderStyles.THIN_BORDER,
        borderRight: BorderStyles.THIN_BORDER,
        borderBottom: BorderStyles.THIN_BORDER,
        borderLeft: BorderStyles.THIN_BORDER,
      };
    case BorderType.OUTSIDE_BORDERS:
      return formatting.borderTypes?.reduce(
        (borders: Borders, borderPosition: string) => {
          return {
            ...borders,
            [borderPosition]: BorderStyles.THIN_BORDER,
          };
        },
        initialBorders
      ) as Borders;
    case BorderType.THICK_OUTSIDE_BORDERS:
      return formatting.borderTypes?.reduce(
        (borders: Borders, borderPosition: string) => {
          return {
            ...borders,
            [borderPosition]: BorderStyles.THICK_BORDER,
          };
        },
        initialBorders
      ) as Borders;
    case BorderType.NO_BORDER:
      return initialBorders;
    default:
      return initialBorders;
  }
};

export const getBorderProperties = (
  selected: boolean,
  formulacell: number,
  formatting: CellFormatting
): {} => {
  const getProperty = (property: string) =>
    selected
      ? "2px solid blue"
      : formulacell > 0
      ? "2px dashed blue"
      : getBorder(formatting)[property];

  return Object.keys(initialBorders).reduce((borderProperties, property) => {
    return {
      ...borderProperties,
      [property]: getProperty(property),
    };
  }, {});
};

type ItemProps = {
  theme: MuiTheme;
  selected: boolean;
  textalign: TextAlign;
  formulacell: number;
  formatting: CellFormatting;
} & TableCellProps;

export const Item = styled(TableCell)(({
  theme,
  selected,
  textalign,
  tabIndex,
  width,
  formulacell,
  formatting = new CellFormatting(),
}: ItemProps) => {
  const borderProperties = getBorderProperties(
    selected,
    formulacell,
    formatting
  );
  return {
    ...formatting,
    backgroundColor: selected
      ? theme.palette.primary.light
      : formatting.backgroundColor || "#fff",
    color: formatting.color || theme.palette.text.secondary,
    textAlign: formatting.textAlign || textalign,
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
    "&:hover": {
      // border: "2px solid blue",
      border: "2px solid blue",
    },
  };
});

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

export const CellInput = styled.input(
  ({ selected }: { selected: boolean }) => ({
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
  })
);

export const DivItem = styled(Paper)(
  ({ theme, selected }: { theme: MuiTheme; selected: boolean }) => ({
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
  })
);

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
