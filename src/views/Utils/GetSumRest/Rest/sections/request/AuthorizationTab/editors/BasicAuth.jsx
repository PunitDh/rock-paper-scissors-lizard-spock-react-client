import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import PasswordField from "src/components/shared/PasswordField";
import { Bold, FlexBox } from "src/components/shared/styles";

export default function BasicAuth() {
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
              <Bold>Username</Bold>
            </TableCell>
            <TableCell sx={{ textAlign: "right" }}>
              <TextField size="small" sx={{ width: "80%" }} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Bold>Password</Bold>
            </TableCell>
            <TableCell sx={{ display: "flex", justifyContent: "flex-end" }}>
              <FlexBox width="80%" justifyContent="flex-end">
                <PasswordField size="small" autoComplete="off" />
              </FlexBox>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </FlexBox>
  );
}
