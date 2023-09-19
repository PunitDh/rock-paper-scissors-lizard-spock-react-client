import React, { Dispatch, useState } from "react";
import { Action, Sheet, State } from "../../types";
import FlexBox from "../../../../../../components/shared/FlexBox";
import SheetSelectMenu from "./SheetSelectMenu";
import SheetButton from "./SheetButton";
import { addSheet } from "../../actions";
import { SheetButtonItem } from "./styles";
import { IconPlus } from "@tabler/icons-react";
import { toList } from "../../../../../../utils/List";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
};

const SheetSelect = ({ state, dispatch }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [renameState, setRenameState] = useState<string | null>(null);

  const handleContextMenu = (sheetId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(sheetId);
    setAnchorEl(element);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleAddSheet = () => {
    dispatch(addSheet());
  };

  const handleRename = (sheetId: string) => {
    setRenameState(sheetId);
  };

  const handleCloseRename = () => {
    setRenameState(null);
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
        onRename={handleRename}
      />
      <SheetButtonItem onClick={handleAddSheet}>
        <IconPlus width={20} />
      </SheetButtonItem>
      {toList<Sheet>(Object.values(state.sheets))
        .sortBy((it) => it.index)
        .map((sheet: Sheet) => (
          <SheetButton
            key={sheet.id}
            state={state}
            dispatch={dispatch}
            sheet={sheet}
            rename={renameState}
            onContextMenu={handleContextMenu(sheet.id)}
            onRename={handleCloseRename}
            onDoubleClick={handleRename}
          />
        ))}
    </FlexBox>
  );
};

export default SheetSelect;
