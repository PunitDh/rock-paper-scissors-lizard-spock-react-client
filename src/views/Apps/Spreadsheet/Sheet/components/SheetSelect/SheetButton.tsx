import React, { Dispatch, useEffect, useRef, useState } from "react";
import { renameSheet, setActiveSheet } from "../../actions";
import { SheetButtonItem, SheetInputItem } from "./styles";
import { Action, Sheet, State } from "../../types";
import ConfirmationDialog from "../../../../../../components/shared/ConfirmationDialog";
import EnterPassword from "./EnterPassword";
import { useNotification } from "../../../../../../hooks";

type SheetButtonProps = {
  state: State;
  dispatch: Dispatch<Action>;
  sheet: Sheet;
  rename: string | null;
  onContextMenu: (e: React.MouseEvent) => void;
  onRename: () => void;
  onDoubleClick: (sheetId: string) => void;
};

const SheetButton = ({
  state,
  dispatch,
  sheet,
  rename,
  onContextMenu,
  onRename,
  onDoubleClick,
}: SheetButtonProps) => {
  const [sheetName, setSheetName] = useState(sheet.name);
  const [passwordPromptOpen, setPasswordPromptOpen] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const sheetRenameRef = useRef<HTMLInputElement | null>(null);
  const renameMode = sheet.id === rename;
  const notification = useNotification();

  const selectSheet = (sheetId: string) => () => {
    if (state.sheets[sheetId].protected && state.activeSheet !== sheet.id) {
      setPasswordPromptOpen(true);
    } else {
      dispatch(setActiveSheet(sheetId));
    }
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSheetName(e.target.value);
  };

  const handleRename = (e: React.FormEvent) => {
    e.preventDefault();
    onRename();
    dispatch(renameSheet(sheet.id, sheetName));
  };

  const handleDoubleClick = () => {
    onDoubleClick(sheet.id);
  };

  const handleClosePasswordPrompt = () => {
    setPasswordPromptOpen(false);
  };

  const checkPassword = () => {
    if (password === state.sheets[sheet.id].password) {
      dispatch(setActiveSheet(sheet.id));
    } else {
      notification.error("Wrong password entered");
    }
    setPassword("");
  };

  useEffect(() => {
    console.log("Sheet button hook triggered", sheet.id);
    if (renameMode && sheetRenameRef.current) {
      sheetRenameRef.current.focus();
      sheetRenameRef.current.setSelectionRange(0, sheet.name.length);
    }
  }, [renameMode, sheet.id, sheet.name.length]);

  return (
    <form onSubmit={handleRename}>
      {renameMode ? (
        <>
          <SheetInputItem
            ref={sheetRenameRef}
            type="text"
            value={sheetName}
            onChange={handleChangeName}
            onBlur={onRename}
          />
          <input type="submit" style={{ display: "none" }} />
        </>
      ) : (
        <SheetButtonItem
          draggable={true}
          type="button"
          onClick={selectSheet(sheet.id)}
          onContextMenu={onContextMenu}
          onDoubleClick={handleDoubleClick}
          active={state.activeSheet === sheet.id}
          id={sheet.id}
        >
          {sheet.name}
        </SheetButtonItem>
      )}
      {state.sheets[sheet.id].protected && (
        <ConfirmationDialog
          id="sheet-password-prompt-confirmation-dialog"
          keepMounted
          open={passwordPromptOpen}
          onCancel={handleClosePasswordPrompt}
          onConfirm={checkPassword}
          value={password}
          title="Protected"
          confirmBtnText="Submit"
          content={
            <EnterPassword
              password={password}
              setPassword={setPassword}
              onSubmit={checkPassword}
            />
          }
        />
      )}
    </form>
  );
};

export default SheetButton;
