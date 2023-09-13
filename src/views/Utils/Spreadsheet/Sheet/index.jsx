import { useEffect, useReducer, useRef } from "react";
import DashboardCard from "src/components/shared/DashboardCard";
import { initialState, reducer } from "./reducer";
import {
  setFormulaFieldText,
  recalculateFormulae,
  addMemento,
  highlightFormulaCells,
} from "./actions";
import { createInitialState } from "./utils/cellUtils";
import { SheetConfig } from "./constants";
import ContextMenu from "./components/ContextMenu";
import { useClipboard } from "src/hooks";
import FormulaField from "./components/FormulaField";
import { Table, TableBody } from "@mui/material";
import StatusBar from "./components/StatusBar.jsx";
import Toolbar from "./components/Toolbar";
import AbsoluteCellInput from "./components/AbsoluteCellInput";
import FocusGuard from "./components/FocusGuard";
import DebugBar from "./components/DebugBar";
import SheetRow from "./components/SheetRow";
import HeaderRow from "./components/HeaderRow";
import { Container } from "./styles";
import EventHandler from "./eventHandlers/EventHandler";
import EventDelegator from "./eventHandlers/EventDelegator";
import TestSheet from "../TestSheet";

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
  maxDisplayRows = 12,
  maxDisplayColumns = 12,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState, () =>
    createInitialState(
      maxRows,
      maxColumns,
      maxUndos,
      initialData,
      defaultRowHeight,
      defaultColumnWidth
    )
  );

  const clipboard = useClipboard();
  const inputFocusRef = useRef(false);
  const tableBodyRef = useRef();

  const eventHandler = new EventHandler(
    state,
    dispatch,
    clipboard,
    inputFocusRef
  );

  useEffect(() => {
    dispatch(recalculateFormulae());
    dispatch(addMemento());
  }, []);

  useEffect(() => {
    const selectedCellData = state.content.data[state.selectedCell.id];
    if (selectedCellData) {
      const { formula, value, referenceCells } = selectedCellData;
      dispatch(setFormulaFieldText(formula || value));
      dispatch(highlightFormulaCells(referenceCells || []));
    } else {
      state.formulaFieldText.length && dispatch(setFormulaFieldText(""));
      dispatch(highlightFormulaCells([]));
    }
  }, [
    state.content.data,
    state.formulaFieldText.length,
    state.selectedCell.id,
  ]);

  return (
    <>
      <DashboardCard sx={{ height: "100%" }} title="Spreadsheet">
        {state.menuAnchorElement && (
          <ContextMenu state={state} dispatch={dispatch} />
        )}
        <Container>
          {toolbar && <Toolbar state={state} dispatch={dispatch} />}
          {formulaField && (
            <FormulaField
              state={state}
              dispatch={dispatch}
              eventHandler={eventHandler}
            />
          )}
          <AbsoluteCellInput
            state={state}
            dispatch={dispatch}
            tableBodyRef={tableBodyRef}
            eventHandler={eventHandler}
          />
          <EventDelegator eventHandler={eventHandler}>
            <Table width="100%" sx={{ mb: 0 }}>
              <HeaderRow
                state={state}
                dispatch={dispatch}
                eventHandler={eventHandler}
              />
            </Table>
            <Table
              width="100%"
              // sx={{
              //   display: "block",
              //   tableLayout: "fixed",
              //   height: `${maxDisplayRows * defaultRowHeight}px`,
              //   overflowY: "scroll",
              // }}
              // onScroll={handleScroll}
              // ref={tableBodyRef}
            >
              <TableBody
                sx={{ display: "table", width: "100%", tableLayout: "fixed" }}
              >
                {Array(maxRows)
                  .fill(0)
                  .map((_, row) => (
                    <SheetRow
                      key={row}
                      state={state}
                      dispatch={dispatch}
                      row={row}
                      eventHandler={eventHandler}
                    />
                  ))}
              </TableBody>
            </Table>
            <FocusGuard state={state} dispatch={dispatch} />
            {statusField && <StatusBar state={state} dispatch={dispatch} />}
          </EventDelegator>
          <DebugBar state={state} tableBodyRef={tableBodyRef} />
        </Container>
      </DashboardCard>
      <TestSheet state={state} />
    </>
  );
};

export default Sheet;
