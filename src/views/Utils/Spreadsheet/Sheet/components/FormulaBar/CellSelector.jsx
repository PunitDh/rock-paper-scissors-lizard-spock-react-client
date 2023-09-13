import { useEffect, useMemo, useState } from "react";
import { FlexForm, SmallInputField } from "../styles";

const CellSelector = ({ state, eventHandler }) => {
  const cellInputValue = useMemo(
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

  const [currentCellInputValue, setCurrentCellInputValue] =
    useState(cellInputValue);
  const handleSelectCellSubmit = (e) => eventHandler.handleSelectCellSubmit(e);

  const handleSelectCell = (e) => {
    e.preventDefault();
    setCurrentCellInputValue(e.target.value);
    eventHandler.handleSelectCell(e.target.value);
  };

  useEffect(() => {
    setCurrentCellInputValue(state.selectedCell.id);
  }, [state.selectedCell.id]);

  return (
    <FlexForm paddingRight="0rem" onSubmit={handleSelectCellSubmit}>
      <SmallInputField
        name="currentCell"
        type="text"
        value={currentCellInputValue}
        onChange={handleSelectCell}
        autoComplete="off"
        id="current-cell"
        tabIndex={2}
        list="cells"
      />
      <datalist id="cells">
        {Object.keys(state.content.namedRanges).map((range) => (
          <option key={range} value={range}>
            {range}
          </option>
        ))}
      </datalist>
    </FlexForm>
  );
};

export default CellSelector;
