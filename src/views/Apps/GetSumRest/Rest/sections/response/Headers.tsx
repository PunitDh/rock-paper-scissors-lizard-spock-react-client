import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Value } from "./styles";
import FlexBox from "../../../../../../components/shared/FlexBox";
import { Bold } from "../../../../../../components/shared/styles";
import { State } from "../../types";

type Props = {
  state: State;
}
const Header = ({ state }: Props) => (
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
