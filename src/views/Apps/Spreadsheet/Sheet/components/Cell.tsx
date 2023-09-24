import { useMemo } from "react";
import { memo } from "react";
import { Item, getBorderProperties } from "../styles";
import CellFormatting from "../models/CellFormatting";
import { isNumber } from "../../../../../utils";
import { baselightTheme } from "../../../../../theme/DefaultColors";

type Props = {
  id: string;
  row: number;
  columnCharCode: number;
  isSelected: boolean;
  maxRows: number;
  value: string;
  display: string;
  isFormulaHighlighted: boolean;
  formatting: CellFormatting;
  width: number;
};

const Cell = memo(
  ({
    id,
    row,
    columnCharCode,
    isSelected,
    maxRows,
    value,
    display,
    isFormulaHighlighted,
    formatting = new CellFormatting(),
    width,
  }: Props) => {
    // console.log(id, formatting, "re-rendering cell formatting");
    const borderProperties = useMemo(() => {
      return getBorderProperties(
        isSelected,
        Number(isFormulaHighlighted),
        formatting.borderId!,
        formatting.borderTypes,
      );
    }, [
      formatting.borderId,
      formatting.borderTypes,
      isFormulaHighlighted,
      isSelected,
    ]);

    return (
      <Item
        colSpan={1}
        selected={isSelected}
        id={id}
        tabIndex={row * maxRows + (columnCharCode - 65)}
        textalign={isNumber(value) ? "right" : "left"}
        formatting={formatting!}
        width={width}
        theme={baselightTheme}
        borderproperties={borderProperties}
      >
        {display}
      </Item>
    );
  },
);

export default Cell;
