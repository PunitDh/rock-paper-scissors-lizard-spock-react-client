import { Dispatch, useEffect, useRef, useState } from "react";
import { lockSheet, renameSheet, setSheets } from "../../actions";
import { SheetButtonItem, SheetInputItem } from "./styles";
import { Action, Sheet, State } from "../../types";
import { Lock, LockOpen } from "@mui/icons-material";

type SheetButtonProps = {
  state: State;
  dispatch: Dispatch<Action>;
  sheet: Sheet;
  rename: string | null;
  onContextMenu: (e: React.MouseEvent) => void;
  onRename: () => void;
  onDoubleClick: (sheetId: string) => void;
  onSelectSheet: (sheetId: string) => () => void;
};

const SheetButton = ({
  state,
  dispatch,
  sheet,
  rename,
  onContextMenu,
  onRename,
  onDoubleClick,
  onSelectSheet,
}: SheetButtonProps): JSX.Element => {
  const [sheetName, setSheetName] = useState(sheet.name);

  const sheetRenameRef = useRef<HTMLInputElement | null>(null);
  const renameMode: boolean = sheet.id === rename;
  const isActive: boolean = state.activeSheet === sheet.id;

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

  useEffect(() => {
    console.log("Sheet button hook triggered", sheet.id);
    if (renameMode && sheetRenameRef.current) {
      sheetRenameRef.current.focus();
      sheetRenameRef.current.setSelectionRange(0, sheet.name.length);
    }
  }, [renameMode, sheet.id, sheet.name.length]);

  useEffect(() => {
    if (!isActive && sheet.protected && !sheet.locked)
      dispatch(lockSheet(sheet.id));
  }, [dispatch, isActive, sheet.id, sheet.locked, sheet.protected]);

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
          onClick={onSelectSheet(sheet.id)}
          onContextMenu={onContextMenu}
          onDoubleClick={handleDoubleClick}
          active={isActive}
          id={sheet.id}
        >
          {sheet.protected &&
            (sheet.locked ? (
              <Lock sx={{ width: "0.75rem" }} />
            ) : (
              <LockOpen sx={{ width: "0.75rem" }} />
            ))}{" "}
          {sheet.name}
        </SheetButtonItem>
      )}
    </form>
  );
};

export default SheetButton;
