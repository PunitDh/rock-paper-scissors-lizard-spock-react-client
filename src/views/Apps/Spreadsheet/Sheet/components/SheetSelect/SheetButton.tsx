import React, { Dispatch, useEffect, useRef, useState } from "react";
import { renameSheet, setActiveSheet } from "../../actions";
import { SheetButtonItem, SheetInputItem } from "./styles";
import { Action, Sheet, State } from "../../types";
import { useNotification } from "../../../../../../hooks";
import PasswordPrompt from "./Dialog/PasswordPrompt";

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
  const notification = useNotification();
  const [sheetName, setSheetName] = useState(sheet.name);
  const [passwordPromptOpen, setPasswordPromptOpen] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const sheetRenameRef = useRef<HTMLInputElement | null>(null);
  const renameMode: boolean = sheet.id === rename;
  const selectedSheet: Sheet = state.sheets[sheet.id];

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
    if (sheetName.trim().length > 0) {
      dispatch(renameSheet(sheet.id, sheetName.trim()));
      setSheetName(sheetName.trim());
    } else {
      setSheetName(sheet.name);
    }
  };

  const handleDoubleClick = () => onDoubleClick(sheet.id);
  const handleClosePasswordPrompt = () => setPasswordPromptOpen(false);

  const checkPassword = () => {
    if (password === selectedSheet.password) {
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

  function drag(e: React.DragEvent<HTMLFormElement>) {
    e.dataTransfer.setData("text", (e.target as HTMLFormElement).id);
    e.dataTransfer.effectAllowed = "move";
  }

  function drop(e: React.DragEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    const sourceIndex = state.sheets[data].index;
    const targetIndex = state.sheets[(e.target as HTMLFormElement).id].index;

    if (sourceIndex !== undefined && targetIndex !== undefined) {
      const newSheets = { ...state.sheets };
      newSheets[data].index = targetIndex;
      newSheets[(e.target as HTMLFormElement).id].index = sourceIndex;

      // Sort the sheets by index to ensure correct rendering order
      const sortedSheets = Object.values(newSheets).sort(
        (sheetA, sheetB) => sheetA.index - sheetB.index
      );

      // Create an object with the sorted sheets
      const sortedSheetObject = {};
      sortedSheets.forEach((sheet) => {
        sortedSheetObject[sheet.id] = sheet;
      });

      // dispatch(setSheets(sortedSheetObject));
    }
  }

  function allowDrop(e: React.DragEvent) {
    e.preventDefault();
  }

  return (
    <form
      onSubmit={handleRename}
      draggable={true}
      onDragStart={drag}
      id={`form-${sheet.id}`}
      onDrop={drop}
      onDragOver={allowDrop}
    >
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
      {selectedSheet.protected && (
        <PasswordPrompt
          open={passwordPromptOpen}
          onCancel={handleClosePasswordPrompt}
          onConfirm={checkPassword}
          value={password}
          setValue={setPassword}
        />
      )}
    </form>
  );
};

export default SheetButton;
