import React from "react";
import { Dimension, SheetConfig } from "../constants";
import { TableRow } from "@mui/material";
import Cell from "./Cell";
import HeaderCell from "./HeaderCell";

const SheetRow = ({ state, dispatch, row, eventHandler }) => {
  return (
    <TableRow sx={{ tableLayout: "fixed" }}>
      {Array(state.maxColumns + 1)
        .fill(0)
        .map((_, column) => {
          const id = SheetConfig.COLUMNS[column - 1] + (row + 1);
          const cellData = state.content.data[id];
          const isSelected =
            id === state.selectedCell.id ||
            state.highlighted.cells.includes(id);
          const isFormulaHighLighted = state.formulaHighlighted.includes(id);
          const isLastHighlighted =
            id === state.highlighted.cells[state.highlighted.cells.length - 1];
          const width =
            state.content.columnWidths[SheetConfig.COLUMNS[column - 1]] ||
            state.defaultColumnWidth;

          return column === 0 ? (
            <HeaderCell
              state={state}
              dispatch={dispatch}
              dimension={Dimension.ROW}
              id={row + 1}
              key={row + 1}
              eventHandler={eventHandler}
            />
          ) : (
            <Cell
              key={id}
              id={id}
              row={row + 1}
              columnCharCode={SheetConfig.COLUMNS[column - 1].charCodeAt(0)}
              isSelected={isSelected}
              isFormulaHighLighted={isFormulaHighLighted}
              isLastHighlighted={isLastHighlighted}
              maxRows={state.maxRows}
              value={cellData?.value}
              display={cellData?.display}
              width={width}
              formatting={cellData?.formatting}
            />
          );
        })}
    </TableRow>
  );
};

export default SheetRow;
