import styled from "@emotion/styled";
import { Item } from "../../styles";
import { setMenuAnchorElement, setSelectedRow } from "../actions";

const HeaderItem = styled(Item)(({ selected }) => {
  return {
    backgroundColor: selected ? "#eee" : "#ddd",
    outline: "2px solid black",
    fontWeight: "700",
  };
});

const RowHeader = ({ state, dispatch, row }) => {
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
      key={row}
      onClick={(e) => handleRowHeaderClick(e, row)}
      onMouseDown={handleRowHeaderMouseDown}
      onMouseUp={handleRowHeaderMouseUp}
      selected={
        state.selected.row === row || state.highlighted.rows.includes(row)
      }
      onContextMenu={(e) => dispatch(setMenuAnchorElement(e.currentTarget))}
    >
      {row}
    </HeaderItem>
  );
};

export default RowHeader;
