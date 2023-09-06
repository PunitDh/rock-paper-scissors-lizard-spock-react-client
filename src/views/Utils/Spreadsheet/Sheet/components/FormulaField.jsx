import { useRef } from "react";
import {
  recalculateFormulae,
  selectCell,
  setContent,
  setFormulaMode,
  setFormulaFieldText,
  setFormulaFieldFocused,
} from "../actions";
import { getNextRow } from "../utils/cellUtils";
import styled from "@emotion/styled";
import { Check, Clear } from "@mui/icons-material";
import Cell from "../../models/Cell";

export const InputTextField = styled.input({
  width: "100%",
  outline: "none",
  borderRadius: 0,
  border: "1px solid rgba(0,0,0,0.2)",
  lineHeight: "1.5rem",
});

const SmallInputField = styled(InputTextField)({
  width: "2rem",
  textAlign: "center",
});

const FlexForm = styled.form({
  display: "flex",
  gap: "0.2rem",
  padding: "0.5rem",
  backgroundColor: "rgba(0,0,0,0.1)",
});

const FieldButton = styled.button(({ variant, theme }) => ({
  width: "1.5rem",
  outline: "none",
  border: "1px solid rgba(0,0,0,0.3)",
  height: "1.75rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "3px",
  cursor: "pointer",
  color: theme.palette[variant]?.dark || "black",
  "&:hover": {
    color: "blue",
    backgroundColor: "#eee",
    border: "1px solid blue",
  },
  "&:active": {
    color: theme.palette[variant]?.main || "black",
    backgroundColor: "#999",
    border: "1px solid black",
  },
  "&:disabled": {
    color: "rgba(0,0,0,0.6)",
    backgroundColor: "#eee",
  },
}));

const FormulaField = ({ state, dispatch, onContextMenu }) => {
  const formRef = useRef();
  const inputRef = useRef();
  const defaultValue =
    state.content[state.selectedCell.id]?.formula ||
    state.content[state.selectedCell.id]?.value;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setFormulaFieldText(e.target.inputText.value));
    dispatch(recalculateFormulae());
    dispatch(setFormulaFieldFocused(false));
    dispatch(selectCell(getNextRow(state.selectedCell.id, state.maxRows)));
    dispatch(setFormulaMode(false));
  };

  const handleBlur = (e) => {
    // if (!state.formulaMode) dispatch(setInputTextFocused(false));
  };

  const resetInputField = () => {
    dispatch(setFormulaFieldText(""));
    dispatch(setFormulaMode(false));
    dispatch(setFormulaFieldFocused(false));
  };

  const acceptInputField = () => {
    dispatch(recalculateFormulae());
    dispatch(setFormulaMode(false));
    dispatch(setFormulaFieldFocused(false));
  };

  const handleFunction = () => {
    dispatch(setFormulaFieldText("="));
    dispatch(setFormulaMode(true));
    inputRef.current?.focus();
  };

  const handleSelectCell = (e) => {
    e.preventDefault();
    const cell = new Cell(e.target.value.toUpperCase());
    if (cell.id) {
      dispatch(selectCell(cell.id));
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    dispatch(setFormulaFieldText(e.target.value));
    dispatch(setFormulaMode(e.target.value.startsWith("=")));
    dispatch(setContent(state.selectedCell.id, e.target.value));
  };

  const handleFocus = (e) => {
    if (e.target.value.startsWith("=")) {
      dispatch(setFormulaMode(true));
    }
    dispatch(setFormulaFieldFocused(true));
  };

  return (
    <div tabIndex="1" onBlur={handleBlur}>
      <FlexForm onSubmit={handleSubmit} ref={formRef}>
        <SmallInputField
          name="currentCell"
          type="text"
          value={state.selectedCell.id}
          onChange={handleSelectCell}
          autoComplete="off"
          id="current-cell"
          tabIndex={2}
        />
        <FieldButton
          type="reset"
          // disabled={!state.inputTextFocused}
          color="red"
          variant="error"
          onClick={resetInputField}
        >
          <Clear sx={{ width: "1rem" }} />
        </FieldButton>
        <FieldButton
          type="button"
          color="green"
          variant="success"
          onClick={acceptInputField}
          // disabled={!state.inputTextFocused}
        >
          <Check sx={{ width: "1rem" }} />
        </FieldButton>
        <FieldButton type="button" color="black" onClick={handleFunction}>
          <span style={{ fontFamily: "cursive" }}>fx</span>
        </FieldButton>
        <input type="submit" style={{ display: "none" }} />
        <InputTextField
          ref={inputRef}
          name="inputText"
          type="text"
          value={state.inputText}
          defaultValue={defaultValue}
          onChange={handleChange}
          onContextMenu={onContextMenu}
          onFocus={handleFocus}
          autoComplete="off"
          id="input-text"
          tabIndex={3}
        />
      </FlexForm>
    </div>
  );
};

export default FormulaField;
