import { Item } from "../../styles";
import { SheetConfig } from "../../constants";
import { selectAll } from "../actions";
import styled from "@emotion/styled";

const HeaderItem = styled(Item)(({ selected }) => ({
  backgroundColor: selected ? "#eee" : "#ddd",
  outline: "2px solid black",
  fontWeight: "700",
}));

const Corner = styled.div({
  width: "100%",
  height: "100%",
  backgroundColor: "transparent",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    bottom: "0",
    right: "0",
    border: "0.5rem solid transparent",
    borderRightColor: "#AAA",
    borderBottomColor: "#AAA",
  },
});

const SelectAll = ({ state, dispatch, onContextMenu }) => {
  const handleClick = () => {
    dispatch(selectAll());
  };

  const handleMouseDown = (e, column) => {
    // TODO
  };

  const handleMouseUp = (e, column) => {
    // TODO
  };

  const handleKeyDown = (e) => {
    console.log(e.key);
  };

  const selected =
    Array(SheetConfig.MAX_ROWS)
      .fill(0)
      .map((_, it) => it + 1)
      .every((row) => state.highlighted.rows.includes(row)) &&
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
      onKeyDown={handleKeyDown}
    >
      <Corner />
    </HeaderItem>
  );
};

export default SelectAll;
