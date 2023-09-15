import React, { Dispatch } from "react";
import { useEffect, useReducer } from "react";
import { initialState, reducer } from "./reducer";
import { recalculateFormulae, addMemento } from "./actions";
import { createInitialState } from "./utils/cellUtils";
import { SheetConfig } from "./constants";
import ContextMenu from "./components/ContextMenu";
import DebugBar from "./components/DebugBar";
import TestingArea from "../TestingArea";
import SheetContent from "./SheetContent";
import { EventProvider } from "./context/EventHandlerContext";
import { Action, State } from "./types";
import DashboardCard from "../../../../components/shared/DashboardCard";
import useEventHandler from "./hooks/useEventHandler";

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
  const [state, dispatch]: [state: unknown, dispatch: Dispatch<Action>] = useReducer<any, any>(reducer, initialState, () =>
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
    console.log("Sheet recalculation hook triggered");
    dispatch(recalculateFormulae());
    dispatch(addMemento());
  }, []);

  return (
    <EventProvider state={state as State} dispatch={dispatch}>
      <DashboardCard sx={{ height: "100%" }} title="Spreadsheet" subtitle={undefined} action={undefined} footer={undefined} cardheading={undefined} headtitle={undefined} headsubtitle={undefined} middlecontent={undefined}>
        {(state as State).menuAnchorElement && (
          <ContextMenu state={state as State} dispatch={dispatch} />
        )}
        <SheetContent
          state={(state as State)}
          dispatch={dispatch}
          toolbar={toolbar}
          formulaField={formulaField}
          statusField={statusField}
        />
        <DebugBar state={(state as State)} />
      </DashboardCard>
      <TestingArea state={(state as State)} />
    </EventProvider>
  );
};

export default Sheet;
