import { Table } from "@mui/material";
import AbsoluteCellInput from "./components/AbsoluteCellInput";
import Toolbar from "./components/Toolbar";
import EventDelegator from "./eventHandlers/EventDelegator";
import { Container } from "./styles";
import HeaderRow from "./components/HeaderRow";
import FocusGuard from "./components/FocusGuard";
import StatusBar from "./components/StatusBar.jsx";
import SheetTable from "./components/SheetTable";
import FormulaBar from "./components/FormulaBar";

const SheetContent = ({
  state,
  dispatch,
  eventHandler,
  toolbar,
  formulaField,
  statusField,
}) => {
  return (
    <Container>
      {toolbar && <Toolbar state={state} dispatch={dispatch} />}
      {formulaField && (
        <FormulaBar
          state={state}
          dispatch={dispatch}
          eventHandler={eventHandler}
        />
      )}
      <AbsoluteCellInput
        state={state}
        dispatch={dispatch}
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
        <SheetTable
          state={state}
          dispatch={dispatch}
          eventHandler={eventHandler}
        />
        <FocusGuard state={state} dispatch={dispatch} />
        {statusField && <StatusBar state={state} dispatch={dispatch} />}
      </EventDelegator>
    </Container>
  );
};

export default SheetContent;
