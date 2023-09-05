import { SheetConfig } from "../../constants";
import { setSelectedColumn } from "../actions";
import { HeaderItem } from "../../styles";

const ColumnHeader = ({ state, dispatch, column, onContextMenu }) => {
  const handleClick = (e, column) => {
    dispatch(setSelectedColumn(column));
  };

  const handleMouseDown = (e, column) => {
    // TODO
  };

  const handleMouseUp = (e, column) => {
    // TODO
  };

  return (
    <HeaderItem
      colSpan={1}
      selected={
        state.selected.column === SheetConfig.COLUMNS[column] ||
        state.highlighted.columns.includes(SheetConfig.COLUMNS[column])
      }
      onClick={(e) => handleClick(e, SheetConfig.COLUMNS[column])}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onContextMenu={onContextMenu}
    >
      {SheetConfig.COLUMNS[column]}
    </HeaderItem>
  );
};

export default ColumnHeader;
