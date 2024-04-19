import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import FlexBox from "../../../../../../../../components/shared/FlexBox";

const NoAuth = (): JSX.Element => (
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
          <TableCell>This request does not use any authorization</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </FlexBox>
);

export default NoAuth;
