import React, { Dispatch, useState } from "react";
import { Action, Sheet, State } from "../../types";
import FlexBox from "../../../../../../components/shared/FlexBox";
import { addSheet, setActiveSheet } from "../../actions";
import styled from "@emotion/styled";
import { IconPlus } from "@tabler/icons-react";
import SheetSelectMenu from "../ContextMenu/SheetSelectMenu";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
};

type SheetButtonProps = {
  active?: boolean;
};

const SheetButton = styled.button(({ active }: SheetButtonProps) => ({
  backgroundColor: active ? "#E0E9FF" : "#EAEAEA",
  border: active ? "1px solid black" : "1px solid rgba(0,0,0,0.1)",
  outline: "none",
  cursor: "pointer",
  padding: "0.5rem 1rem 0.5rem 1rem",
  height: "2rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  userSelect: "element",
  "&:hover": {
    backgroundColor: "#E0E9F7",
    border: "1px solid black",
  },
  "&:active": {
    backgroundColor: "#E0E9FF",
    border: "1px solid black",
  },
}));

const SheetSelect = ({ state, dispatch }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleContextMenu = (sheetId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(sheetId);
    setAnchorEl(element);
  };

  const selectSheet = (sheetId: string) => () => {
    dispatch(setActiveSheet(sheetId));
  };

  const handleAddSheet = () => {
    dispatch(addSheet());
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <FlexBox
      justifyContent="flex-start"
      marginLeft="1rem"
      gap="0.3rem"
      flexWrap="wrap"
    >
      <SheetSelectMenu
        state={state}
        dispatch={dispatch}
        anchor={anchorEl}
        onClose={closeMenu}
      />
      <SheetButton onClick={handleAddSheet}>
        <IconPlus width={20} />
      </SheetButton>
      {Object.values(state.sheets).map((sheet: Sheet) => (
        <SheetButton
          key={sheet.id}
          onClick={selectSheet(sheet.id)}
          onContextMenu={handleContextMenu(sheet.id)}
          active={state.activeSheet === sheet.id}
          id={sheet.id}
        >
          {sheet.name}
        </SheetButton>
      ))}
    </FlexBox>
  );
};

export default SheetSelect;
