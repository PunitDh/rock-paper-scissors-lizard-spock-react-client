import styled from "@emotion/styled";
import { setSelectedRow } from "../actions";
import { HeaderItem } from "../../styles";

const RowHeaderItem = styled(HeaderItem)({
  width: "3%",
  cursor: "e-resize",
  "&:active": {
    backgroundColor: "#555",
    color: "white",
  },
});

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
    <RowHeaderItem
      onClick={(e) => handleRowHeaderClick(e, row)}
      selected={
        state.selected.row === row || state.highlighted.rows.includes(row)
      }
      onMouseDown={handleRowHeaderMouseDown}
      onMouseUp={handleRowHeaderMouseUp}
      onContextMenu={onContextMenu}
    >
      {row}
    </RowHeaderItem>
  );
};

export default RowHeader;
