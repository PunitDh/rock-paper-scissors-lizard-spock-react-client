import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  selectCell,
  setContent,
  setFormulaMode,
  setFormulaFieldText,
  setFormulaFieldFocused,
  deleteCellContent,
  resetFormulaField,
  recalculateFormulae,
  addMemento,
} from "../actions";
import { getNextRow } from "../utils/cellUtils";
import { Check, Clear } from "@mui/icons-material";
import {
  FieldButton,
  FlexForm,
  InputTextField,
  SmallInputField,
} from "./styles";
import Cell from "../models/Cell";
import { KeyEvent } from "../constants";

const FormulaField = ({ state, dispatch, onContextMenu }) => {
  const formRef = useRef();
  const inputRef = useRef();
  const defaultValue = useMemo(
    () =>
      state.content[state.selectedCell.id]?.formula ||
      state.content[state.selectedCell.id]?.value,
    [state.content, state.selectedCell.id]
  );

  const handleKeyDown = useCallback(
    (e) => {
      switch (e.key) {
        case KeyEvent.ESCAPE:
          dispatch(setFormulaMode(false));
          break;
        default:
          break;
      }
    },
    [dispatch]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(setFormulaFieldText(e.target.formulaFieldText.value));
      dispatch(setFormulaFieldFocused(false));
      dispatch(selectCell(getNextRow(state.selectedCell.id, state.maxRows)));
      dispatch(setFormulaMode(false));
      dispatch(recalculateFormulae());
      dispatch(addMemento());
    },
    [dispatch, state.maxRows, state.selectedCell.id]
  );

  const handleBlur = (e) => {
    // if (!state.formulaMode) dispatch(setformulaFieldFocused(false));
  };

  const resetField = () => {
    dispatch(resetFormulaField());
    dispatch(deleteCellContent(state.selectedCell.id));
  };

  const acceptInput = () => {
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

  const handleChange = useCallback(
    (e) => {
      // e.preventDefault();
      dispatch(setFormulaFieldText(e.target.value));
      dispatch(setFormulaMode(e.target.value.startsWith("=")));
      dispatch(setContent(state.selectedCell.id, e.target.value));
    },
    [dispatch, state.selectedCell.id]
  );

  const handleFocus = (e) => {
    if (e.target.value.startsWith("=")) {
      dispatch(setFormulaMode(true));
    }
    dispatch(setFormulaFieldFocused(true));
  };

  useEffect(() => {
    if (state.formulaFieldFocused) {
      inputRef.current?.focus();
    }
  }, [state.formulaFieldFocused]);

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
          color="red"
          variant="error"
          onClick={resetField}
        >
          <Clear sx={{ width: "1rem" }} />
        </FieldButton>
        <FieldButton
          type="button"
          color="green"
          variant="success"
          onClick={acceptInput}
        >
          <Check sx={{ width: "1rem" }} />
        </FieldButton>
        <FieldButton type="button" color="black" onClick={handleFunction}>
          <span style={{ fontFamily: "'Courgette', cursive" }}>fx</span>
        </FieldButton>
        <input type="submit" style={{ display: "none" }} />
        <InputTextField
          ref={inputRef}
          name="formulaFieldText"
          type="text"
          value={state.formulaFieldText}
          defaultValue={defaultValue}
          onChange={handleChange}
          onContextMenu={onContextMenu}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          autoComplete="off"
          id="formula-field"
          tabIndex={3}
        />
      </FlexForm>
    </div>
  );
};

export default FormulaField;
