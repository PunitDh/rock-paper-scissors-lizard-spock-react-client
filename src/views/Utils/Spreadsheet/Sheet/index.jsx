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
import StatusField from "./components/StatusField";

const Sheet = ({
  maxRows = SheetConfig.MAX_ROWS,
  maxColumns = SheetConfig.MAX_COLUMNS,
  formulaField = true,
  statusField = true,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    maxRows,
    maxColumns,
  });
  const clipboard = useClipboard();

  const keyUpActions = {
    [KeyboardEvent.SHIFT]: setShiftKey,
    [KeyboardEvent.COMMAND]: setCommandKey,
    [KeyboardEvent.CONTROL]: setControlKey,
    [KeyboardEvent.ALT]: setAltKey,
  };

  const handleKeyUp = (e) => {
    const keyAction = keyUpActions[e.key];
    if (keyAction) {
      dispatch(keyAction(false));
    }
  };

  const handleSpecialKey = (keyAction) => {
    dispatch(keyAction(true));
  };

  const handleNavigation = (e, getNextFunction, ...args) => {
    e.preventDefault();
    if (!state.shiftKey && !state.formulaMode) {
      dispatch(resetHighlight());
    }
    return getNextFunction(...args);
  };

  const handleShiftRelatedNavigation = (e, getNextFunction, ...args) => {
    e.preventDefault();
    if (!state.formulaMode) {
      dispatch(resetHighlight());
    }
    return getNextFunction(...args);
  };

  const handleKeyDown = (e) => {
    let nextCell;

    switch (e.key) {
      case KeyboardEvent.COMMAND:
        return handleSpecialKey(setCommandKey);
      case KeyboardEvent.CONTROL:
        return handleSpecialKey(setControlKey);
      case KeyboardEvent.ALT:
        return handleSpecialKey(setAltKey);
      case KeyboardEvent.LOWERCASE_A:
        if (state.commandKey) {
          e.preventDefault();
          dispatch(selectAll());
        }
        break;
      case KeyboardEvent.BACKSPACE:
        if (!state.editMode) {
          dispatch(deleteCellContent());
        }
        break;
      case KeyboardEvent.SHIFT:
        console.log(state.highlighted.cells);
        if (state.highlighted.cells.length === 0)
          dispatch(setHighlightAnchor(state.selectedCell.id));
        dispatch(setShiftKey(true));
        break;
      case KeyboardEvent.ENTER:
        if (state.shiftKey) {
          nextCell = handleShiftRelatedNavigation(
            e,
            getPreviousRow,
            state.selectedCell.id
          );
          dispatch(selectCell(nextCell));
        } else {
          nextCell = handleNavigation(
            e,
            getNextRow,
            state.selectedCell.id,
            maxRows
          );
          dispatch(selectCell(nextCell));
        }
        break;
      case KeyboardEvent.TAB:
        if (state.shiftKey) {
          nextCell = handleShiftRelatedNavigation(
            e,
            getPreviousColumn,
            state.selectedCell.id,
            maxColumns
          );
          dispatch(selectCell(nextCell));
        } else {
          nextCell = handleNavigation(
            e,
            getNextColumn,
            state.selectedCell.id,
            maxRows,
            maxColumns
          );
          dispatch(selectCell(nextCell));
        }
        break;
      case KeyboardEvent.ARROW_DOWN:
        nextCell = handleNavigation(
          e,
          getNextRow,
          state.selectedCell.id,
          maxRows
        );
        dispatch(selectCell(nextCell));
        break;
      case KeyboardEvent.ARROW_RIGHT:
        nextCell = handleNavigation(
          e,
          getNextColumn,
          state.selectedCell.id,
          maxRows,
          maxColumns
        );
        dispatch(selectCell(nextCell));
        break;
      case KeyboardEvent.ARROW_LEFT:
        nextCell = handleNavigation(
          e,
          getPreviousColumn,
          state.selectedCell.id,
          maxColumns
        );
        dispatch(selectCell(nextCell));
        break;
      case KeyboardEvent.ARROW_UP:
        nextCell = handleNavigation(e, getPreviousRow, state.selectedCell.id);
        dispatch(selectCell(nextCell));
        break;
      default:
        dispatch(setEditMode(true));
        break;
    }

    if (state.shiftKey) {
      dispatch(setHighlightCurrent(nextCell));
      dispatch(highlightCells(state.highlighted.anchor, nextCell));
    } else {
      // dispatch(resetHighlighted());
    }
  };

  const handleMouseDown = (e) => {
    // dispatch(setFormulaFieldFocused(false));
    dispatch(setMouseDown(true));
  };

  const handleMouseUp = (e) => {
    dispatch(setMouseDown(false));
  };

  const handleMouseMove = () => {
    if (state.mouseDown && !state.commandKey) {
      dispatch(
        highlightCells(state.highlighted.anchor, state.highlighted.current)
      );
    }
  };

  useEffect(() => {
    dispatch(
      setFormulaFieldText(
        state.content[state.selectedCell.id]?.formula ||
          state.content[state.selectedCell.id]?.value ||
          ""
      )
    );
  }, [state.selectedCell.id, state.content]);

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
    dispatch(pasteCellContent({ id: state.selectedCell.id }, data));
  };

  return (
    <DashboardCard sx={{ height: "100%" }} title="Spreadsheet">
      {state.menuAnchorElement && (
        <ContextMenu state={state} dispatch={dispatch} />
      )}
      <div style={{ boxShadow: "8px 8px 18px -10px rgba(0,0,0,0.5)" }}>
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
          <Table width="100%" sx={{ mb: 0 }}>
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
                style={{
                  opacity: "0",
                  width: "1px",
                  height: "1px",
                  position: "absolute",
                }}
                tabIndex={(maxRows + 1) * maxColumns}
                onFocus={handleFocusGuard}
              />
            </TableBody>
          </Table>
          {statusField && <StatusField state={state} dispatch={dispatch} />}
        </div>
      </div>
    </DashboardCard>
  );
};

export default Sheet;
