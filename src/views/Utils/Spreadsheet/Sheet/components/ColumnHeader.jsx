import styled from "@emotion/styled";
import { Item } from "../../styles";
import { SheetConfig } from "../../constants";
import { setSelectedColumn } from "../actions";

const HeaderItem = styled(Item)(({ selected }) => ({
  backgroundColor: selected ? "#eee" : "#ddd",
  outline: "2px solid black",
  fontWeight: "700",
  width: "100%",
  userSelect: "none",
  overflowY: "hidden"
}));

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
