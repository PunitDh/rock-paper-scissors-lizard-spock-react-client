import { useEffect, useReducer } from "react";
import DashboardCard from "src/components/shared/DashboardCard";
import { initialState, reducer } from "./reducer";
import Cell from "./components/Cell";
import {
  deleteCellContent,
  resetHighlighted,
  setContent,
  setHighlightedAnchor,
  highlightCells,
  setHighlightedCurrent,
  setInputText,
  setMenuAnchorElement,
  setMouseDown,
  setSelected,
  setShiftKey,
  calculateContentFormula,
} from "./actions";
import {
  getId,
  getNextColumn,
  getNextRow,
  getPreviousColumn,
  getPreviousRow,
} from "../utils";
import { KeyboardEvent, SheetConfig } from "../constants";
import ContextMenu from "./ContextMenu";
import { FlexBox } from "src/components/shared/styles";
import RowHeader from "./components/RowHeader";
import ColumnHeader from "./components/ColumnHeader";
import SelectAll from "./components/SelectAll";

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
    let nextCell;

    switch (e.key) {
      case KeyboardEvent.BACKSPACE:
        !state.editMode && dispatch(deleteCellContent());
        break;

      case KeyboardEvent.SHIFT:
        dispatch(setHighlightedAnchor(state.selected.cell));
        dispatch(setShiftKey(true));
        nextCell = state.selected.cell;
        break;

      case KeyboardEvent.ENTER:
      case KeyboardEvent.ARROW_DOWN:
        e.preventDefault();
        !state.shiftKey && dispatch(resetHighlighted());
        nextCell = getNextRow(state.selected.cell);
        break;

      case KeyboardEvent.TAB:
      case KeyboardEvent.ARROW_RIGHT:
        e.preventDefault();
        !state.shiftKey && dispatch(resetHighlighted());
        nextCell = getNextColumn(state.selected.cell);
        break;

      case KeyboardEvent.ARROW_LEFT:
        e.preventDefault();
        !state.shiftKey && dispatch(resetHighlighted());
        nextCell = getPreviousColumn(state.selected.cell);
        break;

      case KeyboardEvent.ARROW_UP:
        e.preventDefault();
        !state.shiftKey && dispatch(resetHighlighted());
        nextCell = getPreviousRow(state.selected.cell);
        break;
      default:
        nextCell = state.selected.cell;
        break;
    }

    dispatch(setSelected(nextCell));

    if (state.shiftKey) {
      dispatch(setHighlightedCurrent(nextCell));
      dispatch(highlightCells(state.highlighted.anchor, nextCell));
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
      dispatch(
        highlightCells(state.highlighted.anchor, state.highlighted.current)
      );
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
  }, [state.selected.cell, state.content]);

  const handleInputTextChange = (e) => {
    dispatch(setInputText(e.target.value));
    dispatch(setContent({ cell: state.selected.cell, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setInputText(e.target.inputText.value));
    dispatch(
      calculateContentFormula({
        cell: state.selected.cell,
        value: e.target.inputText.value,
      })
    );
    dispatch(setSelected(getNextRow(state.selected.cell)));
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

  return (
    <DashboardCard sx={{ height: "100%" }} title="Spreadsheet">
      {state.menuAnchorElement && (
        <ContextMenu state={state} dispatch={dispatch} />
      )}
      <form onSubmit={handleSubmit}>
        <input
          name="inputText"
          type="text"
          style={{ width: "100%", marginBottom: "0.2rem" }}
          value={state.inputText}
          onChange={handleInputTextChange}
          onContextMenu={handleContextMenu}
          autoComplete="off"
        />
      </form>
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
                  <SelectAll
                    state={state}
                    dispatch={dispatch}
                    onContextMenu={handleContextMenu}
                    key={row}
                  />
                ) : (
                  <RowHeader
                    state={state}
                    dispatch={dispatch}
                    key={row}
                    row={row}
                    onContextMenu={handleContextMenu}
                  />
                )
              )}
          </FlexBox>
          <FlexBox flexDirection="column" width="100%">
            <FlexBox width="100%" justifyContent="stretch" alignItems="stretch">
              {Array(SheetConfig.MAX_COLUMNS)
                .fill(0)
                .map((_, column) => (
                  <ColumnHeader
                    key={column}
                    state={state}
                    dispatch={dispatch}
                    column={column}
                    onContextMenu={handleContextMenu}
                  />
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
