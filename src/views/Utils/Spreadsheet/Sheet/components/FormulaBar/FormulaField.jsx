import { useCallback, useEffect, useMemo, useState } from "react";
import {
  addMemento,
  deleteCellContent,
  recalculateFormulae,
  resetFormulaField,
  setCellContent,
  setFormulaFieldFocused,
  setFormulaFieldRef,
  setFormulaFieldText,
  setFormulaMode,
} from "../../actions";
import { isFormula } from "../../utils/cellUtils";
import { FieldButton, FlexForm, InputTextField } from "../styles";
import { Check, Clear } from "@mui/icons-material";

const FormulaField = ({ state, dispatch, eventHandler }) => {
  const value = useMemo(
    () =>
      state.formulaFieldText ||
      state.content.data[state.selectedCell.id]?.formula ||
      state.content.data[state.selectedCell.id]?.value ||
      "",
    [state.content.data, state.formulaFieldText, state.selectedCell.id]
  );

  const [originalValue, setOriginalValue] = useState(value);

  const inputRef = useCallback(
    (node) => {
      dispatch(setFormulaFieldRef(node));
      return node;
    },
    [dispatch]
  );

  useEffect(() => {
    setOriginalValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedCell.id]);

  useEffect(() => {
    if (state.isFormulaFieldFocused) {
      state.formulaFieldRef.focus();
    }
  }, [state.formulaFieldRef, state.isFormulaFieldFocused]);

  const handleContextMenu = (e) => eventHandler.handleContextMenu(e);
  const handleKeyDown = (e) =>
    eventHandler.handleFormulaFieldKeyDown(e, originalValue);
  const handleSubmit = (e) => eventHandler.handleFormulaFieldSubmit(e);
  const handleBlur = (e) =>
    eventHandler.handleFormulaFieldBlur(e, originalValue);

  const resetField = () => {
    dispatch(resetFormulaField());
    dispatch(deleteCellContent(state.selectedCell.id));
    if (state.formulaTrackedCells.includes(state.selectedCell.id)) {
      dispatch(recalculateFormulae());
    }
    dispatch(addMemento());
  };

  const acceptInput = () => {
    dispatch(setFormulaMode(false));
    dispatch(setFormulaFieldFocused(false));
  };

  const handleFunction = () => eventHandler.handleFunction();

  const handleChange = useCallback(
    (e) => {
      // e.preventDefault();
      dispatch(setFormulaFieldText(e.target.value));
      dispatch(setFormulaMode(isFormula(e.target.value)));
      dispatch(setCellContent(state.selectedCell.id, e.target.value));
    },
    [dispatch, state.selectedCell.id]
  );

  const handleFocus = (e) => {
    if (isFormula(e.target.value)) {
      dispatch(setFormulaMode(true));
    }
    dispatch(setFormulaFieldFocused(true));
  };

  return (
    <FlexForm onSubmit={handleSubmit} width="100%" paddingLeft="0.5rem">
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
        value={value}
        onChange={handleChange}
        onContextMenu={handleContextMenu}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoComplete="off"
        id="formula-field"
        tabIndex={3}
      />
    </FlexForm>
  );
};

export default FormulaField;
