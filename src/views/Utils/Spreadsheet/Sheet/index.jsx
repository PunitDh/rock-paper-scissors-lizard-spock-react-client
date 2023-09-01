import { useReducer } from "react";
import DashboardCard from "src/components/shared/DashboardCard";
import { Item } from "../styles";
import { initialState, reducer } from "./reducer";
import { Grid } from "@mui/material";
import styled from "@emotion/styled";
import Cell from "./Cell";
import {
  resetHighlighted,
  setHighlightedCells,
  setMouseDown,
  setSelected,
} from "./actions";
import { getId, getMinMax as getCellMinMax } from "../utils";

const HeaderItem = styled(Item)({
  backgroundColor: "#ccc",
  outline: "2px solid black",
  fontWeight: "700",
});

const Sheet = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = "ABCDEFGHIJKL";

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const { row, column } = getId(state.selected);
      console.log({ row, column });
      dispatch(setSelected(`${column}${+row + 1}`));
    }
  };

  const handleMouseDown = (e) => {
    // dispatch(resetHighlighted());
    dispatch(setMouseDown(true));
  };

  const handleMouseUp = (e) => {
    dispatch(setMouseDown(false));
  };

  const handleMouseMove = () => {
    if (state.mouseDown) {
      const { minC, maxC, minR, maxR } = getCellMinMax([
        state.highlighted.anchor,
        state.highlighted.current,
      ]);

      let currentHighlightedCells = [];
      for (let c = minC; c <= maxC; c++) {
        for (let r = minR; r <= maxR; r++) {
          currentHighlightedCells.push(`${String.fromCharCode(c)}${r}`);
        }
      }
      dispatch(setHighlightedCells(currentHighlightedCells));
    }
  };

  return (
    <DashboardCard sx={{ height: "100%" }} title="Spreadsheet">
      <Grid
        container
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {columns.split("").map((column) => (
          <Grid item key={column} xs={1} md={1}>
            <HeaderItem>{column}</HeaderItem>
          </Grid>
        ))}
        {columns.split("").map((column) => (
          <Grid item xs={1} md={1} key={column}>
            {Array(12)
              .fill(0)
              .map((_, row) => (
                <Cell
                  dispatch={dispatch}
                  state={state}
                  key={column + (row + 1)}
                  id={column + (row + 1)}
                  row={row}
                  column={column}
                />
              ))}
          </Grid>
        ))}
      </Grid>
    </DashboardCard>
  );
};

export default Sheet;
