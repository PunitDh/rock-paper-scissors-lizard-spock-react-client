import React, { useEffect, useMemo, useState } from "react";
import { FlexForm, SmallInputField } from "../styles";
import useEventHandler from "../../hooks/useEventHandler";
import { State } from "../../types";

type Props = {
  state: State
}

const CellSelector = ({ state }: Props) => {
  const eventHandler = useEventHandler();
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
  const handleSelectCellSubmit = (e: React.FormEvent) => eventHandler.handleSelectCellSubmit(e);

  const handleSelectCell = (e: React.ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value;
    e.preventDefault();
    setCurrentCellInputValue(value);
    eventHandler.handleSelectCell(value);
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
        {state.content.namedRanges &&
          Object.keys(state.content.namedRanges).map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
      </datalist>
    </FlexForm>
  );
};

export default CellSelector;
