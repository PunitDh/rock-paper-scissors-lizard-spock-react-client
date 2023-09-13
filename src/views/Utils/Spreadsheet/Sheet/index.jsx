import { useReducer, useRef } from "react";
import DashboardCard from "src/components/shared/DashboardCard";
import { initialState, reducer } from "./reducer";
import { recalculateFormulae, addMemento } from "./actions";
import { createInitialState } from "./utils/cellUtils";
import { SheetConfig } from "./constants";
import ContextMenu from "./components/ContextMenu";
import { useClipboard, useEffectLog } from "src/hooks";
import DebugBar from "./components/DebugBar";
import EventHandler from "./eventHandlers/EventHandler";
import TestSheet from "../TestSheet";
import SheetContent from "./SheetContent";

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

  const clipboard = useClipboard();
  const inputFocusRef = useRef(false);

  const eventHandler = new EventHandler(
    state,
    dispatch,
    clipboard,
    inputFocusRef
  );

  useEffectLog(() => {
    dispatch(recalculateFormulae());
    dispatch(addMemento());
  }, []);

  return (
    <>
      <DashboardCard sx={{ height: "100%" }} title="Spreadsheet">
        {state.menuAnchorElement && (
          <ContextMenu state={state} dispatch={dispatch} />
        )}
        <SheetContent
          state={state}
          dispatch={dispatch}
          eventHandler={eventHandler}
          toolbar={toolbar}
          formulaField={formulaField}
          statusField={statusField}
        />
        <DebugBar state={state} />
      </DashboardCard>
      <TestSheet state={state} />
    </>
  );
};

export default Sheet;
