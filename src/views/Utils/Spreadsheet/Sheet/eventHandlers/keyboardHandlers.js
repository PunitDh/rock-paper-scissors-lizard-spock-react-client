import { KeyEvent, SheetConfig } from "../../constants";
import {
  deleteCellContent,
  highlightCells,
  resetHighlight,
  selectAll,
  selectCell,
  setAltKey,
  setCommandKey,
  setControlKey,
  setEditMode,
  setHighlightCurrent,
  setShiftKey,
} from "../actions";
import {
  getNextColumn,
  getNextRow,
  getPreviousColumn,
  getPreviousRow,
} from "../utils/cellUtils";

const keyActions = {
  [KeyEvent.SHIFT]: setShiftKey,
  [KeyEvent.COMMAND]: setCommandKey,
  [KeyEvent.CONTROL]: setControlKey,
  [KeyEvent.ALT]: setAltKey,
};

export const handleKeyUp = (e, dispatch) => {
  const action = keyActions[e.key];
  if (action) {
    dispatch(action(false));
  }
};

export const handleKeyDown = (e, state, dispatch, maxRows, maxColumns) => {
  const action = keyActions[e.key];
  let nextCell;

  if (action) {
    return dispatch(action(true));
  }

  switch (e.key) {
    case KeyEvent.LOWERCASE_A:
      if (state.commandKey) {
        e.preventDefault();
        dispatch(selectAll());
      }
      break;
    case KeyEvent.BACKSPACE:
      if (!state.editMode) {
        dispatch(deleteCellContent());
      }
      break;
    case KeyEvent.ENTER:
    case KeyEvent.TAB:
    case KeyEvent.ARROW_DOWN:
    case KeyEvent.ARROW_RIGHT:
    case KeyEvent.ARROW_LEFT:
    case KeyEvent.ARROW_UP:
      nextCell = determineNextCell(e, state, dispatch, maxRows, maxColumns);
      e.preventDefault();
      dispatch(selectCell(nextCell));
      break;
    default:
      dispatch(setEditMode(true));
      break;
  }

  if (state.shiftKey) {
    dispatch(setHighlightCurrent(nextCell));
    dispatch(highlightCells(state.highlighted.anchor, nextCell));
  }
};

const determineNextCell = (e, state, dispatch, maxRows, maxColumns) => {
  const { commandKey, shiftKey, selectedCell } = state;

  switch (e.key) {
    case KeyEvent.ENTER:
      return shiftKey
        ? handleNavigation(e, state, dispatch, getPreviousRow, selectedCell.id)
        : handleNavigation(
            e,
            state,
            dispatch,
            getNextRow,
            selectedCell.id,
            maxRows
          );
    case KeyEvent.TAB:
      return shiftKey
        ? handleNavigation(
            e,
            state,
            dispatch,
            getPreviousColumn,
            selectedCell.id,
            maxColumns
          )
        : handleNavigation(
            e,
            state,
            dispatch,
            getNextColumn,
            selectedCell.id,
            maxRows,
            maxColumns
          );
    case KeyEvent.ARROW_DOWN:
      return commandKey
        ? `${selectedCell.column}${maxRows}`
        : handleNavigation(
            e,
            state,
            dispatch,
            getNextRow,
            selectedCell.id,
            maxRows
          );
    case KeyEvent.ARROW_RIGHT:
      return commandKey
        ? `${SheetConfig.COLUMNS[maxColumns - 1]}${selectedCell.row}`
        : handleNavigation(
            e,
            state,
            dispatch,
            getNextColumn,
            selectedCell.id,
            maxRows,
            maxColumns
          );
    case KeyEvent.ARROW_LEFT:
      return commandKey
        ? `${SheetConfig.COLUMNS[0]}${selectedCell.row}`
        : handleNavigation(
            e,
            state,
            dispatch,
            getPreviousColumn,
            selectedCell.id,
            maxColumns
          );
    case KeyEvent.ARROW_UP:
      return commandKey
        ? `${selectedCell.column}${1}`
        : handleNavigation(e, state, dispatch, getPreviousRow, selectedCell.id);
    default:
      break;
  }
};

const handleNavigation = (e, state, dispatch, getNextFunction, ...args) => {
  e.preventDefault();
  if (!state.shiftKey && !state.formulaMode) {
    dispatch(resetHighlight());
  }
  return getNextFunction(...args);
};
