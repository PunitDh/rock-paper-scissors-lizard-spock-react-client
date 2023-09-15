import React, { Dispatch } from "react";
import { Table, TableBody } from "@mui/material";
import SheetRow from "./SheetRow";
import { Action, State } from "../types";

type Props = {
  state: State;
  dispatch: Dispatch<Action>
}

const SheetTable = ({ state, dispatch }: Props) => (
  <Table width="100%">
    <TableBody sx={{ display: "table", width: "100%", tableLayout: "fixed" }}>
      {Array(state.maxRows)
        .fill(0)
        .map((_, row) => (
          <SheetRow key={row} state={state} dispatch={dispatch} row={row} />
        ))}
    </TableBody>
  </Table>
);

export default SheetTable;
