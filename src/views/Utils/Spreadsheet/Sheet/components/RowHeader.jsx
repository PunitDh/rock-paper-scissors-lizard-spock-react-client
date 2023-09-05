import styled from "@emotion/styled";
import { Item } from "../../styles";
import { setSelectedRow } from "../actions";

const HeaderItem = styled(Item)(({ selected }) => ({
  backgroundColor: selected ? "#eee" : "#ddd",
  outline: "2px solid black",
  fontWeight: "700",
}));

const RowHeader = ({ state, dispatch, row, onContextMenu }) => {
  const handleRowHeaderMouseDown = (e, row) => {
    // TODO
  };

  const handleRowHeaderMouseUp = (e, row) => {
    // TODO
  };

  const handleRowHeaderClick = (e, row) => {
    dispatch(setSelectedRow(row));
  };

  return (
    <HeaderItem
      onClick={(e) => handleRowHeaderClick(e, row)}
      selected={
        state.selected.row === row ||
        state.highlighted.rows.includes(row)
      }
      onMouseDown={handleRowHeaderMouseDown}
      onMouseUp={handleRowHeaderMouseUp}
      onContextMenu={onContextMenu}
    >
      {row}
    </HeaderItem>
  );
};

export default RowHeader;
