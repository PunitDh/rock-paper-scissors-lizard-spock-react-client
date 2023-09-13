import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  selectCell,
  setCellContent,
  setFormulaMode,
  setFormulaFieldText,
  setFormulaFieldFocused,
  deleteCellContent,
  resetFormulaField,
  recalculateFormulae,
  addMemento,
  setFormulaFieldRef,
} from "../actions";
import { isFormula } from "../utils/cellUtils";
import { Check, Clear } from "@mui/icons-material";
import {
  FieldButton,
  FlexForm,
  InputTextField,
  SmallInputField,
} from "./styles";
import Cell from "../models/Cell";
import { KeyEvent } from "../constants";

const FormulaField = ({ state, dispatch, eventHandler }) => {
  const formRef = useRef();
  const inputRef = useRef();

  const handleContextMenu = (e) => eventHandler.handleContextMenu(e);

  useEffect(() => {
    dispatch(setFormulaFieldRef(inputRef.current));
  }, [dispatch]);

  const value = useMemo(
    () =>
      state.formulaFieldText ||
      state.content.data[state.selectedCell.id]?.formula ||
      state.content.data[state.selectedCell.id]?.value ||
      "",
    [state.content.data, state.formulaFieldText, state.selectedCell.id]
  );

  const [originalValue, setOriginalValue] = useState(value);

  const handleKeyDown = useCallback(
    (e) => {
      switch (e.key) {
        case KeyEvent.ESCAPE:
          dispatch(setFormulaMode(false));
          // setOriginalValue(originalValue);
          dispatch(setFormulaFieldText(originalValue));
          e.target.blur();
          break;
        default:
          break;
      }
    },
    [dispatch, originalValue]
  );

  const handleSubmit = useCallback(
    (e) => {
      const triggerRecalculation =
        isFormula(e.target.formulaFieldText.value) ||
        state.formulaTrackedCells.includes(state.selectedCell.id);
      e.preventDefault();
      dispatch(setFormulaFieldText(e.target.formulaFieldText.value));
      dispatch(setFormulaFieldFocused(false));
      dispatch(selectCell(state.selectedCell.getNextRow(state.maxRows)));
      dispatch(setFormulaMode(false));
      triggerRecalculation && dispatch(recalculateFormulae());
      dispatch(addMemento());
    },
    [dispatch, state.formulaTrackedCells, state.maxRows, state.selectedCell]
  );

  const handleBlur = (e) => {
    const triggerRecalculation =
      isFormula(e.target.value) ||
      state.formulaTrackedCells.includes(state.selectedCell.id) ||
      originalValue !== e.target.value;
    if (!state.formulaMode) {
      triggerRecalculation && dispatch(recalculateFormulae());
    }
  };

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

  useEffect(() => {
    if (state.isFormulaFieldFocused) {
      inputRef.current?.focus();
    }
  }, [state.isFormulaFieldFocused]);

  useEffect(() => {
    setOriginalValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedCell.id]);

  const currentCellInputValue = useMemo(
    () =>
      state.highlighted.cells.length > 1 && state.mouseDown
        ? `${state.highlighted.rows.length}R × ${state.highlighted.columns.length}C`
        : state.selectedCell.id,
    [
      state.highlighted.cells.length,
      state.highlighted.columns.length,
      state.highlighted.rows.length,
      state.mouseDown,
      state.selectedCell.id,
    ]
  );

  return (
    <div tabIndex="1">
      <FlexForm onSubmit={handleSubmit} ref={formRef}>
        <SmallInputField
          name="currentCell"
          type="text"
          value={currentCellInputValue}
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
    </div>
  );
};

export default FormulaField;
