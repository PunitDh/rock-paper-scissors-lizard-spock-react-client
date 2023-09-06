import { useRef } from "react";
import {
  recalculateFormulae,
  selectCell,
  setContent,
  setFormulaMode,
  setFormulaFieldText,
  setFormulaFieldFocused,
  deleteCellContent,
} from "../actions";
import { getNextRow } from "../utils/cellUtils";
import { Check, Clear } from "@mui/icons-material";
import Cell from "../../models/Cell";
import {
  FieldButton,
  FlexForm,
  InputTextField,
  SmallInputField,
} from "./styles";

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
    dispatch(deleteCellContent(state.selectedCell.id));
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
