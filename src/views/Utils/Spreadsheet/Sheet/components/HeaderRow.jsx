import { TableHead, TableRow } from "@mui/material";
import SelectAll from "./SelectAll";
import { Dimension, SheetConfig } from "../constants";
import HeaderCell from "./HeaderCell";

const HeaderRow = ({ state, dispatch, eventHandler }) => {
  return (
    <TableHead width="100%">
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
              eventHandler={eventHandler}
            />
            // <ColumnHeader
            //   key={SheetConfig.COLUMNS[column]}
            //   state={state}
            //   dispatch={dispatch}
            //   column={SheetConfig.COLUMNS[column]}
            // />
          ))}
      </TableRow>
    </TableHead>
  );
};

export default HeaderRow;
