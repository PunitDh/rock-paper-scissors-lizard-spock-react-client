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
      <input
        ref={inputRef}
        name="inputText"
        type="text"
        style={{ width: "100%", marginBottom: "0.2rem" }}
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
