import { Table } from "@mui/material";
import CellInput from "./components/CellInput";
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
  toolbar,
  formulaField,
  statusField,
}) => {
  return (
    <Container>
      {toolbar && <Toolbar state={state} dispatch={dispatch} />}
      {formulaField && <FormulaBar state={state} dispatch={dispatch} />}
      <CellInput state={state} dispatch={dispatch} />
      <EventDelegator>
        <Table width="100%" sx={{ mb: 0 }}>
          <HeaderRow state={state} dispatch={dispatch} />
        </Table>
        <SheetTable state={state} dispatch={dispatch} />
        <FocusGuard state={state} dispatch={dispatch} />
        {statusField && <StatusBar state={state} dispatch={dispatch} />}
      </EventDelegator>
    </Container>
  );
};

export default SheetContent;
