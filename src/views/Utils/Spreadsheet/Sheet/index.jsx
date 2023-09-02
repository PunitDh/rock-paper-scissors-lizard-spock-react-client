import { useEffect, useReducer } from "react";
import DashboardCard from "src/components/shared/DashboardCard";
import { Item } from "../styles";
import { initialState, reducer } from "./reducer";
import { Grid } from "@mui/material";
import styled from "@emotion/styled";
import Cell from "./Cell";
import {
  resetHighlighted,
  setContent,
  setHighlightedAnchor,
  setHighlightedCells,
  setHighlightedCurrent,
  setInputText,
  setMouseDown,
  setSelected,
  setShiftKey,
} from "./actions";
import { getId, getHighlightedCells } from "../utils";
import { KeyboardEvent, SheetConfig } from "../constants";

const HeaderItem = styled(Item)({
  backgroundColor: "#ccc",
  outline: "2px solid black",
  fontWeight: "700",
});

const Sheet = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleKeyUp = (e) => {
    switch (e.key) {
      case KeyboardEvent.SHIFT:
        console.log("Shift up");

        dispatch(setShiftKey(false));
        break;
      default:
        break;
    }
  };

  const handleKeyDown = (e) => {
    const { row, column, columnCharCode } = getId(state.selected);
    const minColumn = SheetConfig.COLUMNS[0].charCodeAt(0);
    const maxColumn =
      SheetConfig.COLUMNS[SheetConfig.MAX_COLUMNS].charCodeAt(0);
    let nextRow, nextCell;

    switch (e.key) {
      case KeyboardEvent.SHIFT:
        dispatch(setHighlightedAnchor(state.selected));
        dispatch(setShiftKey(true));
        nextCell = state.selected;
        break;

      case KeyboardEvent.ENTER:
      case KeyboardEvent.ARROW_DOWN:
        e.preventDefault();
        !state.shiftKey && dispatch(resetHighlighted());
        nextCell = `${column}${
          +row === SheetConfig.MAX_ROWS ? +row : +row + 1
        }`;
        break;

      case KeyboardEvent.TAB:
      case KeyboardEvent.ARROW_RIGHT:
        e.preventDefault();
        !state.shiftKey && dispatch(resetHighlighted());
        nextRow =
          columnCharCode + 1 === maxColumn
            ? parseInt(row) === SheetConfig.MAX_ROWS
              ? 1
              : +row + 1
            : row;
        nextCell = `${
          columnCharCode + 1 === maxColumn
            ? String.fromCharCode(minColumn)
            : String.fromCharCode(columnCharCode + 1)
        }${nextRow}`;
        break;

      case KeyboardEvent.ARROW_LEFT:
        e.preventDefault();
        !state.shiftKey && dispatch(resetHighlighted());
        nextRow =
          columnCharCode === minColumn ? (+row === 1 ? row : row - 1) : row;
        nextCell = `${
          columnCharCode === minColumn
            ? String.fromCharCode(maxColumn - 1)
            : String.fromCharCode(columnCharCode - 1)
        }${nextRow}`;
        break;

      case KeyboardEvent.ARROW_UP:
        e.preventDefault();
        !state.shiftKey && dispatch(resetHighlighted());
        nextCell = `${column}${+row === 1 ? +row : +row - 1}`;
        break;
      default:
        nextCell = state.selected;
        break;
    }

    dispatch(setSelected(nextCell));

    if (state.shiftKey) {
      dispatch(setHighlightedCurrent(nextCell));
      const currentHighlightedCells = getHighlightedCells(
        state.highlighted.anchor,
        nextCell
      );
      dispatch(setHighlightedCells(currentHighlightedCells));
    } else {
      // dispatch(resetHighlighted());
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
      const currentHighlightedCells = getHighlightedCells(
        state.highlighted.anchor,
        state.highlighted.current
      );
      dispatch(setHighlightedCells(currentHighlightedCells));
    }
  };

  useEffect(() => {
    dispatch(setInputText(state.content[state.selected] || ""));
  }, [state.selected, state.content[state.selected]]);

  const handleInputTextChange = (e) => {
    dispatch(setContent({ cell: state.selected, value: e.target.value }));
  };

  const handleFocusGuard = (e) => {
    e.preventDefault();
    e.target.blur();
    dispatch(setSelected("A1"));
  };

  return (
    <DashboardCard sx={{ height: "100%" }} title="Spreadsheet">
      <Grid
        container
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <input
          type="text"
          style={{ width: "100%", marginBottom: "0.2rem" }}
          value={state.inputText}
          onChange={handleInputTextChange}
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
