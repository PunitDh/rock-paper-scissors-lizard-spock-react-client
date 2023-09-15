import React, { Dispatch, useCallback, useEffect } from "react";
import {
  addMemento,
  deleteCellContent,
  recalculateFormulae,
  resetFormulaField,
  setCellContent,
  setFormulaFieldFocused,
  setFormulaFieldText,
  setFormulaMode,
} from "../../../actions";
import { isFormula } from "../../../utils/cellUtils";
import { FieldButton, FlexForm, InputTextField } from "../../styles";
import { Check, Clear } from "@mui/icons-material";
import { Action, State } from "../../../types";
import useEventHandler from "../../../hooks/useEventHandler";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
  originalValue: string;
  value: string;
}

const FormulaField = ({ state, dispatch, originalValue, value }: Props) => {
  const eventHandler = useEventHandler();

  const formulaFieldRef = useCallback(
    (node: HTMLInputElement) => eventHandler.setFormulaFieldRef(node),
    [eventHandler]
  );

  const handleContextMenu = (e: React.MouseEvent) => eventHandler.handleContextMenu(e);
  const handleKeyDown = (e: React.KeyboardEvent) =>
    eventHandler.handleFormulaFieldKeyDown(e, originalValue);
  const handleSubmit = (e: React.FormEvent) => eventHandler.handleFormulaFieldSubmit(e);
  const handleBlur = (e: React.FocusEvent) =>
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
    (e: React.ChangeEvent) => {
      const value = (e.target as HTMLInputElement).value
      // e.preventDefault();
      dispatch(setFormulaFieldText(value));
      dispatch(setFormulaMode(isFormula(value)));
      dispatch(setCellContent(state.selectedCell.id, value));
    },
    [dispatch, state.selectedCell.id]
  );

  const handleFocus = (e: React.FocusEvent) => {
    const value = (e.target as HTMLInputElement).value
    if (isFormula(value)) {
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
        ref={formulaFieldRef}
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
