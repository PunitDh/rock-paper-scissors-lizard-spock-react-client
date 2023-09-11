import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import DeleteButton from "./DeleteButton";
import styled from "@emotion/styled";
import { setParams } from "../actions";

const CheckboxCell = styled(TableCell)({ width: "1rem", paddingRight: 0 });

const StyledTableCell = styled(TableCell)({
  padding: "0rem 0.5rem 0rem 0rem",
});

const StyledTextField = styled(TextField)({
  width: "100%",
});

const StyledTableRow = styled(TableRow)({
  backgroundColor: "rgba(220,220,220,0.1)",
  padding: 0,
  borderBottom: "1px solid black",
});

export default function ParamRow({ state, dispatch, index }) {
  const handleChange = (e) => {
    dispatch(setParams());
  };
  return (
    <StyledTableRow>
      <CheckboxCell colSpan={1}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleChange}
                checked={state.params[index]?.include}
              />
            }
          />
        </FormGroup>
      </CheckboxCell>
      <StyledTableCell colSpan={1}>
        <StyledTextField
          name="key"
          value={state.params[index]?.key}
          onChange={handleChange}
          size="small"
          autoComplete="off"
        />
      </StyledTableCell>
      <StyledTableCell colSpan={3}>
        <StyledTextField
          name="value"
          value={state.params[index]?.value}
          onChange={handleChange}
          size="small"
          autoComplete="off"
        />
      </StyledTableCell>
      <StyledTableCell colSpan={4}>
        <StyledTextField
          name="description"
          value={state.params[index]?.description}
          onChange={handleChange}
          size="small"
          autoComplete="off"
        />
      </StyledTableCell>
      <StyledTableCell colSpan={1}>
        <DeleteButton />
      </StyledTableCell>
    </StyledTableRow>
  );
}
