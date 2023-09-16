import React from "react";
import { memo } from "react";
import { Item } from "../styles";
import CellFormatting from "../models/CellFormatting";
import { isNumber } from "../../../../../utils";
import { baselightTheme } from "../../../../../theme/DefaultColors";

type Props = {
  id: string
  row: number
  columnCharCode: number
  isSelected: boolean
  isFormulaHighLighted: boolean
  maxRows: number
  value: string
  display: string
  formatting: CellFormatting;
  width: number;
}

const Cell = memo(
  ({
    id,
    row,
    columnCharCode,
    isSelected,
    isFormulaHighLighted,
    maxRows,
    value,
    display,
    formatting,
    width
  }: Props) => {
    // console.log("re-rendering", id);
    return (
      <Item
        colSpan={1}
        selected={isSelected}
        formulacell={Number(isFormulaHighLighted)}
        id={id}
        tabIndex={row * maxRows + (columnCharCode - 65)}
        textalign={isNumber(value) ? "right" : "left"}
        formatting={formatting}
        width={width}
        theme={baselightTheme}
      >
        {display}
      </Item>
    );
  }
);

export default Cell;
