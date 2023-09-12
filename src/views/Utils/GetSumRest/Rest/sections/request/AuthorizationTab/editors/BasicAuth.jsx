import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import PasswordField from "src/components/shared/PasswordField";
import { Bold, FlexBox } from "src/components/shared/styles";
import { setAuthorization } from "../../../../actions";
import { AuthorizationType } from "../../../../constants";

export default function BasicAuth({ state, dispatch }) {
  const credentials = state.request.authorization[AuthorizationType.BASIC_AUTH];
  const handleChange = (e) =>
    dispatch(
      setAuthorization(
        AuthorizationType.BASIC_AUTH,
        e.target.name,
        e.target.value
      )
    );

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
              <TextField
                size="small"
                sx={{ width: "80%" }}
                name="username"
                value={credentials?.username}
                onChange={handleChange}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Bold>Password</Bold>
            </TableCell>
            <TableCell sx={{ display: "flex", justifyContent: "flex-end" }}>
              <FlexBox width="80%" justifyContent="flex-end">
                <PasswordField
                  size="small"
                  name="password"
                  autoComplete="off"
                  value={credentials?.password}
                  onChange={handleChange}
                />
              </FlexBox>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </FlexBox>
  );
}
