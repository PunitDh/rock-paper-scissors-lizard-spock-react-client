import { useEffect, useReducer } from "react";
import DashboardCard from "src/components/shared/DashboardCard";
import { Item } from "../styles";
import { initialState, reducer } from "./reducer";
import styled from "@emotion/styled";
import Cell from "./Cell";
import {
  resetHighlighted,
  setContent,
  setHighlightedAnchor,
  setHighlightedCells,
  setHighlightedCurrent,
  setInputText,
  setMenuAnchorElement,
  setMouseDown,
  setSelected,
  setSelectedColumn,
  setSelectedRow,
  setShiftKey,
} from "./actions";
import { getId, createCellRange } from "../utils";
import { KeyboardEvent, SheetConfig } from "../constants";
import ContextMenu from "./ContextMenu";
import { FlexBox } from "src/components/shared/styles";

const ColumnHeader = styled(Item)(({ selected }) => ({
  backgroundColor: selected ? "#eee" : "#ddd",
  outline: "2px solid black",
  fontWeight: "700",
  width: "4.5rem",
}));

const RowHeader = styled(Item)(({ selected }) => {
  return {
    backgroundColor: selected ? "#eee" : "#ddd",
    outline: "2px solid black",
    fontWeight: "700",
  };
});

const Sheet = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleKeyUp = (e) => {
    switch (e.key) {
      case KeyboardEvent.SHIFT:
        dispatch(setShiftKey(false));
        break;
      default:
        break;
    }
  };

  const handleKeyDown = (e) => {
    const { row, column, columnCharCode } = getId(state.selected.cell);
    const minColumn = SheetConfig.COLUMNS[0].charCodeAt(0);
    const maxColumn =
      SheetConfig.COLUMNS[SheetConfig.MAX_COLUMNS].charCodeAt(0);
    let nextRow, nextCell;

    switch (e.key) {
      case KeyboardEvent.SHIFT:
        dispatch(setHighlightedAnchor(state.selected.cell));
        dispatch(setShiftKey(true));
        nextCell = state.selected.cell;
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
        nextCell = state.selected.cell;
        break;
    }

    dispatch(setSelected(nextCell));

    if (state.shiftKey) {
      dispatch(setHighlightedCurrent(nextCell));
      const currentHighlightedCells = createCellRange(
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
      const currentHighlightedCells = createCellRange(
        state.highlighted.anchor,
        state.highlighted.current
      );
      dispatch(setHighlightedCells(currentHighlightedCells));
    }
  };

  useEffect(() => {
    dispatch(
      setInputText(
        state.content[state.selected.cell]?.formula ||
          state.content[state.selected.cell]?.value ||
          ""
      )
    );
  }, [state.selected.cell, state.content[state.selected.cell]?.value]);

  const handleInputTextChange = (e) => {
    dispatch(setContent({ cell: state.selected.cell, value: e.target.value }));
  };

  const handleFocusGuard = (e) => {
    e.preventDefault();
    e.target.blur();
    dispatch(setSelected("A1"));
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    dispatch(setMenuAnchorElement(e.currentTarget));
  };

  const handleRowHeaderClick = (e, row) => {
    dispatch(setSelectedRow(row));
  };

  const handleColumnHeaderClick = (e, column) => {
    dispatch(setSelectedColumn(column));
  };

  return (
    <DashboardCard sx={{ height: "100%" }} title="Spreadsheet">
      <input
        type="text"
        style={{ width: "100%", marginBottom: "0.2rem" }}
        value={state.inputText}
        onChange={handleInputTextChange}
        onContextMenu={handleContextMenu}
      />
      <div
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <FlexBox justifyContent="flex-start" alignItems="flex-start">
          <FlexBox flexDirection="column" alignItems="stretch">
            {Array(SheetConfig.MAX_ROWS + 1)
              .fill(0)
              .map((_, row) =>
                row === 0 ? (
                  <Item key={row}>/\</Item>
                ) : (
                  <RowHeader
                    key={row}
                    onClick={(e) => handleRowHeaderClick(e, row)}
                    selected={state.selected.row === row}
                  >
                    {row}
                  </RowHeader>
                )
              )}
          </FlexBox>
          <FlexBox flexDirection="column" width="100%">
            {state.menuAnchorElement && (
              <ContextMenu state={state} dispatch={dispatch} />
            )}

            <FlexBox width="100%" justifyContent="stretch" alignItems="stretch">
              {Array(SheetConfig.MAX_COLUMNS)
                .fill(0)
                .map((_, column) => (
                  <ColumnHeader
                    key={SheetConfig.COLUMNS[column]}
                    selected={
                      state.selected.column === SheetConfig.COLUMNS[column]
                    }
                    onClick={(e) =>
                      handleColumnHeaderClick(e, SheetConfig.COLUMNS[column])
                    }
                    onContextMenu={handleContextMenu}
                  >
                    {SheetConfig.COLUMNS[column]}
                  </ColumnHeader>
                ))}
            </FlexBox>
            <FlexBox>
              {Array(SheetConfig.MAX_COLUMNS)
                .fill(0)
                .map((_, column) => (
                  <FlexBox
                    key={SheetConfig.COLUMNS[column]}
                    flexDirection="column"
                  >
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
                  </FlexBox>
                ))}
            </FlexBox>
            <input
              type="text"
              style={{ opacity: "0", width: "1px", height: "1px" }}
              tabIndex={(SheetConfig.MAX_ROWS + 1) * SheetConfig.MAX_COLUMNS}
              onFocus={handleFocusGuard}
            />
          </FlexBox>
        </FlexBox>
      </div>
    </DashboardCard>
  );
};

export default Sheet;
