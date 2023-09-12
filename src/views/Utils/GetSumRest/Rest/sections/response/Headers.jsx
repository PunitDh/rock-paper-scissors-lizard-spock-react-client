import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Bold, FlexBox } from "src/components/shared/styles";
import { Value } from "./styles";

const Header = ({ state }) => (
  <FlexBox width="100%" flexGrow={1} flex="1 0 auto">
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Value>
              <Bold>Key</Bold>
            </Value>
          </TableCell>
          <TableCell>
            <Value>
              <Bold>Value</Bold>
            </Value>
          </TableCell>
        </TableRow>
      </TableHead>
      {state.response.headers && (
        <TableBody>
          {Object.keys(state.response.headers).map((key) => (
            <TableRow key={key}>
              <TableCell>
                <Value>{key}</Value>
              </TableCell>
              <TableCell>
                <Value>{state.response.headers[key]}</Value>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  </FlexBox>
);

export default Header;
