import { SheetConfig } from "../constants";
import { addCellsToHighlight, setSelectedColumn } from "../actions";
import { HeaderItem } from "../styles";
import styled from "@emotion/styled";
import { isCtrlKeyPressed } from "../utils/cellUtils";
import Range from "../models/Range";

const ColumnHeaderItem = styled(HeaderItem)({
  cursor: "s-resize",
  "&:active": {
    backgroundColor: "#555",
    color: "white",
  },
});

const ColumnHeader = ({ state, dispatch, column, onContextMenu }) => {
  const handleClick = (e) => {
    if (isCtrlKeyPressed(e)) {
      const range = Range.createFlat(
        `${column}1`,
        `${column}${state.maxRows}`
      ).cellIds;
      dispatch(addCellsToHighlight(range));
    } else if (e.shiftKey) {
      console.log(
        state.highlighted.cells,
        state.highlighted.cellAnchor,
        state.highlighted.hovered
      );
      const range = Range.createFlat(
        `${column}1`,
        `${column}${state.maxRows}`
      ).cellIds;
    } else {
      dispatch(setSelectedColumn(column));
    }
  };

  const handleMouseDown = (e, column) => {
    // TODO
  };

  const handleMouseUp = (e, column) => {
    // TODO
  };

  return (
    <ColumnHeaderItem
      colSpan={1}
      selected={
        state.selectedCell.column === column ||
        state.highlighted.columns.includes(column)
      }
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onContextMenu={onContextMenu}
    >
      {column}
    </ColumnHeaderItem>
  );
};

export default ColumnHeader;
