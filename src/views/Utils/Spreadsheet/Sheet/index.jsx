import { useCallback, useEffect, useReducer } from "react";
import DashboardCard from "src/components/shared/DashboardCard";
import { initialState, reducer } from "./reducer";
import {
  setFormulaFieldText,
  openContextMenu,
  setMouseDown,
  recalculateFormulae,
  addMemento,
  highlightFormulaCells,
  setCellContent,
  updateReferenceCells,
  addCellsToHighlight,
  highlightCells,
  setHighlightCellAnchor,
  setFormulaMode,
  resetHighlight,
  selectCell,
  highlightFormulaCellRange,
  setHovered,
  setInputBoxFocused,
  removeCellsFromHighlight,
} from "./actions";
import {
  addCellToFocusedBox,
  generateInitialContent,
  isCtrlKeyPressed,
} from "./utils/cellUtils";
import { MouseButton, SheetConfig } from "./constants";
import ContextMenu from "./ContextMenu";
import { useClipboard } from "src/hooks";
import FormulaField from "./components/FormulaField";
import { Table, TableBody } from "@mui/material";
import StatusField from "./components/StatusField";
import {
  handleKeyDownSheet,
  handleKeyUpSheet,
} from "./eventHandlers/keyboardHandlers";
import Toolbar from "./components/Toolbar";
import AbsoluteCellInput from "./components/AbsoluteCellInput";
import FocusGuard from "./components/FocusGuard";
import DebugBar from "./components/DebugBar";
import SheetRow from "./components/SheetRow";
import HeaderRow from "./components/HeaderRow";
import { Container } from "./styles";
import {
  handleCopyCaptureOperation,
  handleCutCaptureOperation,
  handlePasteCaptureOperation,
} from "./eventHandlers/operationHandlers";

