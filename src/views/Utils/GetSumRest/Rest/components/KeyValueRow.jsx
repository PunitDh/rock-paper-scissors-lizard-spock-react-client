import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import DeleteButton from "./DeleteButton";
import styled from "@emotion/styled";
import { useRef } from "react";
import Tag from "./Tag";
import { FormDataFieldType } from "../constants";
import FlexBox from "../../../../../components/shared/FlexBox";

const CheckboxCell = styled(TableCell)({
  width: "1rem",
  paddingRight: 0,
});

const StyledTableCell = styled(TableCell)({
  padding: "0rem 0.5rem 0rem 0rem",
});

const StyledTextField = styled(TextField)(({ include }) => ({
  width: "100%",
  color: "green",
  // color: include > 1 ? "initial" : "green",
}));

const StyledTableRow = styled(TableRow)({
  backgroundColor: "rgba(220,220,220,0.1)",
  padding: 0,
  borderBottom: "1px solid black",
});

const FieldTypeSelect = styled(Select)({
  position: "absolute",
  right: 0,
  opacity: 0,
  "&:hover": {
    opacity: 0.3,
  },
});

const FileInputContainer = styled(Box)({
  position: "absolute",
  left: 0,
});

const FileInput = styled(TextField)({
  display: "none",
});

export default function KeyValueRow({
  pair,
  onChange,
  onDelete,
  isLast,
  fileUpload,
}) {
  const fileRef = useRef();
  const handleChange = (e) => {
    if (e.target.name === "include") {
      pair.include = !pair.include;
    } else {
      pair[e.target.name] = e.target.value;
    }
    return onChange(pair);
  };

  const handleDelete = () => onDelete(pair);

  const handleSelectFiles = (e) => {
    pair.files = e.target.files;
    return onChange(pair);
  };

  const handleDeleteFiles = () => {
    pair.files = [];
    return onChange(pair);
  };

  return (
    <StyledTableRow>
      <CheckboxCell>
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
      <StyledTableCell>
        <FlexBox position="relative">
          <StyledTextField
            name="key"
            value={pair.key}
            onChange={handleChange}
            size="small"
            autoComplete="off"
            placeholder={isLast ? "Key" : ""}
            sx={{
              input: { color: pair.include || isLast ? "initial" : "#aaa" },
            }}
          />
          {fileUpload && (
            <FieldTypeSelect
              labelId="field-type-select"
              id="field-type-select"
              value={pair.type}
              onChange={handleChange}
              sx={{ width: "5rem", height: "2rem" }}
              size="small"
              name="type"
            >
              {Object.values(FormDataFieldType).map((type) => (
                <MenuItem key={type} value={type} selected={pair.type === type}>
                  {type}
                </MenuItem>
              ))}
            </FieldTypeSelect>
          )}
        </FlexBox>
      </StyledTableCell>
      <StyledTableCell>
        {fileUpload && pair.isFile ? (
          <FlexBox
            position="relative"
            border="1px solid #aaa"
            borderRadius="0.2rem"
            height="2.25rem"
            justifyContent="flex-start"
            cursor="text"
          >
            {pair.files.length ? (
              <Tag
                text={
                  pair.files.length > 1
                    ? `${pair.files.length} files selected`
                    : pair.files[0].name
                }
                onClick={handleDeleteFiles}
              />
            ) : (
              <FileInputContainer>
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  sx={{ height: "2rem", width: "6.8rem" }}
                >
                  Select Files
                </Button>
                <FileInput
                  name="files"
                  type="file"
                  id="form-data-upload-file"
                  inputRef={fileRef}
                  onChange={handleSelectFiles}
                  inputProps={{
                    multiple: true,
                  }}
                />
              </FileInputContainer>
            )}
          </FlexBox>
        ) : (
          <StyledTextField
            name="value"
            value={pair.value}
            onChange={handleChange}
            size="small"
            autoComplete="off"
            disabled={fileUpload && pair.isFile}
            placeholder={isLast ? "Value" : ""}
            sx={{
              input: { color: pair.include || isLast ? "initial" : "#aaa" },
            }}
          />
        )}
      </StyledTableCell>
      <StyledTableCell>
        <StyledTextField
          name="description"
          value={pair.description}
          onChange={handleChange}
          size="small"
          autoComplete="off"
          placeholder={isLast ? "Description" : ""}
          sx={{ input: { color: pair.include || isLast ? "initial" : "#aaa" } }}
        />
      </StyledTableCell>
      <StyledTableCell>
        <DeleteButton onClick={handleDelete} />
      </StyledTableCell>
    </StyledTableRow>
  );
}
