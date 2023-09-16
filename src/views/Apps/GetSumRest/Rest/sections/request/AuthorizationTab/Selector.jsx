import {
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { setAuthorizationType } from "../../../actions";
import { AuthorizationTypeItems } from "../../../constants";
import { Bold } from "../../../../../../../components/shared/styles";

const Selector = ({ state, dispatch }) => {
  const handleChange = (e) => {
    dispatch(setAuthorizationType(e.target.value));
  };
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            <Bold>Type</Bold>
          </TableCell>
          <TableCell sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Select
              labelId="method-select"
              id="method-select"
              value={state.request.authorization.type}
              onChange={handleChange}
              sx={{ width: "10rem" }}
              size="small"
            >
              {Object.keys(AuthorizationTypeItems).map((type) => (
                <MenuItem
                  key={type}
                  value={type}
                  selected={type === state.request.authorization.type}
                >
                  {AuthorizationTypeItems[type].label}
                </MenuItem>
              ))}
            </Select>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default Selector;
