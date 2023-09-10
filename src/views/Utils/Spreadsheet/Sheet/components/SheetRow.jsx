import React from "react";
import { Dimension, SheetConfig } from "../constants";
import { TableRow } from "@mui/material";
import Cell from "./Cell";
import HeaderCell from "./HeaderCell";
import RowHeader from "./RowHeader";

const SheetRow = ({ state, dispatch, row }) => {
  return (
    <TableRow
    sx={{ tableLayout: "fixed" }}
    >
      {Array(state.maxColumns + 1)
        .fill(0)
        .map((_, column) => {
          const id = SheetConfig.COLUMNS[column - 1] + (row + 1);
          return column === 0 ? (
            <HeaderCell
              state={state}
              dispatch={dispatch}
              dimension={Dimension.ROW}
              id={row + 1}
              key={row + 1}
            />
          ) : (
            // <RowHeader
            //   state={state}
            //   dispatch={dispatch}
            //   key={row + 1}
            //   row={row + 1}
            // />
            <Cell
              state={state}
              key={id}
              id={id}
              row={row + 1}
              column={SheetConfig.COLUMNS[column - 1]}
            />
          );
        })}
    </TableRow>
  );
};

export default SheetRow;
