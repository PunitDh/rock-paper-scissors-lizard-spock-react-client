import { Item } from "../../styles";
import { SheetConfig } from "../../constants";
import { setSelectAll } from "../actions";
import styled from "@emotion/styled";

const HeaderItem = styled(Item)(({ selected }) => ({
  backgroundColor: selected ? "#eee" : "#ddd",
  outline: "2px solid black",
  fontWeight: "700",
}));

const SelectAll = ({ state, dispatch, onContextMenu, children }) => {
  const handleClick = () => {
    dispatch(setSelectAll());
  };

  const handleMouseDown = (e, column) => {
    // TODO
  };

  const handleMouseUp = (e, column) => {
    // TODO
  };

  const selected =
    state.highlighted.rows.length > 0 &&
    Array(SheetConfig.MAX_ROWS)
      .fill(0)
      .map((_, it) => it + 1)
      .every((row) => state.highlighted.rows.includes(row)) &&
    state.highlighted.columns.length > 0 &&
    Array(SheetConfig.MAX_COLUMNS)
      .fill(0)
      .map((_, it) => SheetConfig.COLUMNS[it])
      .every((column) => state.highlighted.columns.includes(column));

  return (
    <HeaderItem
      selected={selected}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onContextMenu={onContextMenu}
    >
      {children}
    </HeaderItem>
  );
};

export default SelectAll;
