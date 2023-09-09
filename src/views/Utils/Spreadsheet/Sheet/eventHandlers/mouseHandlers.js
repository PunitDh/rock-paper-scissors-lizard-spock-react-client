import {
  setCellContent,
  updateReferenceCells,
  highlightCells,
  openContextMenu,
  setMouseDown,
  setHovered,
  highlightFormulaCellRange,
} from "../actions";
import { isCtrlKeyPressed, addCellToFocusedBox } from "../utils/cellUtils";

export const handleMouseUpSheet = (e, state, dispatch) => {
  dispatch(setMouseDown(false));
  const selectingFormulaCells =
    state.formulaMode &&
    state.formulaHighlighted.length > 1 &&
    state.highlighted.cellAnchor !== state.hovered;

  if (selectingFormulaCells) {
    const range = `${state.highlighted.cellAnchor}:${state.hovered}`;
    const value = addCellToFocusedBox(state, range, !isCtrlKeyPressed(e));
    dispatch(setCellContent(state.selectedCell.id, value));
    dispatch(
      updateReferenceCells(
        state.selectedCell.id,
        [state.highlighted.cellAnchor, state.hovered],
        !isCtrlKeyPressed(e)
      )
    );
  }
};

export const handleMouseMoveSheet = (e, state, dispatch) => (e) => {
  dispatch(setHovered(e.target.id));
  if (state.mouseDown && !isCtrlKeyPressed(e)) {
    if (state.formulaMode) {
      dispatch(
        highlightFormulaCellRange(
          state.highlighted.cellAnchor,
          state.hovered
        )
      );
    } else {
      dispatch(
        highlightCells(state.highlighted.cellAnchor, state.hovered)
      );
    }
  }
};

export const handleContextMenuSheet = (e, dispatch) => {
  e.preventDefault();
  dispatch(openContextMenu(e.currentTarget));
};
