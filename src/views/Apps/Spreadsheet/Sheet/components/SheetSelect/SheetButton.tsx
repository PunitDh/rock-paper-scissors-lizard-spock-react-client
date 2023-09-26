import { Dispatch, useEffect, useRef, useState } from "react";
import { renameSheet, setActiveSheet, setSheets } from "../../actions";
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
    const name = sheetName.trim();
    if (name.length > 0) {
      dispatch(renameSheet(sheet.id, name));
      setSheetName(name);
    } else {
      setSheetName(sheet.name);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setSheetName(sheet.name);
    onRename();
  };

  const handleDoubleClick = () => onDoubleClick(sheet.id);
  const handleClosePasswordPrompt = () => setPasswordPromptOpen(false);

  const checkPassword = () => {
    if (password === selectedSheet.password) {
      dispatch(setActiveSheet(sheet.id));
      notification.success(`'${sheet.name}' unlocked`);
    } else {
      notification.error("Wrong password entered");
    }
    setPassword("");
    setPasswordPromptOpen(false);
  };

  useEffect(() => {
    console.log("Sheet button hook triggered", sheet.id);
    if (renameMode && sheetRenameRef.current) {
      sheetRenameRef.current.focus();
      sheetRenameRef.current.setSelectionRange(0, sheet.name.length);
    }
  }, [renameMode, sheet.id, sheet.name.length]);

  function drag(e: React.DragEvent<HTMLFormElement>) {
    e.dataTransfer.setData(
      "text",
      (e.target as HTMLFormElement).getAttribute("data-sheet-id")!
    );
    e.dataTransfer.effectAllowed = "move";
  }

  function drop(e: React.DragEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const data = e.dataTransfer.getData("text");
    const sourceSheet = state.sheets[data];
    const targetSheet = state.sheets[target.id];

    if (sourceSheet && targetSheet) {
      const newSheets = { ...state.sheets };
      newSheets[data].index = targetSheet.index;
      newSheets[target.id].index = sourceSheet.index;

      const sortedSheets = Object.values(newSheets).sort(
        (sheetA: Sheet, sheetB: Sheet) => sheetA.index - sheetB.index
      );

      const sortedSheetObject = sortedSheets.reduce(
        (acc, sheet) => ({
          ...acc,
          [sheet.id]: sheet,
        }),
        {}
      );

      dispatch(setSheets(sortedSheetObject));
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
      data-sheet-id={sheet.id}
    >
      {renameMode ? (
        <>
          <SheetInputItem
            ref={sheetRenameRef}
            type="text"
            value={sheetName}
            onChange={handleChangeName}
            onBlur={handleBlur}
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
