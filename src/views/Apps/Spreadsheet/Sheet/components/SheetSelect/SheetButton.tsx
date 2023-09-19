import React, { Dispatch, useEffect, useRef, useState } from "react";
import { renameSheet, setActiveSheet } from "../../actions";
import { SheetButtonItem, SheetInputItem } from "./styles";
import { Action, Sheet, State } from "../../types";

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
  const sheetRenameRef = useRef<HTMLInputElement | null>(null);
  const renameMode = sheet.id === rename;

  const selectSheet = (sheetId: string) => () => {
    dispatch(setActiveSheet(sheetId));
  };

  const handleChangeName = (e: React.ChangeEvent) => {
    e.preventDefault();
    setSheetName((e.target as HTMLInputElement).value);
  };

  const handleRename = (e: React.FormEvent) => {
    e.preventDefault();
    onRename();
    dispatch(renameSheet(sheet.id, sheetName));
  };

  const handleDoubleClick = () => {
    onDoubleClick(sheet.id);
  };

  useEffect(() => {
    if (renameMode && sheetRenameRef.current) {
      sheetRenameRef.current.focus();
      sheetRenameRef.current.setSelectionRange(0, sheet.name.length);
    }
  }, [renameMode, sheet.name.length]);

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
    </form>
  );
};

export default SheetButton;
