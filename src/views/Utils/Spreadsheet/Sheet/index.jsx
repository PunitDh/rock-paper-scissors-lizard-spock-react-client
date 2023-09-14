import { useEffect, useReducer } from "react";
import DashboardCard from "src/components/shared/DashboardCard";
import { initialState, reducer } from "./reducer";
import { recalculateFormulae, addMemento } from "./actions";
import { createInitialState } from "./utils/cellUtils";
import { SheetConfig } from "./constants";
import ContextMenu from "./components/ContextMenu";
import DebugBar from "./components/DebugBar";
import TestingArea from "../TestingArea";
import SheetContent from "./SheetContent";
import { EventProvider } from "./context/EventHandlerContext";

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

  useEffect(() => {
    dispatch(recalculateFormulae());
    dispatch(addMemento());
  }, []);

  return (
    <EventProvider state={state} dispatch={dispatch}>
      <DashboardCard sx={{ height: "100%" }} title="Spreadsheet">
        {state.menuAnchorElement && (
          <ContextMenu state={state} dispatch={dispatch} />
        )}
        <SheetContent
          state={state}
          dispatch={dispatch}
          toolbar={toolbar}
          formulaField={formulaField}
          statusField={statusField}
        />
        <DebugBar state={state} />
      </DashboardCard>
      <TestingArea state={state} />
    </EventProvider>
  );
};

export default Sheet;
