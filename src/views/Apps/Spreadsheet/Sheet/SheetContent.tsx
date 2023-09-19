import React, { Dispatch } from "react";
import { Table } from "@mui/material";
import Toolbar from "./components/Toolbar";
import EventDelegator from "./eventHandlers/EventDelegator";
import { Container } from "./styles";
import HeaderRow from "./components/HeaderRow";
import FocusGuard from "./components/FocusGuard";
import SheetTable from "./components/SheetTable";
import { Action, State } from "./types";
import StatusBar from "./components/StatusBar";
import SheetInput from "./components/SheetInput";

type SheetContentProps = {
  state: State;
  dispatch: Dispatch<Action>;
  toolbar: boolean;
  formulaField: boolean;
  statusField: boolean;
};

const SheetContent = ({
  state,
  dispatch,
  toolbar,
  formulaField,
  statusField,
}: SheetContentProps): JSX.Element => (
  <Container>
    {toolbar && <Toolbar state={state} dispatch={dispatch} />}
    <SheetInput state={state} dispatch={dispatch} formulaField={formulaField} />
    <EventDelegator>
      <Table sx={{ mb: 0, tableLayout: "fixed", width: "100%" }}>
        <HeaderRow state={state} dispatch={dispatch} />
      </Table>
      <SheetTable state={state} dispatch={dispatch} />
      <FocusGuard state={state} dispatch={dispatch} />
      {statusField && <StatusBar state={state} />}
    </EventDelegator>
  </Container>
);

export default SheetContent;
