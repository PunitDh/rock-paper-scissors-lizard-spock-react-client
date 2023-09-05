import {
  recalculateFormulae,
  selectCell,
  setContent,
  setFormulaMode,
  setInputText,
} from "../actions";
import { getNextRow } from "../utils/cellUtils";

const FormulaField = ({ state, dispatch, onContextMenu }) => {
  const handleInputTextChange = (e) => {
    dispatch(setInputText(e.target.value));
    dispatch(setContent(state.selected.cell, e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setInputText(e.target.inputText.value));
    dispatch(recalculateFormulae());
    dispatch(selectCell(getNextRow(state.selected.cell)));
    dispatch(setFormulaMode(false));
  };

  const handleInputTextFocus = (e) => {};

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="inputText"
        type="text"
        style={{ width: "100%", marginBottom: "0.2rem" }}
        value={state.inputText}
        onChange={handleInputTextChange}
        onContextMenu={onContextMenu}
        onFocus={handleInputTextFocus}
        autoComplete="off"
        id="input-text"
      />
    </form>
  );
};

export default FormulaField;
