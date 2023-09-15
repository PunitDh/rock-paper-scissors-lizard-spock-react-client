import React, { Dispatch } from "react";
import { Dimension, SheetConfig } from "../constants";
import { TableRow } from "@mui/material";
import Cell from "./Cell";
import HeaderCell from "./HeaderCell";
import { Action, State } from "../types";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
  row: number;
}

const SheetRow = ({ state, dispatch, row }: Props) => {
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
            />
          ) : (
            <Cell
              key={id}
              id={id}
              row={row + 1}
              columnCharCode={SheetConfig.COLUMNS[column - 1].charCodeAt(0)}
              isSelected={isSelected}
              isFormulaHighLighted={isFormulaHighLighted}
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
