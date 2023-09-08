import { KeyEvent, SheetConfig } from "../constants";
import {
  addMemento,
  deleteCellContent,
  highlightCells,
  redoState,
  resetHighlight,
  selectAll,
  selectCell,
  setEditMode,
  setHighlightCellAnchor,
  undoState,
} from "../actions";
import {
  isCtrlKeyPressed,
  getNextColumn,
  getNextRow,
  getPreviousColumn,
  getPreviousRow,
} from "../utils/cellUtils";

export const handleKeyUp = (e, dispatch) => {
  switch (e.key) {
    case KeyEvent.SHIFT:
      dispatch(setHighlightCellAnchor(null));
      break;
    default:
      break;
  }
};

export const handleKeyDown = (e, state, dispatch, maxRows, maxColumns) => {
  let nextCell;

  switch (e.key) {
    case KeyEvent.LOWERCASE_A:
      if (isCtrlKeyPressed(e)) {
        e.preventDefault();
        dispatch(selectAll());
      }
      break;
    case KeyEvent.LOWERCASE_Z:
      if (isCtrlKeyPressed(e)) {
        e.preventDefault();
        e.shiftKey ? dispatch(redoState()) : dispatch(undoState());
      }
      break;
    case KeyEvent.SHIFT:
      dispatch(setHighlightCellAnchor(state.selectedCell.id));
      break;
    case KeyEvent.BACKSPACE:
      if (!state.editMode) {
        dispatch(deleteCellContent());
        dispatch(addMemento());
      }
      break;
    case KeyEvent.ENTER:
    case KeyEvent.TAB:
    case KeyEvent.ARROW_DOWN:
    case KeyEvent.ARROW_RIGHT:
    case KeyEvent.ARROW_LEFT:
    case KeyEvent.ARROW_UP:
      e.shiftKey &&
        !state.highlighted.cellAnchor &&
        dispatch(setHighlightCellAnchor(state.selectedCell.id));
      nextCell = determineNextCell(e, state, dispatch, maxRows, maxColumns);
      e.preventDefault();
      dispatch(selectCell(nextCell));
      break;
    default:
      dispatch(setEditMode(true));
      break;
  }

  if (e.shiftKey) {
    dispatch(highlightCells(state.highlighted.cellAnchor, nextCell));
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
      e.preventDefault();
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
      return isCtrlKeyPressed(e)
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
      return isCtrlKeyPressed(e)
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
      return isCtrlKeyPressed(e)
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
      return isCtrlKeyPressed(e)
        ? `${selectedCell.column}${1}`
        : handleNavigation(e, state, dispatch, getPreviousRow, selectedCell.id);
    default:
      break;
  }
};

const handleNavigation = (e, state, dispatch, getNextFunction, ...args) => {
  e.preventDefault();
  if (!e.shiftKey && !state.isFormulaModeActive) {
    dispatch(resetHighlight());
  }
  return getNextFunction(...args);
};
