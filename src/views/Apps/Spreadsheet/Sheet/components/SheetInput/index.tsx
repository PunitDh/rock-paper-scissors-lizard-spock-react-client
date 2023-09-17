import React, { Dispatch, useEffect, useRef } from 'react'
import FormulaBar from './FormulaBar'
import CellInput from './CellInput'
import Filler from './Filler'
import { Action, State } from '../../types'
import { highlightFormulaCells, setFormulaFieldText } from '../../actions'
import useElementPosition from '../../hooks/useElementPosition'
import useInputData from '../../hooks/useInputData'
import Highlight from './Highlight'

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
  formulaField: boolean;
}

const SheetInput = ({ state, dispatch, formulaField }: Props) => {

  const {
    highlighted,
    referenceCells,
    rowHeight,
    formulaBarValue,
    columnWidth,
    selectedCellData,
    selectedId,
    currentCellInputValue,
    selectedCell,
  } = useInputData(state);

  const position = useElementPosition(selectedCellData, selectedId, highlighted.first, highlighted.last, rowHeight, columnWidth)

  const originalValue = useRef<string>(String(formulaBarValue));
  useEffect(() => {
    originalValue.current = String(formulaBarValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log("Formula field value hook triggered");
  }, [selectedId, formulaBarValue]);

  useEffect(() => {
    if (selectedCellData) {
      dispatch(setFormulaFieldText(String(selectedCellData.formula || selectedCellData.value)));
      dispatch(highlightFormulaCells(referenceCells || []));
    } else {
      dispatch(setFormulaFieldText(""));
      dispatch(highlightFormulaCells([]));
    }
  }, [dispatch, referenceCells, selectedCellData, selectedId])

  return (<>
    {formulaField && <FormulaBar state={state} dispatch={dispatch} originalValue={originalValue.current} value={String(formulaBarValue)} />}
    {state.highlighted.cells.length > 1 && <Highlight position={position} />}
    <CellInput state={state} dispatch={dispatch} position={position} cell={selectedCell} value={String(currentCellInputValue)} />
    <Filler state={state} dispatch={dispatch} position={position} />
  </>
  )
}

export default SheetInput