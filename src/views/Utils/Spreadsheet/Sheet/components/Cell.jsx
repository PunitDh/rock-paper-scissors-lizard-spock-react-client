import { memo } from "react";
import { Item } from "../styles";

const Cell = memo(
  ({
    id,
    row,
    columnCharCode,
    isSelected,
    isFormulaHighLighted,
    isLastHighlighted,
    maxRows,
    value,
    display,
    width,
    formatting,
  }) => (
    <Item
      colSpan={1}
      selected={isSelected}
      formulacell={Number(isFormulaHighLighted)}
      id={id}
      tabIndex={row * maxRows + (columnCharCode - 65)}
      textalign={isNaN(value) ? "left" : "right"}
      formatting={formatting}
      width={width}
    >
      {display}
    </Item>
  )
);

export default Cell;
