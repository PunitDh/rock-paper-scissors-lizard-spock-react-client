import { useCallback, useEffect, useReducer } from "react";
import DashboardCard from "src/components/shared/DashboardCard";
import { initialState, reducer } from "./reducer";
import Cell from "./components/Cell";
import {
  deleteCellContent,
  resetHighlight,
  setContent,
  setHighlightAnchor,
  highlightCells,
  setHighlightCurrent,
  setInputText,
  setMenuAnchorElement,
  setMouseDown,
  selectCell,
  setShiftKey,
  recalculateFormulae,
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
import { FlexBox } from "src/components/shared/styles";
import RowHeader from "./components/RowHeader";
import ColumnHeader from "./components/ColumnHeader";
import SelectAll from "./components/SelectAll";
import { useClipboard } from "src/hooks";
import Cell2 from "./components/Cell2";
import FormulaField from "./components/FormulaField";

const Sheet = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
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
        nextCell = getNextRow(state.selected.cell);
        break;

      case KeyboardEvent.TAB:
      case KeyboardEvent.ARROW_RIGHT:
        e.preventDefault();
        !state.shiftKey && !state.formulaMode && dispatch(resetHighlight());
        nextCell = getNextColumn(state.selected.cell);
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
      setInputText(
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

  const handleDragStart = (e) => {
    console.log("dragstart", e.currentTarget);
  };

  return (
    <DashboardCard sx={{ height: "100%" }} title="Spreadsheet">
      {state.menuAnchorElement && (
        <ContextMenu state={state} dispatch={dispatch} />
      )}
      <FormulaField
        state={state}
        dispatch={dispatch}
        onContextMenu={handleContextMenu}
      />
      <div
        onKeyUp={() => console.log("Keyup")}
        // onKeyUp={handleKeyUp}

        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onCopyCapture={handleCopyCapture}
        onPasteCapture={handlePasteCapture}
        onCutCapture={handleCutCapture}
        onDrag={handleDragStart}
        tabIndex={0}
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
            <FlexBox flexDirection="column" width="100%" height="100%">
              {Array(SheetConfig.MAX_ROWS)
                .fill(0)
                .map((_, row) => (
                  <FlexBox key={row} flexDirection="row" width="100%">
                    {Array(SheetConfig.MAX_COLUMNS)
                      .fill(0)
                      .map((_, column) => (
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
