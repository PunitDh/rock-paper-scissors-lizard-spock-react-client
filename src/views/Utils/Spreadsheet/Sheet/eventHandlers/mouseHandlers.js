import {
  setCellContent,
  updateReferenceCells,
  setFormulaMode,
  recalculateFormulae,
  resetHighlight,
  selectCell,
  highlightCells,
  setHighlightCellAnchor,
  openContextMenu,
  setMouseDown,
  setHovered,
  addCellsToHighlight,
  highlightFormulaCellRange,
} from "../actions";
import { isCtrlKeyPressed, addCellToFocusedBox } from "../utils/cellUtils";

// export const handleClickCell = (e, id, state, dispatch) => {
//   const isLeftClick = e.button === MouseButton.LEFT_CLICK;
//   if (!isLeftClick) return;

//   const isLastValueClosedBracket = /(\))$/gi.test(
//     state.content.data[state.selectedCell.id]?.formula
//   );
//   const isLastValueOperation = /[+-/*^:,]$/gi.test(
//     state.content.data[state.selectedCell.id]?.formula
//   );
//   const isShiftOrCtrlPressed = e.shiftKey || isCtrlKeyPressed(e);
//   const isSameCellSelected = id === state.selectedCell.id;

//   const addCellsToFormula = () => {
//     const value = addCellToFocusedBox(state, id, !isCtrlKeyPressed(e));
//     dispatch(setCellContent(state.selectedCell.id, value));
//     dispatch(
//       updateReferenceCells(state.selectedCell.id, [id], !isCtrlKeyPressed(e))
//     );
//   };

//   if (state.formulaMode) {
//     if (
//       !isSameCellSelected &&
//       (!isLastValueClosedBracket || isLastValueOperation)
//     ) {
//       addCellsToFormula();
//     } else {
//       dispatch(setFormulaMode(false));
//       dispatch(recalculateFormulae());
//       dispatch(resetHighlight());
//       dispatch(selectCell(id));
//       dispatch(highlightCells(id));
//     }
//   } else {
//     if (isShiftOrCtrlPressed) {
//       if (e.shiftKey) {
//         dispatch(highlightCells(state.selectedCell.id, id));
//       }
//       if (isCtrlKeyPressed(e)) {
//         dispatch(addCellsToHighlight([id]));
//       }
//       return;
//     }
//     if (!state.mouseDown) dispatch(resetHighlight());
//     dispatch(selectCell(id));
//     dispatch(highlightCells(id));
//   }
// };

// export const handleMouseDownCell = (e, id, state, dispatch) => {
//   if (e.button === MouseButton.LEFT_CLICK) {
//     // dispatch(selectCell(id));
//     if (!state.mouseDown && !e.shiftKey && !isCtrlKeyPressed(e))
//       dispatch(resetHighlight());
//     dispatch(setHighlightCellAnchor(id));
//     if (!isCtrlKeyPressed(e)) dispatch(highlightCells(id));
//   }
// };

// export const handleContextMenuCell = (e, dispatch) => {
//   e.preventDefault();
//   dispatch(openContextMenu(e.currentTarget));
// };

// export const handleDoubleClickCell = (id, state, dispatch) => {
//   if (!state.mouseDown) dispatch(resetHighlight());
//   dispatch(selectCell(id));
// };

export const handleMouseUpSheet = (e, state, dispatch) => {
  dispatch(setMouseDown(false));
  const selectingFormulaCells =
    state.formulaMode &&
    state.formulaHighlighted.length > 1 &&
    state.highlighted.cellAnchor !== state.hovered;

  if (selectingFormulaCells) {
    const value = addCellToFocusedBox(
      state,
      `${state.highlighted.cellAnchor}:${state.hovered}`,
      !isCtrlKeyPressed(e)
    );
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
        highlightFormulaCellRange(state.highlighted.cellAnchor, state.hovered)
      );
    } else {
      dispatch(highlightCells(state.highlighted.cellAnchor, state.hovered));
    }
  }
};

export const handleContextMenuSheet = (e, dispatch) => {
  e.preventDefault();
  dispatch(openContextMenu(e.currentTarget));
};
