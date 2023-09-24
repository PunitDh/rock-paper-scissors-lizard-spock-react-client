import { Dispatch } from "react";
import { TableHead, TableRow } from "@mui/material";
import SelectAll from "./SelectAll";
import { Dimension, SheetConfig } from "../constants";
import HeaderCell from "./HeaderCell";
import { Action, State } from "../types";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
};

const HeaderRow = ({ state, dispatch }: Props): JSX.Element => (
  <TableHead sx={{ width: "100%" }}>
    <TableRow>
      <SelectAll state={state} dispatch={dispatch} />
      {Array(state.maxColumns)
        .fill(0)
        .map((_, column) => (
          <HeaderCell
            key={SheetConfig.COLUMNS[column]}
            state={state}
            dispatch={dispatch}
            id={SheetConfig.COLUMNS[column]}
            dimension={Dimension.COLUMN}
          />
        ))}
    </TableRow>
  </TableHead>
);

export default HeaderRow;
