import styled from "@emotion/styled";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import KeyValueRow from "./KeyValueRow";

const TableHeaderCell = styled(TableCell)({
  paddingLeft: 0,
  paddingBottom: "0.25rem",
});

const KeyValueComponent = ({ property, onChange }) => {
  const handleChange = (e) => {
    onChange(e);
  };

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
        {property.map((pair, index) => (
          <KeyValueRow
            pair={pair}
            onChange={handleChange}
            key={index}
            isLast={index === property.length - 1}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default KeyValueComponent;
