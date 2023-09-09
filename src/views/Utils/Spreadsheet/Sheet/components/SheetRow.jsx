import { TableRow } from "@mui/material";
import React from "react";
import RowHeader from "./RowHeader";
import { SheetConfig } from "../constants";
import Cell from "./Cell";
import { setHovered } from "../actions";

const SheetRow = ({ state, dispatch, rowIndex }) => {
  const cellWidth = `${Math.floor((100 - 3) / state.maxColumns)}%`;

  return (
    <TableRow>
      {Array(state.maxColumns + 1)
        .fill(0)
        .map((_, colIndex) => {
          const column = SheetConfig.COLUMNS[colIndex - 1];
          const id = SheetConfig.COLUMNS[colIndex - 1] + (rowIndex + 1);
          const isFormulaHighLighted = state.formulaHighlighted.includes(id);
          const cell = state.content.data[id];
          const value = cell?.value;
          const formatting = cell?.formatting;
          const isLastHighlighted =
            id === state.highlighted.cells[state.highlighted.cells.length - 1];
          const isSelected =
            id === state.selectedCell.id ||
            state.highlighted.cells.includes(id);
          const handleMouseOver = () => {
            dispatch(setHovered(id));
          };

          return colIndex === 0 ? (
            <RowHeader
              state={state}
              dispatch={dispatch}
              key={rowIndex}
              row={rowIndex + 1}
            />
          ) : (
            <Cell
              key={id}
              id={id}
              value={value}
              width={cellWidth}
              formatting={formatting}
              textAlign={isNaN(value) ? "left" : "right"}
              tabIndex={
                (rowIndex + 1) * state.maxRows + (column.charCodeAt(0) - 65)
              }
              isSelected={isSelected}
              isFormulaHighLighted={isFormulaHighLighted}
              onMouseOver={handleMouseOver}
              isLastHighlighted={isLastHighlighted}
            />
          );
        })}
    </TableRow>
  );
};

export default SheetRow;