const Sheet = ({
  maxRows = SheetConfig.MAX_ROWS,
  maxColumns = SheetConfig.MAX_COLUMNS,
  maxUndos = 32,
  toolbar = true,
  formulaField = true,
  statusField = true,
  initialData = {},
  defaultRowHeight = 24,
  defaultColumnWidth = 80,
}) => {
  const createInitialState = useCallback(
    () => ({
      ...initialState,
      defaultRowHeight,
      defaultColumnWidth,
      maxRows,
      maxColumns,
      maxUndos,
      content: generateInitialContent(
        initialData,
        defaultRowHeight,
        defaultColumnWidth,
        maxRows,
        maxColumns
      ),
    }),
    [
      defaultColumnWidth,
      defaultRowHeight,
      initialData,
      maxColumns,
      maxRows,
      maxUndos,
    ]
  );

  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    createInitialState
  );

  const clipboard = useClipboard();

  useEffect(() => {
    const selectedCellData = state.content.data[state.selectedCell.id];

    if (selectedCellData) {
      const { formula, value, referenceCells } = selectedCellData;
      dispatch(setFormulaFieldText(formula || value));
      dispatch(highlightFormulaCells(referenceCells || []));
    } else {
      dispatch(setFormulaFieldText(""));
      dispatch(highlightFormulaCells([]));
    }
  }, [state.content.data, state.selectedCell.id]);

  useEffect(() => {
    dispatch(recalculateFormulae());
    dispatch(addMemento());
  }, []);

  const handleMouseDown = (e) => {
    if (e.button !== MouseButton.LEFT_CLICK) return;
    dispatch(setMouseDown(true));
    const id = state.hovered;
    const selectedCellId = state.selectedCell.id;
    const selectedCellData = state.content.data[selectedCellId];
    const formula = selectedCellData?.formula;
    const isLastValueClosedBracket = /(\))$/gi.test(formula);
    const isLastValueOperation = /[+-/*^:,]$/gi.test(formula);
    const isShiftPressed = e.shiftKey;
    const isCtrlPressed = isCtrlKeyPressed(e);
    const isSameCellSelected = id === state.selectedCell.id;

    const addCellsToFormula = () => {
      const value = addCellToFocusedBox(state, id, !isCtrlKeyPressed(e));
      dispatch(setCellContent(state.selectedCell.id, value));
      dispatch(
        updateReferenceCells(state.selectedCell.id, [id], !isCtrlKeyPressed(e))
      );
    };

    if (isCtrlPressed) {
      if (state.formulaMode) {
        dispatch(highlightFormulaCells(state.hovered));
        addCellsToFormula();
      } else {
        if (state.highlighted.cells.includes(id)) {
          dispatch(removeCellsFromHighlight([id]));
        } else {
          dispatch(addCellsToHighlight([id]));
        }
      }
    } else if (isShiftPressed) {
      if (state.formulaMode) {
        // TODO
      } else {
        dispatch(highlightCells(state.highlighted.cellAnchor, state.hovered));
      }
    } else {
      if (state.formulaMode) {
        dispatch(setHighlightCellAnchor(id));
        if (
          !isSameCellSelected &&
          (!isLastValueClosedBracket || isLastValueOperation)
        ) {
          addCellsToFormula();
        } else {
          if (state.isFormulaFieldFocused) {
            addCellsToFormula();
          } else {
            dispatch(setFormulaMode(false));
            dispatch(recalculateFormulae());
            state.highlighted.cells.length > 0 && dispatch(resetHighlight());
            dispatch(selectCell(id));
            dispatch(highlightCells(id));
          }
        }
      } else {
        state.highlighted.cells.length > 0 && dispatch(resetHighlight());
        dispatch(selectCell(id));
        dispatch(setHighlightCellAnchor(id));
      }
    }
  };

  const handleMouseUp = (e) => {
    // Assuming you only want to process the mouse up for the left button.
    if (e.button !== MouseButton.LEFT_CLICK) return;
    dispatch(setMouseDown(false));

    const isSameCellHighlighted =
      state.highlighted.cellAnchor === state.hovered;
    const selectingFormulaCells =
      state.formulaMode &&
      state.formulaHighlighted.length > 1 &&
      !isSameCellHighlighted;

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
    } else if (!isSameCellHighlighted) {
      if (isCtrlKeyPressed(e)) {
        dispatch(addCellsToHighlight([state.hovered]));
      }
    }
  };

  const handleMouseMove = (e) => {
    dispatch(setHovered(e.target.id));
    if (state.mouseDown && !isCtrlKeyPressed(e)) {
      const { cellAnchor } = state.highlighted;
      if (state.formulaMode) {
        dispatch(highlightFormulaCellRange(cellAnchor, state.hovered));
      } else {
        dispatch(highlightCells(cellAnchor, state.hovered));
      }
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    dispatch(openContextMenu(state.hovered));
  };

  const handlePasteCapture = (e) =>
    handlePasteCaptureOperation(e, clipboard, state, dispatch);
  const handleCopyCapture = (e) =>
    handleCopyCaptureOperation(e, state, clipboard);
  const handleCutCapture = (e) => handleCutCaptureOperation(e, dispatch);
  // const handleMouseMove = (e) => handleMouseMoveSheet(e, state, dispatch);

  const handleDoubleClick = (e) => {
    dispatch(setInputBoxFocused(true));
  };

  const handleKeyUp = (e) => handleKeyUpSheet(e, dispatch);

  const handleKeyDown = (e) =>
    handleKeyDownSheet(e, state, dispatch, maxRows, maxColumns);

  return (
    <DashboardCard sx={{ height: "100%" }} title="Spreadsheet">
      {state.menuAnchorElement && (
        <ContextMenu state={state} dispatch={dispatch} />
      )}
      <Container>
        {toolbar && (
          <Toolbar
            state={state}
            dispatch={dispatch}
            onContextMenu={handleContextMenu}
          />
        )}
        {formulaField && (
          <FormulaField
            state={state}
            dispatch={dispatch}
            onContextMenu={handleContextMenu}
          />
        )}
        <AbsoluteCellInput state={state} dispatch={dispatch} />
        <div
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onCopyCapture={handleCopyCapture}
          onPasteCapture={handlePasteCapture}
          onCutCapture={handleCutCapture}
          onDoubleClick={handleDoubleClick}
          tabIndex={0}
        >
          <Table width="100%" sx={{ mb: 0 }}>
            <HeaderRow state={state} dispatch={dispatch} />
            <TableBody>
              {Array(maxRows)
                .fill(0)
                .map((_, row) => (
                  <SheetRow
                    key={row}
                    state={state}
                    dispatch={dispatch}
                    row={row}
                  />
                ))}
            </TableBody>
          </Table>
          <FocusGuard state={state} dispatch={dispatch} />
          <DebugBar state={state} />
          {statusField && <StatusField state={state} dispatch={dispatch} />}
        </div>
      </Container>
    </DashboardCard>
  );
};

export default Sheet;
