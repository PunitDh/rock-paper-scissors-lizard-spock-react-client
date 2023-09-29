import { Dispatch, useState } from "react";
import { Action, Sheet, SheetId, State } from "../../types";
import FlexBox from "../../../../../../components/shared/FlexBox";
import SheetSelectMenu from "./SheetSelectMenu";
import SheetButton from "./SheetButton";
import { addSheet, setActiveSheet } from "../../actions";
import { DragArea, SheetButtonItem } from "./styles";
import { IconPlus } from "@tabler/icons-react";
import { toList } from "../../../../../../utils/List";
import PasswordPrompt from "./Dialog/PasswordPrompt";
import { useNotification } from "../../../../../../hooks";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
};

const SheetSelect = ({ state, dispatch }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [renameState, setRenameState] = useState<SheetId | null>(null);
  const [passwordPrompt, setPasswordPrompt] = useState<SheetId | null>(null);
  const [onPasswordSuccess, setOnPasswordSuccess] = useState<() => void>(
    () => {}
  );
  const notification = useNotification();

  const handleContextMenu = (sheetId: SheetId) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(sheetId);
    setAnchorEl(element);
  };

  const closeMenu = () => setAnchorEl(null);
  const closePasswordPrompt = () => setPasswordPrompt(null);
  const handleAddSheet = () => dispatch(addSheet());
  const handleRename = (sheetId: SheetId) => setRenameState(sheetId);
  const handleCloseRename = () => setRenameState(null);

  const selectSheet = (sheetId: SheetId) => () => {
    if (state.activeSheet !== sheetId) {
      if (state.sheets[sheetId].protected) {
        promptPassword(sheetId, () => {
          const selectedSheet: Sheet = state.sheets[sheetId];
          dispatch(setActiveSheet(selectedSheet.id));
          notification.success(`'${selectedSheet.name}' unlocked`);
        });
      } else {
        dispatch(setActiveSheet(sheetId));
      }
    }
  };

  const promptPassword = (sheetId: SheetId, onSuccess: () => void): void => {
    setPasswordPrompt(sheetId);
    setOnPasswordSuccess(() => onSuccess);
  };

  return (
    <FlexBox
      justifyContent="flex-start"
      marginLeft="1rem"
      gap="0.3rem"
      flexWrap="wrap"
    >
      <PasswordPrompt
        state={state}
        open={passwordPrompt}
        onCancel={closePasswordPrompt}
        onConfirm={onPasswordSuccess}
      />
      <SheetSelectMenu
        state={state}
        dispatch={dispatch}
        anchor={anchorEl}
        onClose={closeMenu}
        onRename={handleRename}
        promptPassword={promptPassword}
      />
      <SheetButtonItem onClick={handleAddSheet}>
        <IconPlus width={20} />
      </SheetButtonItem>
      <DragArea id="sheet-select-drag-area">
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
              onSelectSheet={selectSheet}
            />
          ))}
      </DragArea>
    </FlexBox>
  );
};

export default SheetSelect;
