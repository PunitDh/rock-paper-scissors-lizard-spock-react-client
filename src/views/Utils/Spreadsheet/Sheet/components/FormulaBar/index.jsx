import { useEffect } from "react";
import { setFormulaFieldText, highlightFormulaCells } from "../../actions";
import { FlexBox } from "src/components/shared/styles";
import CellSelector from "./CellSelector";
import FormulaField from "./FormulaField";

/**
 *
 * @param {Object} props
 * @param {EventHandler} props.eventHandler
 * @param {Function} props.dispatch
 * @returns
 */
const FormulaBar = ({ state, dispatch }) => {
  useEffect(() => {
    const selectedCellData = state.content.data[state.selectedCell.id];
    if (selectedCellData) {
      const { formula, value, referenceCells } = selectedCellData;
      dispatch(setFormulaFieldText(formula || value));
      dispatch(highlightFormulaCells(referenceCells || []));
    } else {
      dispatch(setFormulaFieldText(""));
      dispatch(highlightFormulaCells([]));
    }
  }, [dispatch, state.content.data, state.selectedCell.id]);

  return (
    <div tabIndex="1">
      <FlexBox width="100%" justifyContent="flex-start">
        <CellSelector state={state} />
        <FormulaField state={state} dispatch={dispatch} />
      </FlexBox>
    </div>
  );
};

export default FormulaBar;
