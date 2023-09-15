
import FlexBox from "../../../../../../components/shared/FlexBox";
import { setFormulaFieldText, highlightFormulaCells } from "../../actions";
import CellSelector from "./CellSelector";
import FormulaField from "./FormulaField";
import { useEffect } from "react";

/**
 *
 * @param {Object} props
 * @param {Object} props.state
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
