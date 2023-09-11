import {
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import { Bold, FlexBox } from "src/components/shared/styles";

export default function APIKey({ state, dispatch }) {
  return (
    <FlexBox
      height="20rem"
      alignItems="flex-start"
      justifyContent="flex-start"
      width="100%"
      marginLeft="2rem"
    >
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Bold>Key</Bold>
            </TableCell>
            <TableCell sx={{ textAlign: "right" }}>
              <TextField
                size="small"
                sx={{ width: "80%" }}
                autoComplete="off"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Bold>Value</Bold>
            </TableCell>
            <TableCell sx={{ textAlign: "right" }}>
              <TextField
                size="small"
                sx={{ width: "80%" }}
                autoComplete="off"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Bold>Add to</Bold>
            </TableCell>
            <TableCell sx={{ textAlign: "right" }}>
              <FlexBox textAlign="left" justifyContent="flex-end">
                <Select size="small" sx={{ width: "80%" }} value="Header">
                  <MenuItem value="Header">Header</MenuItem>
                  <MenuItem value="Query Params">Query Params</MenuItem>
                </Select>
              </FlexBox>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </FlexBox>
  );
}
