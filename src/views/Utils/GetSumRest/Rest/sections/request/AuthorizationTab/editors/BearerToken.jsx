import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import { Bold, FlexBox } from "src/components/shared/styles";
import { setAuthorization } from "../../../../actions";
import { AuthorizationType } from "../../../../constants";

export default function BearerToken({ state, dispatch }) {
  const credentials =
    state.request.authorization[AuthorizationType.BEARER_TOKEN];
  const handleChange = (e) => {
    dispatch(
      setAuthorization(
        AuthorizationType.BEARER_TOKEN,
        e.target.name,
        e.target.value
      )
    );
  };
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
              <Bold>Prefix</Bold>
            </TableCell>
            <TableCell sx={{ textAlign: "right" }}>
              <TextField
                size="small"
                sx={{ width: "80%" }}
                autoComplete="off"
                name="prefix"
                value={credentials.prefix}
                onChange={handleChange}
                defaultValue="Bearer"
                placeholder="None"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Bold>Token</Bold>
            </TableCell>
            <TableCell sx={{ textAlign: "right" }}>
              <TextField
                size="small"
                sx={{ width: "80%" }}
                autoComplete="off"
                name="token"
                value={credentials.token}
                onChange={handleChange}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </FlexBox>
  );
}
