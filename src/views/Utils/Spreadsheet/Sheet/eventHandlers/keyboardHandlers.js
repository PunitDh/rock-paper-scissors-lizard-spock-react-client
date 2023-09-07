import { KeyEvent, SheetConfig } from "../constants";
import {
  deleteCellContent,
  highlightCells,
  redoState,
  resetHighlight,
  selectAll,
  selectCell,
  setEditMode,
  setHighlightCurrent,
  undoState,
} from "../actions";
import {
  getCtrlKey,
  getNextColumn,
  getNextRow,
  getPreviousColumn,
  getPreviousRow,
} from "../utils/cellUtils";

export const handleKeyDown = (e, state, dispatch, maxRows, maxColumns) => {
  let nextCell;

  switch (e.key) {
    case KeyEvent.LOWERCASE_A:
      if (getCtrlKey(e)) {
        e.preventDefault();
        dispatch(selectAll());
      }
      break;
    case KeyEvent.LOWERCASE_Z:
      if (getCtrlKey(e)) {
        e.preventDefault();
        e.shiftKey ? dispatch(redoState()) : dispatch(undoState());
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

  if (e.shiftKey) {
    dispatch(setHighlightCurrent(nextCell));
    dispatch(highlightCells(state.highlighted.anchor, nextCell));
  }
};

const determineNextCell = (e, state, dispatch, maxRows, maxColumns) => {
  const { selectedCell } = state;

  switch (e.key) {
    case KeyEvent.ENTER:
      return e.shiftKey
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
      return e.shiftKey
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
      return getCtrlKey(e)
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
      return getCtrlKey(e)
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
      return getCtrlKey(e)
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
      return getCtrlKey(e)
        ? `${selectedCell.column}${1}`
        : handleNavigation(e, state, dispatch, getPreviousRow, selectedCell.id);
    default:
      break;
  }
};

const handleNavigation = (e, state, dispatch, getNextFunction, ...args) => {
  e.preventDefault();
  if (!e.shiftKey && !state.formulaMode) {
    dispatch(resetHighlight());
  }
  return getNextFunction(...args);
};
