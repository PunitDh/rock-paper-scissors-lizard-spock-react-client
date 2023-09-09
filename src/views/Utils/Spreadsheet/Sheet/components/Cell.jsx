import { memo } from "react";
import { Item } from "../styles";

const Cell = memo(({ id, state }) => {
  const { row, columnCharCode } = state.selectedCell;
  const cellData = state.content.data[id];
  const isSelected =
    id === state.selectedCell.id || state.highlighted.cells.includes(id);
  const isFormulaHighLighted = state.formulaHighlighted.includes(id);

  const isLastHighlighted =
    id === state.highlighted.cells[state.highlighted.cells.length - 1];

  return (
    <Item
      colSpan={1}
      selected={isSelected}
      formulacell={Number(isFormulaHighLighted)}
      id={id}
      tabIndex={row * state.maxRows + (columnCharCode - 65)}
      textalign={isNaN(cellData?.value) ? "left" : "right"}
      width={`${Math.floor((100 - 3) / state.maxColumns)}%`}
      formatting={cellData?.formatting}
    >
      {cellData?.display}
    </Item>
  );
});

export default Cell;
