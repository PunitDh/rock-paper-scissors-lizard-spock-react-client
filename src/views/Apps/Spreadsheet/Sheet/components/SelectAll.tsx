import { Dispatch } from "react";
import { SheetConfig } from "../constants";
import { HeaderItem } from "../styles";
import { selectAll } from "../actions";
import styled from "@emotion/styled";
import { useMemo } from "react";
import useEventHandler from "../hooks/useEventHandler";
import { Action, State } from "../types";

const SelectAllItem = styled(HeaderItem)({
  height: "1.5rem",
  width: "3%",
  cursor: "cell",
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

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
};

const SelectAll = ({ state, dispatch }: Props) => {
  const eventHandler = useEventHandler();
  const handleClick = () => {
    dispatch(selectAll());
  };
  const handleContextMenu = (e: React.MouseEvent) =>
    eventHandler.handleContextMenu(e);

  const selected = useMemo<boolean>(
    () =>
      Array(state.maxRows)
        .fill(0)
        .map((_, it) => it + 1)
        .every((row) => state.highlighted.rows.has(row)) &&
      Array(state.maxColumns)
        .fill(0)
        .map((_, it) => SheetConfig.COLUMNS[it])
        .every((column) => state.highlighted.columns.has(column)),
    [
      state.highlighted.columns,
      state.highlighted.rows,
      state.maxColumns,
      state.maxRows,
    ],
  );

  return (
    <SelectAllItem
      selected={selected}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      id="select-all"
    >
      <Corner />
    </SelectAllItem>
  );
};

export default SelectAll;
