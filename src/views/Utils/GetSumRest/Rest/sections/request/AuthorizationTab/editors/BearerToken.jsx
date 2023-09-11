import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import { Bold, FlexBox } from "src/components/shared/styles";

export default function BearerToken() {
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
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </FlexBox>
  );
}
