import { memo, useMemo } from "react";
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

const Cell = ({
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
}: Props): JSX.Element => {
  console.log("Re-rendering cell:", id);
  const borderProperties = useMemo(
    () =>
      getBorderProperties(
        isSelected,
        Number(isFormulaHighlighted),
        formatting.borderId!,
        formatting.borderTypes
      ),
    [
      formatting.borderId,
      formatting.borderTypes,
      isFormulaHighlighted,
      isSelected,
    ]
  );

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
};

export default memo(Cell);
