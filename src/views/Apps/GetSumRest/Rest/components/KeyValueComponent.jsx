import styled from "@emotion/styled";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import KeyValueRow from "./KeyValueRow";

const TableHeaderCell = styled(TableCell)(({ width }) => ({
  paddingLeft: 0,
  paddingBottom: "0.25rem",
  width: width || "calc((100%)/3)",
}));

const KeyValueComponent = ({
  property,
  onChange,
  onDelete,
  fileUpload,
  type,
}) => (
  <Table style={{ tableLayout: "fixed" }}>
    <TableHead style={{ borderBottom: "1px solid rgba(0,0,0,1)" }}>
      <TableRow>
        <TableCell style={{ width: "4rem" }}> </TableCell>
        <TableHeaderCell>Key</TableHeaderCell>
        <TableHeaderCell>Value</TableHeaderCell>
        <TableHeaderCell>Description</TableHeaderCell>
        <TableHeaderCell width="2rem"></TableHeaderCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {property.map((pair, index) => (
        <KeyValueRow
          pair={pair}
          type={type}
          onChange={onChange}
          onDelete={onDelete}
          key={index}
          isLast={index === property.length - 1}
          fileUpload={fileUpload}
        />
      ))}
    </TableBody>
  </Table>
);

export default KeyValueComponent;
