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
import { isCtrlKeyPressed } from "../utils/cellUtils";
import Cell from "../models/Cell";

export const handleKeyUp = (e, dispatch) => {
  switch (e.key) {
    case KeyEvent.SHIFT:
      dispatch(setHighlightCellAnchor(null));
      break;
    default:
      break;
  }
};

export const handleKeyDown = (e, state, dispatch) => {
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
      nextCell = determineNextCell(e, state, dispatch);
      e.preventDefault();
      dispatch(selectCell(nextCell));
      break;
    default:
      dispatch(setEditMode(true));
      break;
  }

  if (e.shiftKey) {
    dispatch(highlightCells(state.highlighted.cellAnchor, nextCell?.id));
  }
};

const determineNextCell = (e, state, dispatch) => {
  const { selectedCell } = state;

  if (!e.shiftKey && !state.formulaMode) {
    dispatch(resetHighlight()); // reset highlighting if conditions are met
  }

  switch (e.key) {
    case KeyEvent.ENTER:
      return e.shiftKey
        ? selectedCell.getPreviousRow(selectedCell)
        : selectedCell.getNextRow(state.maxRows);
    case KeyEvent.TAB:
      return e.shiftKey
        ? selectedCell.getPreviousColumn(state.maxColumns)
        : selectedCell.getNextColumn(state.maxRows, state.maxColumns);
    case KeyEvent.ARROW_DOWN:
      return isCtrlKeyPressed(e)
        ? new Cell(`${selectedCell.column}${state.maxRows}`)
        : selectedCell.getNextRow(state.maxRows);
    case KeyEvent.ARROW_RIGHT:
      return isCtrlKeyPressed(e)
        ? new Cell(
            `${SheetConfig.COLUMNS[state.maxColumns - 1]}${selectedCell.row}`
          )
        : selectedCell.getNextColumn(state.maxRows, state.maxColumns);
    case KeyEvent.ARROW_LEFT:
      return isCtrlKeyPressed(e)
        ? new Cell(`${SheetConfig.COLUMNS[0]}${selectedCell.row}`)
        : selectedCell.getPreviousColumn(state.maxColumns);
    case KeyEvent.ARROW_UP:
      return isCtrlKeyPressed(e)
        ? new Cell(`${selectedCell.column}${1}`)
        : selectedCell.getPreviousRow();
    default:
      break;
  }
};
