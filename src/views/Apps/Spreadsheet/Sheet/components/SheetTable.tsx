import { Dispatch } from "react";
import { Table, TableBody } from "@mui/material";
import SheetRow from "./SheetRow";
import { Action, State } from "../types";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
};

const SheetTable = ({ state, dispatch }: Props) => (
  <Table sx={{ tableLayout: "fixed", width: "100%" }}>
    <TableBody sx={{ width: "100%" }}>
      {Array(state.maxRows)
        .fill(0)
        .map((_, row) => (
          <SheetRow key={row} state={state} dispatch={dispatch} row={row} />
        ))}
    </TableBody>
  </Table>
);

export default SheetTable;
