import { useMemo } from "react";
import CellData from "../models/CellData";
import { InputData, State } from "../types";

export default function useInputData(state: State): InputData {
  return useMemo<InputData>(() => {
    const {
      selectedCell,
      defaultRowHeight,
      defaultColumnWidth,
      formulaFieldText,
      highlighted,
    } = state;
    const { content } = state.sheets[state.activeSheet];
    const { rowHeights, columnWidths, data } = content;
    const { id: selectedId, row, column } = selectedCell;
    const selectedCellData = data[selectedId] as CellData;
    const rowHeight = {
      value: (rowHeights && rowHeights[row]) || defaultRowHeight,
    };
    const columnWidth = {
      value: (columnWidths && columnWidths[column]) || defaultColumnWidth,
    };
    const currentCellInputValue =
      selectedCellData?.formula || selectedCellData?.value || "";
    const formulaBarValue = formulaFieldText || currentCellInputValue;

    return {
      highlighted,
      referenceCells: selectedCellData?.referenceCells,
      rowHeight,
      column,
      formulaBarValue,
      columnWidth,
      selectedCellData,
      selectedId,
      selectedCell,
      currentCellInputValue,
    };
  }, [state]);
}
