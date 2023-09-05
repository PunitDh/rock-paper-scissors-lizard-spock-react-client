import { useEffect, useReducer } from "react";
import DashboardCard from "src/components/shared/DashboardCard";
import { initialState, reducer } from "./reducer";
import Cell from "./components/Cell";
import {
  deleteCellContent,
  resetHighlight,
  setHighlightAnchor,
  highlightCells,
  setHighlightCurrent,
  setFormulaFieldText,
  setMenuAnchorElement,
  setMouseDown,
  selectCell,
  setShiftKey,
  pasteCellContent,
  setCommandKey,
  setControlKey,
  setAltKey,
  selectAll,
  setEditMode,
} from "./actions";
import {
  generateClipboardContent,
  getNextColumn,
  getNextRow,
  getPreviousColumn,
  getPreviousRow,
} from "./utils/cellUtils";
import { KeyboardEvent, SheetConfig } from "../constants";
import ContextMenu from "./ContextMenu";
import RowHeader from "./components/RowHeader";
import ColumnHeader from "./components/ColumnHeader";
import SelectAll from "./components/SelectAll";
import { useClipboard } from "src/hooks";
import Cell2 from "./components/Cell2";
import FormulaField from "./components/FormulaField";
import { Table, TableBody, TableHead, TableRow } from "@mui/material";

const Sheet = ({
  maxRows = SheetConfig.MAX_ROWS,
  maxColumns = SheetConfig.MAX_COLUMNS,
  formulaField = true,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    maxRows,
    maxColumns,
  });
  const clipboard = useClipboard();

  const handleKeyUp = (e) => {
    switch (e.key) {
      case KeyboardEvent.SHIFT:
        dispatch(setShiftKey(false));
        break;
      case KeyboardEvent.COMMAND:
        dispatch(setCommandKey(false));
        break;
      case KeyboardEvent.CONTROL:
        dispatch(setControlKey(false));
        break;
      case KeyboardEvent.ALT:
        dispatch(setAltKey(false));
        break;
      default:
        break;
    }
  };

  const handleKeyDown = (e) => {
    let nextCell;

    switch (e.key) {
      case KeyboardEvent.COMMAND:
        return dispatch(setCommandKey(true));
      case KeyboardEvent.CONTROL:
        return dispatch(setControlKey(true));
      case KeyboardEvent.ALT:
        return dispatch(setAltKey(true));
      case KeyboardEvent.LOWERCASE_A:
        if (state.commandKey) {
          e.preventDefault();
          dispatch(selectAll());
        }
        break;
      case KeyboardEvent.BACKSPACE:
        !state.editMode && dispatch(deleteCellContent());
        break;

      case KeyboardEvent.SHIFT:
        dispatch(setHighlightAnchor(state.selected.cell));
        dispatch(setShiftKey(true));
        nextCell = state.selected.cell;
        break;

      case KeyboardEvent.ENTER:
      case KeyboardEvent.ARROW_DOWN:
        e.preventDefault();
        !state.shiftKey && !state.formulaMode && dispatch(resetHighlight());
        nextCell = getNextRow(state.selected.cell, maxRows);
        break;

      case KeyboardEvent.TAB:
      case KeyboardEvent.ARROW_RIGHT:
        e.preventDefault();
        !state.shiftKey && !state.formulaMode && dispatch(resetHighlight());
        nextCell = getNextColumn(state.selected.cell, maxRows);
        break;

      case KeyboardEvent.ARROW_LEFT:
        e.preventDefault();
        !state.shiftKey && !state.formulaMode && dispatch(resetHighlight());
        nextCell = getPreviousColumn(state.selected.cell);
        break;

      case KeyboardEvent.ARROW_UP:
        e.preventDefault();
        !state.shiftKey && !state.formulaMode && dispatch(resetHighlight());
        nextCell = getPreviousRow(state.selected.cell);
        break;
      default:
        nextCell = state.selected.cell;
        dispatch(setEditMode(true));
        break;
    }

    dispatch(selectCell(nextCell));

    if (state.shiftKey) {
      dispatch(setHighlightCurrent(nextCell));
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
      setFormulaFieldText(
        state.content[state.selected.cell]?.formula ||
          state.content[state.selected.cell]?.value ||
          ""
      )
    );
  }, [state.selected.cell, state.content]);

  const handleFocusGuard = (e) => {
    e.preventDefault();
    e.target.blur();
    dispatch(selectCell("A1"));
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    dispatch(setMenuAnchorElement(e.currentTarget));
  };

  const handleCopyCapture = async (e) => {
    e.preventDefault();
    const content = generateClipboardContent(state);
    await clipboard.copy(content);
  };

  const handleCutCapture = (e) => {
    handleCopyCapture(e);
    dispatch(deleteCellContent());
  };

  const handlePasteCapture = async (e) => {
    e.preventDefault();
    const data = await clipboard.get();
    dispatch(pasteCellContent(data, { id: state.selected.cell }));
  };

  return (
    <DashboardCard sx={{ height: "100%" }} title="Spreadsheet">
      {state.menuAnchorElement && (
        <ContextMenu state={state} dispatch={dispatch} />
      )}
      {formulaField && (
        <FormulaField
          state={state}
          dispatch={dispatch}
          onContextMenu={handleContextMenu}
        />
      )}
      <div
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onCopyCapture={handleCopyCapture}
        onPasteCapture={handlePasteCapture}
        onCutCapture={handleCutCapture}
        tabIndex={0}
      >
        <Table width="100%">
          <TableHead width="100%">
            <SelectAll
              state={state}
              dispatch={dispatch}
              onContextMenu={handleContextMenu}
            />
            {Array(maxColumns)
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
          </TableHead>
          <TableBody>
            {Array(maxRows)
              .fill(0)
              .map((_, row) => (
                <TableRow key={row}>
                  {Array(maxColumns + 1)
                    .fill(0)
                    .map((_, column) =>
                      column === 0 ? (
                        <RowHeader
                          state={state}
                          dispatch={dispatch}
                          key={row}
                          row={row + 1}
                          onContextMenu={handleContextMenu}
                        />
                      ) : (
                        <Cell
                          dispatch={dispatch}
                          state={state}
                          key={SheetConfig.COLUMNS[column - 1] + (row + 1)}
                          id={SheetConfig.COLUMNS[column - 1] + (row + 1)}
                        />
                      )
                    )}
                </TableRow>
              ))}
            <input
              type="text"
              style={{ opacity: "0", width: "1px", height: "1px" }}
              tabIndex={(maxRows + 1) * maxColumns}
              onFocus={handleFocusGuard}
            />
          </TableBody>
        </Table>
      </div>
    </DashboardCard>
  );
};

export default Sheet;
