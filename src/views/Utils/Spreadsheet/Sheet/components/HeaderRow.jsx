import { TableHead, TableRow } from "@mui/material";
import React from "react";
import SelectAll from "./SelectAll";
import ColumnHeader from "./ColumnHeader";
import { SheetConfig } from "../constants";

const HeaderRow = ({ state, dispatch }) => (
  <TableHead width="100%">
    <TableRow>
      <SelectAll state={state} dispatch={dispatch} />
      {Array(state.maxColumns)
        .fill(0)
        .map((_, column) => (
          <ColumnHeader
            key={SheetConfig.COLUMNS[column]}
            state={state}
            dispatch={dispatch}
            column={SheetConfig.COLUMNS[column]}
          />
        ))}
    </TableRow>
  </TableHead>
);

export default HeaderRow;
