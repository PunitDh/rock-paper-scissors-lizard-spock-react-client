import { useEffect, useRef } from "react";
import {
  recalculateFormulae,
  selectCell,
  setContent,
  setFormulaMode,
  setInputText,
  setInputTextFocused,
} from "../actions";
import { getNextRow } from "../utils/cellUtils";
import styled from "@emotion/styled";

const InputField = styled.input({
  width: "100%",
  marginBottom: "0.2rem",
  outline: "none",
  borderRadius: 0,
  border: "1px solid rgba(0,0,0,0.2)",
  lineHeight: "1.5rem",
});

const FormulaField = ({ state, dispatch, onContextMenu }) => {
  const inputRef = useRef();
  const handleChange = (e) => {
    e.preventDefault();
    dispatch(setInputText(e.target.value));
    dispatch(setContent(state.selected.cell, e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setInputText(e.target.inputText.value));
    dispatch(recalculateFormulae());
    dispatch(setInputTextFocused(false));
    dispatch(selectCell(getNextRow(state.selected.cell)));
    dispatch(setFormulaMode(false));
  };

  const handleFocus = (e) => {
    dispatch(setInputTextFocused(true));
  };

  useEffect(() => {
    if (state.inputTextFocused) {
      inputRef.current?.focus();
    }
  }, [state.inputTextFocused]);

  return (
    <form onSubmit={handleSubmit}>
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
      />
    </form>
  );
};

export default FormulaField;
