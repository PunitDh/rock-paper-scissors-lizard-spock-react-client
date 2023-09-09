import { useCallback, useEffect, useReducer } from "react";
import DashboardCard from "src/components/shared/DashboardCard";
import { initialState, reducer } from "./reducer";
import {
  deleteCellContent,
  highlightCells,
  setFormulaFieldText,
  openContextMenu,
  setMouseDown,
  selectCell,
  pasteCellContent,
  recalculateFormulae,
  setCellContent,
  addMemento,
  formulaHighlightCells,
  formulaHighlightCellRange,
  updateReferenceCells,
  setInputBoxFocused,
  setFormulaMode,
  resetHighlight,
  addCellsToHighlight,
  setHighlightCellAnchor,
} from "./actions";
import {
  generateClipboardContent,
  isCtrlKeyPressed,
  generateInitialContent,
  addCellToFocusedBox,
} from "./utils/cellUtils";
import { MouseButton, SheetConfig } from "./constants";
import ContextMenu from "./ContextMenu";
import ColumnHeader from "./components/ColumnHeader";
import SelectAll from "./components/SelectAll";
import { useClipboard, useToken } from "src/hooks";
import FormulaField from "./components/FormulaField";
import { Table, TableBody, TableHead, TableRow } from "@mui/material";
import StatusField from "./components/StatusField";
import { handleKeyDown, handleKeyUp } from "./eventHandlers/keyboardHandlers";
import Toolbar from "./components/Toolbar";
import AbsoluteCellInput from "./components/AbsoluteCellInput";
import SheetRow from "./components/SheetRow";
import HeaderRow from "./components/HeaderRow";
import FocusGuard from "./components/FocusGuard";
import DebugBar from "./components/DebugBar";
import { Container } from "./styles";

const Sheet = (
  props = {
    maxRows: SheetConfig.MAX_ROWS,
    maxColumns: SheetConfig.MAX_COLUMNS,
    maxUndos: 32,
    toolbar: true,
    formulaField: true,
    statusField: true,
    initialData: {},
    defaultRowHeight: 24,
    defaultColumnWidth: 50,
  }
) => {
  const createInitialState = useCallback(
    () => ({
      ...initialState,
      defaultRowHeight: props.defaultRowHeight,
      defaultColumnWidth: props.defaultColumnWidth,
      maxRows: props.maxRows,
      maxColumns: props.maxColumns,
      maxUndos: props.maxUndos,
      content: generateInitialContent(props),
    }),
    [props]
  );

  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    createInitialState
  );

  const token = useToken();
  const clipboard = useClipboard();

  useEffect(() => {
    dispatch(
      setFormulaFieldText(
        state.content.data[state.selectedCell.id]?.formula ||
          state.content.data[state.selectedCell.id]?.value ||
          ""
      )
    );
    const referenceCells =
      state.content.data[state.selectedCell.id]?.referenceCells;
    dispatch(formulaHighlightCells(referenceCells || []));
  }, [state.selectedCell.id, state.content.data]);

  useEffect(() => {
    dispatch(recalculateFormulae());
    dispatch(addMemento());
  }, []);

  const handleMouseDown = (e) => {
    const id = state.hovered;

    // If it's not a left click, then don't process further.
    if (e.button !== MouseButton.LEFT_CLICK) return;

    const formula = state.content.data[state.selectedCell.id]?.formula;
    const isLastValueClosedBracket = /(\))$/gi.test(formula);
    const isLastValueOperation = /[+-/*^:,]$/gi.test(formula);
    const isShiftPressed = e.shiftKey;
    const isCtrlPressed = isCtrlKeyPressed(e); // Add this line
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
        dispatch(formulaHighlightCells(state.hovered));
        addCellsToFormula();
      } else {
        dispatch(addCellsToHighlight(id));
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
            dispatch(resetHighlight());
            dispatch(selectCell(id));
            dispatch(highlightCells(id));
          }
        }
      } else {
        dispatch(resetHighlight());
        dispatch(selectCell(id));
      }
    }

    dispatch(setMouseDown(true));
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
    } else if (!isSameCellHighlighted) {
      dispatch(highlightCells(state.highlighted.cellAnchor, state.hovered));
    }
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (state.mouseDown && !isCtrlKeyPressed(e)) {
        if (state.formulaMode) {
          dispatch(
            formulaHighlightCellRange(
              state.highlighted.cellAnchor,
              state.hovered
            )
          );
        } else {
          dispatch(highlightCells(state.highlighted.cellAnchor, state.hovered));
        }
      }
    },
    [
      state.mouseDown,
      state.formulaMode,
      state.highlighted.cellAnchor,
      state.hovered,
    ]
  );

  const handleContextMenu = (e) => {
    e.preventDefault();
    dispatch(openContextMenu(state.hovered));
  };

  const handleCopyCapture = async (e) => {
    e.preventDefault();
    const content = generateClipboardContent(state);
    await clipboard.copy(content);
  };

  const handleCutCapture = (e) => {
    handleCopyCapture(e);
    dispatch(deleteCellContent());
    dispatch(addMemento());
  };

  const handlePasteCapture = async (e) => {
    e.preventDefault();
    const data = await clipboard.get();
    dispatch(pasteCellContent(state.selectedCell.id, data));
  };

  const handleDoubleClick = (e) => {
    dispatch(setInputBoxFocused(true));
  };

  return (
    <DashboardCard sx={{ height: "100%" }} title="Spreadsheet">
      {state.menuAnchorElement && (
        <ContextMenu state={state} dispatch={dispatch} />
      )}
      <Container>
        {props.toolbar && (
          <Toolbar
            state={state}
            dispatch={dispatch}
            onContextMenu={handleContextMenu}
          />
        )}
        {props.formulaField && (
          <FormulaField
            state={state}
            dispatch={dispatch}
            onContextMenu={handleContextMenu}
          />
        )}
        <AbsoluteCellInput state={state} dispatch={dispatch} />
        <div
          onKeyDown={(e) =>
            handleKeyDown(e, state, dispatch, props.maxRows, props.maxColumns)
          }
          onKeyUp={(e) => handleKeyUp(e, dispatch)}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onCopyCapture={handleCopyCapture}
          onPasteCapture={handlePasteCapture}
          onCutCapture={handleCutCapture}
          onDoubleClick={handleDoubleClick}
          onContextMenu={handleContextMenu}
          tabIndex={0}
        >
          <Table width="100%" sx={{ mb: 0 }}>
            <HeaderRow state={state} dispatch={dispatch} />
            <TableBody>
              {Array(props.maxRows)
                .fill(0)
                .map((_, rowIndex) => (
                  <SheetRow
                    key={rowIndex}
                    state={state}
                    dispatch={dispatch}
                    rowIndex={rowIndex}
                  />
                ))}
            </TableBody>
          </Table>
          <FocusGuard state={state} dispatch={dispatch} />
          <DebugBar state={state} />
          {props.statusField && (
            <StatusField state={state} dispatch={dispatch} />
          )}
        </div>
      </Container>
    </DashboardCard>
  );
};

export default Sheet;
