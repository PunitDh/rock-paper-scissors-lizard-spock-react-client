import React, { Dispatch } from "react";
import { useEffect, useReducer } from "react";
import { initialState, reducer } from "./reducer";
import { recalculateFormulae, addMemento } from "./actions";
import { createInitialState } from "./utils/cellUtils";
import ContextMenu from "./components/ContextMenu";
import DebugBar from "./components/DebugBar";
import TestingArea from "../TestingArea";
import SheetContent from "./SheetContent";
import { EventProvider } from "./context/EventHandlerContext";
import { Action, SheetProps, State } from "./types";
import DashboardCard from "../../../../components/shared/DashboardCard";
import { defaultInitialStateProps } from "./constants";

const Sheet = (props: SheetProps = defaultInitialStateProps): JSX.Element => {
  const [state, dispatch]: [state: State, dispatch: Dispatch<Action>] = useReducer(reducer, initialState, () => createInitialState(props, defaultInitialStateProps));

  useEffect(() => {
    console.log("Sheet recalculation hook triggered");
    dispatch(recalculateFormulae());
    dispatch(addMemento());
  }, []);

  return (
    <EventProvider state={state as State} dispatch={dispatch}>
      <DashboardCard sx={{ height: "100%" }} title="Spreadsheet">
        {(state).menuAnchorElement && (
          <ContextMenu state={state} dispatch={dispatch} />
        )}
        <SheetContent
          state={(state)}
          dispatch={dispatch}
          toolbar={props.toolbar || defaultInitialStateProps.toolbar}
          formulaField={props.formulaField || defaultInitialStateProps.formulaField}
          statusField={props.statusField || defaultInitialStateProps.statusField}
        />
        <DebugBar state={(state)} />
      </DashboardCard>
      <TestingArea state={(state)} />
    </EventProvider>
  );
};

export default Sheet;
