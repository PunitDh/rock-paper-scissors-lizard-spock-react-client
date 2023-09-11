import styled from "@emotion/styled";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ParamRow from "./ParamRow";

const TableHeaderCell = styled(TableCell)({
  paddingLeft: 0,
  paddingBottom: "0.25rem",
});

const KeyValueComponent = ({ state, dispatch }) => {
  return (
    <Table>
      <TableHead style={{ borderBottom: "1px solid rgba(0,0,0,1)" }}>
        <TableRow>
          <TableCell colSpan={1}></TableCell>
          <TableHeaderCell colSpan={1}>Key</TableHeaderCell>
          <TableHeaderCell colSpan={3}>Value</TableHeaderCell>
          <TableHeaderCell colSpan={5}>Description</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Array(3)
          .fill()
          .map((_, index) => (
            <ParamRow
              state={state}
              dispatch={dispatch}
              key={index}
              index={index}
            />
          ))}
      </TableBody>
    </Table>
  );
};

export default KeyValueComponent;
