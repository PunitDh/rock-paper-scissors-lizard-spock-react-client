import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Bold, FlexBox } from "src/components/shared/styles";
import { Value } from "./styles";

const Cookies = ({ state }) => {
  const cookies = decodeURIComponent(document.cookie)
    .split(";")
    .map((it) => it.split("="))
    .reduce((acc, cur) => ({ ...acc, [cur[0].trim()]: cur[1] }), {});
  console.log(cookies);

  return (
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
            {Object.keys(cookies).map((key) => (
              <TableRow key={key}>
                <TableCell>
                  <Value>{key}</Value>
                </TableCell>
                <TableCell>
                  <Value>{cookies[key]}</Value>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </FlexBox>
  );
};

export default Cookies;
