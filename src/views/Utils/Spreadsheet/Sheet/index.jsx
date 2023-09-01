import { useEffect, useReducer, useState } from "react";
import DashboardCard from "src/components/shared/DashboardCard";
import { Item } from "../styles";
import { initialState, reducer } from "./reducer";
import { Grid } from "@mui/material";
import styled from "@emotion/styled";
import Cell from "./Cell";
import {
  setCurrentEditing,
  setHighlightedCells,
  setMouseDown,
  setSelected,
} from "./actions";
import { getId, getCellMinMax } from "../utils";
import { SheetConfig } from "../constants";

const HeaderItem = styled(Item)({
  backgroundColor: "#ccc",
  outline: "2px solid black",
  fontWeight: "700",
});

const Sheet = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const columns = "ABCDEFGHIJKL";
  const [inputText, setInputText] = useState();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const { row, column } = getId(state.selected);
      dispatch(setSelected(`${column}${+row + 1}`));
    }
  };

  const handleMouseDown = (e) => {
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

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  const handleFocusGuard = (e) => {
    e.preventDefault();
    e.target.blur();
    dispatch(setSelected("A1"));
    dispatch(setCurrentEditing("A1"));
  };

  console.log({ selected: state.selected });

  useEffect(() => {
    setInputText(state.content[state.selected] || "");
  }, [state.selected, state.content[state.selected]]);

  return (
    <DashboardCard sx={{ height: "100%" }} title="Spreadsheet">
      <Grid
        container
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        // onContextMenu={handleContextMenu}
      >
        <input
          type="text"
          style={{ width: "100%", marginBottom: "0.2rem" }}
          value={inputText}
        />
        {Array(SheetConfig.MAX_COLUMNS)
          .fill(0)
          .map((_, column) => (
            <Grid item key={SheetConfig.COLUMNS[column]} xs={1} md={1}>
              <HeaderItem>{SheetConfig.COLUMNS[column]}</HeaderItem>
            </Grid>
          ))}
        {Array(SheetConfig.MAX_COLUMNS)
          .fill(0)
          .map((_, column) => (
            <Grid item xs={1} md={1} key={SheetConfig.COLUMNS[column]}>
              {Array(SheetConfig.MAX_ROWS)
                .fill(0)
                .map((_, row) => (
                  <Cell
                    dispatch={dispatch}
                    state={state}
                    key={SheetConfig.COLUMNS[column] + (row + 1)}
                    id={SheetConfig.COLUMNS[column] + (row + 1)}
                  />
                ))}
            </Grid>
          ))}
        <input
          type="text"
          style={{ opacity: "0", width: "1px", height: "1px" }}
          tabIndex={(SheetConfig.MAX_ROWS + 1) * SheetConfig.MAX_COLUMNS}
          onFocus={handleFocusGuard}
        />
      </Grid>
    </DashboardCard>
  );
};

export default Sheet;
