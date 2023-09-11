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

const CheckboxCell = styled(TableCell)({
  width: "1rem",
  paddingRight: 0,
});

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

export default function KeyValueRow({ pair, onChange, isLast }) {
  const handleChange = (e) => {
    pair[e.target.name] = e.target.value || e.target.checked;
    return onChange(pair);
  };

  return (
    <StyledTableRow>
      <CheckboxCell colSpan={1}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleChange}
                checked={pair.include}
                name="include"
              />
            }
          />
        </FormGroup>
      </CheckboxCell>
      <StyledTableCell colSpan={1}>
        <StyledTextField
          name="key"
          value={pair.key}
          onChange={handleChange}
          size="small"
          autoComplete="off"
          placeholder={isLast ? "Key" : ""}
        />
      </StyledTableCell>
      <StyledTableCell colSpan={3}>
        <StyledTextField
          name="value"
          value={pair.value}
          onChange={handleChange}
          size="small"
          autoComplete="off"
          placeholder={isLast ? "Value" : ""}
        />
      </StyledTableCell>
      <StyledTableCell colSpan={4}>
        <StyledTextField
          name="description"
          value={pair.description}
          onChange={handleChange}
          size="small"
          autoComplete="off"
          placeholder={isLast ? "Description" : ""}
        />
      </StyledTableCell>
      <StyledTableCell colSpan={1}>
        <DeleteButton />
      </StyledTableCell>
    </StyledTableRow>
  );
}
