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
import { PasswordPromptProps } from "./types";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
};

const initialPasswordPromptState: PasswordPromptProps = {
  sheetId: null,
  onSuccess: () => {},
  successMessage: undefined,
};

const SheetSelect = ({ state, dispatch }: Props): React.ReactNode => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [renameState, setRenameState] = useState<SheetId | null>(null);
  const [passwordPrompt, setPasswordPrompt] = useState<PasswordPromptProps>(
    initialPasswordPromptState
  );

  const handleContextMenu = (sheetId: SheetId) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(sheetId);
    setAnchorEl(element);
  };

  const closeMenu = () => setAnchorEl(null);
  const closePasswordPrompt = () =>
    setPasswordPrompt(initialPasswordPromptState);
  const handleAddSheet = () => dispatch(addSheet());
  const handleRename = (sheetId: SheetId) => setRenameState(sheetId);
  const handleCloseRename = () => setRenameState(null);

  const selectSheet = (sheetId: SheetId) => () => {
    const selectedSheet: Sheet = state.sheets[sheetId];
    if (state.activeSheet !== sheetId) {
      promptPassword(
        sheetId,
        () => dispatch(setActiveSheet(sheetId)),
        `'${selectedSheet.name}' unlocked`
      );
    }
  };

  const promptPassword = (
    sheetId: SheetId,
    onSuccess: () => void,
    successMessage?: string
  ): void => {
    if (state.sheets[sheetId].protected) {
      setPasswordPrompt({ sheetId, onSuccess, successMessage });
    } else {
      onSuccess();
    }
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
        dispatch={dispatch}
        onCancel={closePasswordPrompt}
        passwordPrompt={passwordPrompt}
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
