import React, { Dispatch } from "react";
import { Table, TableBody } from "@mui/material";
import SheetRow from "./SheetRow";
import { Action, State } from "../types";

type Props = {
  state: State;
  dispatch: Dispatch<Action>
}

const SheetTable = ({ state, dispatch }: Props) => {
  return <Table width="100%" sx={{tableLayout: "fixed" }}>
    <TableBody sx={{ width: "100%" }}>
      {Array(state.maxRows)
        .fill(0)
        .map((_, row) => (
          <SheetRow key={row} state={state} dispatch={dispatch} row={row} />
        ))}
    </TableBody>
  </Table>
};

export default SheetTable;
