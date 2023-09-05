import { useEffect, useRef } from "react";
import {
  recalculateFormulae,
  selectCell,
  setContent,
  setFormulaMode,
  setFormulaFieldText,
  setInputTextFocused,
} from "../actions";
import { getNextRow } from "../utils/cellUtils";
import styled from "@emotion/styled";
import { Check, Clear } from "@mui/icons-material";

const InputField = styled.input({
  width: "100%",
  marginBottom: "0.2rem",
  outline: "none",
  borderRadius: 0,
  border: "1px solid rgba(0,0,0,0.2)",
  lineHeight: "1.5rem",
});

const FlexForm = styled.form({
  display: "flex",
  gap: "0.2rem",
  padding: "0.2rem",
  paddingTop: "0.5rem",
  paddingRight: "0.5rem",
  backgroundColor: "rgba(0,0,0,0.1)",
});

const FieldButton = styled.button(({ color, variant, theme }) => ({
  width: "1.5rem",
  outline: "none",
  border: "1px solid rgba(0,0,0,0.5)",
  height: "1.75rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "1px",
  cursor: "pointer",
  color: theme.palette[variant]?.dark || "black",
  "&:hover": {
    color: "blue",
    backgroundColor: "#eee",
    border: "1px solid blue",
  },
  "&:disabled": {
    color: "rgba(0,0,0,0.6)",
    backgroundColor: "#eee",
  },
}));

const FormulaField = ({ state, dispatch, onContextMenu }) => {
  const inputRef = useRef();
  const handleChange = (e) => {
    e.preventDefault();
    dispatch(setFormulaFieldText(e.target.value));
    dispatch(setContent(state.selected.cell, e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setFormulaFieldText(e.target.inputText.value));
    dispatch(recalculateFormulae());
    dispatch(setInputTextFocused(false));
    dispatch(selectCell(getNextRow(state.selected.cell)));
    dispatch(setFormulaMode(false));
  };

  const handleFocus = (e) => {
    dispatch(setInputTextFocused(true));
  };

  const handleBlur = (e) => {
    // if (!state.formulaMode) dispatch(setInputTextFocused(false));
  };

  useEffect(() => {
    if (state.inputTextFocused) {
      inputRef.current?.focus();
    }
  }, [state.inputTextFocused]);

  const resetInputField = () => {
    dispatch(setFormulaFieldText(""));
    dispatch(setFormulaMode(false));
    dispatch(setInputTextFocused(false));
  };

  const acceptInputField = () => {
    dispatch(recalculateFormulae());
    dispatch(setFormulaMode(false));
    dispatch(setInputTextFocused(false));
  };

  const handleFunction = () => {
    dispatch(setFormulaFieldText("="));
    dispatch(setFormulaMode(true));
    inputRef.current?.focus();
  };

  console.log(state.inputTextFocused);

  return (
    <div tabIndex="1" onBlur={handleBlur}>
      <FlexForm onSubmit={handleSubmit}>
        <FieldButton
          type="button"
          disabled={!state.inputTextFocused}
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
          disabled={!state.inputTextFocused}
        >
          <Check sx={{ width: "1rem" }} />
        </FieldButton>
        <FieldButton type="button" color="black" onClick={handleFunction}>
          <span style={{ fontFamily: "cursive" }}>fx</span>
        </FieldButton>

        <InputField
          ref={inputRef}
          name="inputText"
          type="text"
          value={state.inputText}
          onChange={handleChange}
          onContextMenu={onContextMenu}
          onFocus={handleFocus}
          autoComplete="off"
          id="input-text"
          tabIndex={2}
        />
      </FlexForm>
    </div>
  );
};

export default FormulaField;
