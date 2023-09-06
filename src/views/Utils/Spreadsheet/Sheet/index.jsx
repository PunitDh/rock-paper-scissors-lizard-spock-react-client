import { useEffect, useReducer } from "react";
import DashboardCard from "src/components/shared/DashboardCard";
import { initialState, reducer } from "./reducer";
import Cell from "./components/Cell";
import {
  deleteCellContent,
  highlightCells,
  setFormulaFieldText,
  setMenuAnchorElement,
  setMouseDown,
  selectCell,
  pasteCellContent,
  recalculateFormulae,
} from "./actions";
import {
  generateClipboardContent,
  getCtrlKey,
  parseInitialStateContent,
} from "./utils/cellUtils";
import { SheetConfig } from "../constants";
import ContextMenu from "./ContextMenu";
import RowHeader from "./components/RowHeader";
import ColumnHeader from "./components/ColumnHeader";
import SelectAll from "./components/SelectAll";
import { useClipboard } from "src/hooks";
import Cell2 from "./components/Cell2";
import FormulaField from "./components/FormulaField";
import { Table, TableBody, TableHead, TableRow } from "@mui/material";
import StatusField from "./components/StatusField";
import { handleKeyDown } from "./eventHandlers/keyboardHandlers";
import Toolbar from "./components/Toolbar";

const Sheet = ({
  maxRows = SheetConfig.MAX_ROWS,
  maxColumns = SheetConfig.MAX_COLUMNS,
  toolbar = true,
  formulaField = true,
  statusField = true,
  initalContent = {},
}) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    maxRows,
    maxColumns,
    content: parseInitialStateContent(initalContent),
  });
  const clipboard = useClipboard();

  const handleMouseDown = (e) => {
    // dispatch(setFormulaFieldFocused(false));
    dispatch(setMouseDown(true));
  };

  const handleMouseUp = (e) => {
    dispatch(setMouseDown(false));
  };

  const handleMouseMove = (e) => {
    if (state.mouseDown && !getCtrlKey(e)) {
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

  useEffect(() => {
    dispatch(recalculateFormulae());
  }, []);

  // const cellsToTrack = [
  //   ...new Set(
  //     Object.keys(state.content)
  //       .filter((it) => state.content[it].formula?.length > 0)
  //       .map((it) => state.content[it].formula)
  //       .map((it) => it.match(/(\w+\d+)/gi))
  //       .flat()
  //   ),
  // ].map((it) => state.content[it]?.value);

  // useEffect(() => {
  //   if (!state.formulaMode) {
  //     dispatch(recalculateFormulae())
  //   }
  // }, [...cellsToTrack])

  // console.log(cellsToTrack);

  return (
    <DashboardCard sx={{ height: "100%" }} title="Spreadsheet">
      {state.menuAnchorElement && (
        <ContextMenu state={state} dispatch={dispatch} />
      )}
      <div style={{ boxShadow: "8px 8px 18px -10px rgba(0,0,0,0.5)" }}>
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
        <div
          onKeyDown={(e) =>
            handleKeyDown(e, state, dispatch, maxRows, maxColumns)
          }
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
              <TableRow>
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
              </TableRow>
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
            </TableBody>
          </Table>
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
          {statusField && <StatusField state={state} dispatch={dispatch} />}
        </div>
      </div>
    </DashboardCard>
  );
};

export default Sheet;
