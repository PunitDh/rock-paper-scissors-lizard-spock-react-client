import styled from "@emotion/styled";
import { Item } from "../../styles";
import { SheetConfig } from "../../constants";
import { setMenuAnchorElement, setSelectedColumn } from "../actions";

const HeaderItem = styled(Item)(({ selected }) => ({
  backgroundColor: selected ? "#eee" : "#ddd",
  outline: "2px solid black",
  fontWeight: "700",
  width: "100%",
}));

const ColumnHeader = ({ state, dispatch, column }) => {
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
      key={SheetConfig.COLUMNS[column]}
      selected={
        state.selected.column === SheetConfig.COLUMNS[column] ||
        state.highlighted.columns.includes(SheetConfig.COLUMNS[column])
      }
      onClick={(e) => handleClick(e, SheetConfig.COLUMNS[column])}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onContextMenu={(e) => dispatch(setMenuAnchorElement(e.currentTarget))}
    >
      {SheetConfig.COLUMNS[column]}
    </HeaderItem>
  );
};

export default ColumnHeader;
