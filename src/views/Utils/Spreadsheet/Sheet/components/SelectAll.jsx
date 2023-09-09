import { SheetConfig } from "../constants";
import { HeaderItem } from "../styles";
import { selectAll } from "../actions";
import styled from "@emotion/styled";

const SelectAllItem = styled(HeaderItem)({
  height: "1.5rem",
  width: "3%",
  cursor: "se-resize",
});

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
    // TODO
  };

  const selected =
    Array(state.maxRows)
      .fill(0)
      .map((_, it) => it + 1)
      .every((row) => state.highlighted.rows.includes(row)) &&
    Array(state.maxColumns)
      .fill(0)
      .map((_, it) => SheetConfig.COLUMNS[it])
      .every((column) => state.highlighted.columns.includes(column));

  return (
    <SelectAllItem
      selected={selected}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onContextMenu={onContextMenu}
      onKeyDown={handleKeyDown}
      id={"select-all"}
    >
      <Corner />
    </SelectAllItem>
  );
};

export default SelectAll;
