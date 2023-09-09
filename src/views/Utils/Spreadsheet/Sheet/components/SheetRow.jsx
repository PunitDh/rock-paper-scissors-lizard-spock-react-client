import React from "react";
import { SheetConfig } from "../constants";
import { TableRow } from "@mui/material";
import RowHeader from "./RowHeader";
import Cell from "./Cell";

const SheetRow = ({ state, dispatch, row }) => {
  return (
    <TableRow>
      {Array(state.maxColumns + 1)
        .fill(0)
        .map((_, column) => {
          const id = SheetConfig.COLUMNS[column - 1] + (row + 1);
          return column === 0 ? (
            <RowHeader
              state={state}
              dispatch={dispatch}
              key={row + 1}
              row={row + 1}
            />
          ) : (
            <Cell state={state} key={id} id={id} />
          );
        })}
    </TableRow>
  );
};

export default SheetRow;
