import { SheetConfig } from "./constants";
import { cellSorter, isFormula, typeInInputBox } from "./utils/cellUtils";
import { SheetAction } from "./actions";
import Cell from "./models/Cell";
import CellData, { getFormulaTrackedCells } from "./models/CellData";
import CellRange from "./models/CellRange";
import { cloneDeep, uniqueId } from "lodash";
import { AutoCalculate, BorderType } from "./components/Toolbar/constants";
import Highlight from "./models/Highlight";
import {
  Action,
  CellId,
  ColumnId,
  InsertColumnLocation,
  InsertRowLocation,
  Memento,
  RowId,
  Sheet,
  SheetId,
  State,
} from "./types";
import SheetContentData from "./models/SheetContentData";
import { isInstance } from "../../../../utils";
import SheetContent from "./models/SheetContent";
import SetExtended, { setOf } from "../../../../utils/Set";
import { toList } from "../../../../utils/List";
import { reIndexSheets } from "./utils/sheetUtils";

const initialSheetId = uniqueId("sheet-");

export const initialState: State = {
  maxRows: SheetConfig.MAX_ROWS,
  maxColumns: SheetConfig.MAX_COLUMNS,
  inputRef: null,
  fillerRef: null,
  formulaFieldRef: null,
  defaultRowHeight: 24,
  defaultColumnWidth: 50,
  maxUndos: 64,
  selectedCell: new Cell("A1"),
  formulaMode: false,
  hovered: "",
  highlighted: new Highlight(),
  activeSheet: initialSheetId,
  sheets: {
    [initialSheetId]: {
      id: initialSheetId,
      index: 1,
      name: "Sheet 1",
      content: new SheetContent(),
      initialContent: new SheetContent(),
      protected: false,
    },
  },
  formulaTrackedCells: setOf<CellId>(),
  formulaHighlighted: setOf<CellId>(),
  mouseDown: false,
  dragging: false,
  fillerMode: false,
  formulaFieldText: "",
  isFormulaFieldFocused: false,
  menuAnchorElement: null,
  memento: [],
  currentMementoId: null,
};

export const reducer = (state: State, action: Action): State => {
  const activeSheet: Sheet = state.sheets[state.activeSheet];
  const activeSheetContent: SheetContent = activeSheet.content;
  const activeSheetContentData: SheetContentData = activeSheetContent.data;
  const selectedCellId: CellId = state.selectedCell.id;
  const highlightedCells: SetExtended<CellId> = state.highlighted.cells;

  switch (action.type) {
    case SheetAction.SET_SELECTED: {
      let selectedCell: Cell;

      if (Cell.isValidId(action.payload) || Cell.isValidId(action.payload.id)) {
        selectedCell = isInstance(action.payload, Cell)
          ? action.payload
          : new Cell(action.payload);

        return {
          ...state,
          selectedCell,
        };
      }
      return state;
    }

    case SheetAction.SET_INPUT_REF: {
      return {
        ...state,
        inputRef: action.payload,
      };
    }
    case SheetAction.SET_FILLER_REF: {
      return {
        ...state,
        fillerRef: action.payload,
      };
    }

    case SheetAction.SET_FORMULA_FIELD_REF: {
      return {
        ...state,
        formulaFieldRef: action.payload,
      };
    }

    case SheetAction.ADD_NAMED_RANGE: {
      const stateContent = new SheetContent(
        activeSheetContent.rowHeights,
        activeSheetContent.columnWidths,
        activeSheetContent.data,
        {
          ...activeSheetContent.namedRanges,
          [action.payload]: state.highlighted.hasLength
            ? highlightedCells
            : [selectedCellId],
        }
      );

      return {
        ...state,
        sheets: {
          ...state.sheets,
          [state.activeSheet]: {
            ...activeSheet,
            content: stateContent,
          },
        },
      };
    }

    case SheetAction.SET_FORMULA_FIELD_TEXT: {
      return {
        ...state,
        formulaFieldText: action.payload,
      };
    }

    case SheetAction.SET_FORMULA_FIELD_FOCUSED: {
      return {
        ...state,
        isFormulaFieldFocused: action.payload,
      };
    }
    case SheetAction.RESET_FORMULA_FIELD: {
      return {
        ...state,
        formulaFieldText: "",
        isFormulaFieldFocused: false,
        formulaMode: false,
      };
    }

    case SheetAction.SET_FORMULA_MODE: {
      return {
        ...state,
        formulaMode: action.payload,
      };
    }

    case SheetAction.SET_HOVERED: {
      if (Cell.isValidId(action.payload))
        return {
          ...state,
          hovered: action.payload,
        };
      return state;
    }

    case SheetAction.SET_HIGHLIGHT_CELL_ANCHOR: {
      const highlighted = new Highlight({ ...state.highlighted }).setCellAnchor(
        action.payload
      );

      return {
        ...state,
        highlighted,
      };
    }
    case SheetAction.SET_HIGHLIGHT_ROW_ANCHOR: {
      const highlighted = new Highlight({ ...state.highlighted })
        .setRowAnchor(action.payload)
        .setCellAnchor(null);

      return {
        ...state,
        highlighted,
      };
    }
    case SheetAction.SET_HIGHLIGHT_COLUMN_ANCHOR: {
      const highlighted = new Highlight({ ...state.highlighted })
        .setColumnAnchor(action.payload)
        .setCellAnchor(null);

      return {
        ...state,
        highlighted,
      };
    }

    case SheetAction.HIGHLIGHT_CELLS: {
      const { start, end } = action.payload;
      if (!start || !end) return state;

      const range = CellRange.createFlat(start, end);

      const highlighted = new Highlight({ ...state.highlighted })
        .setCells(setOf<CellId>(range.cellIds.flat()), activeSheetContentData)
        .setRows(setOf<RowId>(range.rows))
        .setColumns(setOf<ColumnId>(range.columns))
        .setRangeStart(start)
        .setRangeEnd(end);

      return {
        ...state,
        highlighted,
      };
    }

    case SheetAction.SET_SHEETS: {
      return {
        ...state,
        sheets: reIndexSheets(action.payload),
      };
    }

    case SheetAction.ADD_SHEET: {
      const sheetIndices = Object.values(state.sheets).map(
        (sheet) => sheet.index
      );
      const newSheet = {
        id: uniqueId("sheet-"),
        index: Math.max(...sheetIndices) + 1,
        name: `Sheet ${Object.keys(state.sheets).length + 1}`,
        content: new SheetContent(),
        initialContent: new SheetContent(),
        protected: false,
      };

      return {
        ...state,
        sheets: reIndexSheets({
          ...state.sheets,
          [newSheet.id]: newSheet,
        }),
        activeSheet: newSheet.id,
      };
    }

    case SheetAction.RENAME_SHEET: {
      const { sheetId, sheetName } = action.payload;

      return {
        ...state,
        sheets: {
          ...state.sheets,
          [sheetId]: {
            ...state.sheets[sheetId],
            name: sheetName,
          },
        },
      };
    }

    case SheetAction.MOVE_SHEET: {
      const { sheetId, offset } = action.payload;

      return {
        ...state,
        sheets: reIndexSheets({
          ...state.sheets,
          [sheetId]: {
            ...state.sheets[sheetId],
            index: state.sheets[sheetId].index + offset,
          },
        }),
      };
    }

    case SheetAction.DELETE_SHEET: {
      const sheetIds = Object.keys(state.sheets);
      if (sheetIds.length === 1) {
        return state;
      }

      const index = sheetIds.findIndex((it) => it === action.payload);
      const sheets = sheetIds
        .filter((sheetId) => sheetId !== action.payload)
        .reduce(
          (stateSheets: { [key: SheetId]: Sheet }, sheetId: SheetId) => ({
            ...stateSheets,
            [sheetId]: state.sheets[sheetId],
          }),
          {}
        );

      const activeSheet = sheetIds[index - 1] || sheetIds[index + 1];

      return {
        ...state,
        sheets: reIndexSheets(sheets),
        activeSheet,
      };
    }

    case SheetAction.PROTECT_SHEET: {
      const { sheetId, password } = action.payload;

      return {
        ...state,
        sheets: {
          ...state.sheets,
          [sheetId]: {
            ...state.sheets[sheetId],
            protected: true,
            password,
          },
        },
      };
    }

    case SheetAction.SET_ACTIVE_SHEET: {
      return {
        ...state,
        activeSheet: action.payload,
      };
    }

    case SheetAction.SET_SHEET_INDEX: {
      const { sheetId, index } = action.payload;

      return {
        ...state,
        sheets: {
          ...state.sheets,
          [sheetId]: {
            ...state.sheets[sheetId],
            index,
          },
        },
      };
    }

    case SheetAction.FORMULA_HIGHLIGHT_CELLS: {
      return {
        ...state,
        formulaHighlighted: action.payload,
      };
    }

    case SheetAction.FORMULA_HIGHLIGHT_CELL_RANGE: {
      const range = CellRange.createFlat(
        action.payload.start,
        action.payload.end
      );
      return {
        ...state,
        formulaHighlighted: toList<CellId>(
          range.cellIds as CellId[]
        ).toSetExtended(),
      };
    }

    case SheetAction.ADD_CELLS_TO_HIGHLIGHT: {
      const rows = setOf<RowId>();
      const columns = setOf<ColumnId>();
      const cells = setOf<CellId>(highlightedCells);

      action.payload.cellIds.forEach((id: CellId) => {
        const cell = new Cell(id);
        cells.add(cell.id);
        rows.add(cell.row);
        columns.add(cell.column);
      });

      return {
        ...state,
        highlighted: state.highlighted
          .setCells(cells, activeSheetContentData)
          .setRows(state.highlighted.rows.mergeWith(rows))
          .setColumns(state.highlighted.columns.mergeWith(columns))
          .setMultiSelect(action.payload.multiSelect),
      };
    }

    case SheetAction.REMOVE_CELLS_FROM_HIGHLIGHT: {
      const rowsToRemove = setOf<RowId>();
      const columnsToRemove = setOf<ColumnId>();
      const updatedCells = setOf<CellId>(highlightedCells);

      action.payload.forEach((cellId: CellId) => {
        const cell = new Cell(cellId);
        if (state.highlighted.includes(cellId)) {
          updatedCells.delete(cellId);
          rowsToRemove.add(cell.row);
          columnsToRemove.add(cell.column);
        }
      });

      const newHighlightedRows: SetExtended<number> =
        state.highlighted.rows.filter((row: number): boolean => {
          if (rowsToRemove.has(row)) {
            return !updatedCells
              .toArray()
              .some((cellId: CellId) => new Cell(cellId).row === row);
          }
          return true;
        });

      const newHighlightedColumns: SetExtended<ColumnId> =
        state.highlighted.columns.filter((column: ColumnId) => {
          if (columnsToRemove.has(column)) {
            // Check if there are other highlighted cells in this column
            return !updatedCells
              .toArray()
              .some(
                (cellId: CellId): boolean =>
                  (new Cell(cellId).column === column) as boolean
              );
          }
          return true;
        });

      return {
        ...state,
        highlighted: state.highlighted
          .setCells(updatedCells, activeSheetContentData)
          .setRows(newHighlightedRows)
          .setColumns(newHighlightedColumns),
      };
    }

    case SheetAction.DELETE_CELL_CONTENT: {
      if (action.payload) {
        return {
          ...state,
          sheets: {
            ...state.sheets,
            [state.activeSheet]: {
              ...activeSheet,
              content: {
                ...activeSheetContent,
                data: {
                  ...activeSheetContentData,
                  [action.payload]: new CellData({ id: action.payload }),
                } as SheetContentData,
              } as SheetContent,
            },
          },
        };
      }

      const data = Object.keys(activeSheetContentData)
        .filter((cell) => state.highlighted.includes(cell))
        .reduce((sheetContentData, cell) => {
          return {
            ...sheetContentData,
            [cell]: new CellData({ id: cell }),
          } as SheetContentData;
        }, activeSheetContentData);

      return {
        ...state,
        sheets: {
          ...state.sheets,
          [state.activeSheet]: {
            ...activeSheet,
            content: {
              ...activeSheetContent,
              data,
            } as SheetContent,
          },
        },
      };
    }

    case SheetAction.PASTE_CELL_CONTENT: {
      const { data, anchor } = action.payload;
      try {
        const parsed = JSON.parse(data);
        if (parsed.type === SheetConfig.FILE_TYPE) {
          const cellOffset = new Cell(anchor).getOffset(
            parsed.content[0].length - 1,
            parsed.content.length - 1,
            false
          );
          const range = CellRange.createHorizontalSliced(anchor, cellOffset.id);
          const updateObj: { [key: CellId]: CellData } = {};

          (range.cells as Cell[][]).forEach((row: Cell[], rowIndex: number) =>
            row.forEach((cell: Cell, cellIndex: number) => {
              updateObj[cell.id] = new CellData({
                id: cell.id,
                ...parsed.content[rowIndex][cellIndex],
              });
            })
          );

          const data = Object.keys(updateObj).reduce(
            (sheetContentData: SheetContentData, cellId: CellId) => {
              return {
                ...sheetContentData,
                [cellId]: updateObj[cellId],
              } as SheetContentData;
            },
            activeSheetContentData
          );

          return {
            ...state,
            sheets: {
              ...state.sheets,
              [state.activeSheet]: {
                ...activeSheet,
                content: {
                  ...activeSheetContent,
                  data,
                } as SheetContent,
              },
            },
          };
        }
      } catch (e) {
        const value = typeInInputBox(action.payload.data);
        return {
          ...state,
          sheets: {
            ...state.sheets,
            [state.activeSheet]: {
              ...activeSheet,
              content: {
                ...activeSheetContent,
                data: {
                  ...activeSheetContentData,
                  [action.payload.anchor.id]: {
                    value,
                  },
                } as SheetContentData,
              } as SheetContent,
            },
          },
        };
      }
      break;
    }

    case SheetAction.OPEN_CONTEXT_MENU: {
      return {
        ...state,
        menuAnchorElement: action.payload,
      };
    }

    case SheetAction.SET_SELECTED_ROW: {
      const range = CellRange.createFlat(
        `${SheetConfig.COLUMNS[0]}${action.payload}`,
        `${SheetConfig.COLUMNS[state.maxColumns - 1]}${action.payload}`
      );

      return {
        ...state,
        selectedCell: new Cell(state.selectedCell.column + action.payload),
        highlighted: state.highlighted
          .setCells(setOf<CellId>(range.cellIds.flat()), activeSheetContentData)
          .setRows(setOf<RowId>(range.rows))
          .setColumns(setOf<ColumnId>(range.columns)),
      };
    }

    case SheetAction.SET_ROW_HEIGHT: {
      return {
        ...state,
        sheets: {
          ...state.sheets,
          [state.activeSheet]: {
            ...activeSheet,
            content: {
              ...activeSheetContent,
              rowHeights: {
                ...activeSheetContent.rowHeights,
                [action.payload.row]: action.payload.height,
              },
            } as SheetContent,
          },
        },
      };
    }

    case SheetAction.SET_SELECTED_COLUMN: {
      const range = CellRange.createFlat(
        `${action.payload}1`,
        `${action.payload}${state.maxRows}`
      );
      return {
        ...state,
        selectedCell: new Cell(action.payload + state.selectedCell.row),
        highlighted: state.highlighted
          .setCells(setOf<CellId>(range.cellIds.flat()), activeSheetContentData)
          .setRows(setOf<RowId>(range.rows))
          .setColumns(setOf<ColumnId>(range.columns)),
      };
    }

    case SheetAction.SET_COLUMN_WIDTH: {
      return {
        ...state,
        sheets: {
          ...state.sheets,
          [state.activeSheet]: {
            ...activeSheet,
            content: {
              ...activeSheetContent,
              columnWidths: {
                ...activeSheetContent.columnWidths,
                [action.payload.column]: action.payload.width,
              },
            } as SheetContent,
          },
        },
      };
    }

    case SheetAction.INSERT_ROW: {
      const { row: selectedCellRow } = state.selectedCell;
      const location: InsertRowLocation = action.payload;

      const data = Object.keys(activeSheetContentData).reduceRight(
        (sheetContentData: SheetContentData, cellId: CellId) => {
          const cell = new Cell(cellId);
          const isGreater: boolean =
            location === "above"
              ? cell.row >= selectedCellRow
              : cell.row > selectedCellRow;
          if (isGreater) {
            const newCell = cell.getOffset(0, 1, false);
            const cellData = CellData.getOrNew(
              activeSheetContentData,
              cellId
            ).setId(newCell.id);
            return {
              ...sheetContentData,
              [cellId]: new CellData({ id: cellId }),
              [newCell.id]: cellData,
            } as SheetContentData;
          }
          return sheetContentData;
        },
        activeSheetContentData
      );

      return {
        ...state,
        sheets: {
          ...state.sheets,
          [state.activeSheet]: {
            ...activeSheet,
            content: {
              ...activeSheetContent,
              data,
            } as SheetContent,
          },
        },
      };
    }

    case SheetAction.INSERT_COLUMN: {
      const { columnCharCode: selectedCellColumnCharCode } = state.selectedCell;
      const location: InsertColumnLocation = action.payload;

      const data = Object.keys(activeSheetContentData).reduceRight(
        (sheetContentData: SheetContentData, cellId: CellId) => {
          const cell = new Cell(cellId);
          const isGreater: boolean =
            location === "left"
              ? cell.columnCharCode >= selectedCellColumnCharCode
              : cell.columnCharCode > selectedCellColumnCharCode;
          if (isGreater) {
            const newCell = cell.getOffset(1, 0, false);
            const cellData = CellData.getOrNew(
              activeSheetContentData,
              cellId
            ).setId(newCell.id);
            return {
              ...sheetContentData,
              [cellId]: new CellData({ id: cellId }),
              [newCell.id]: cellData,
            } as SheetContentData;
          }
          return sheetContentData;
        },
        activeSheetContentData
      );

      return {
        ...state,
        sheets: {
          ...state.sheets,
          [state.activeSheet]: {
            ...activeSheet,
            content: {
              ...activeSheetContent,
              data,
            } as SheetContent,
          },
        },
      };
    }

    case SheetAction.DELETE_ROW: {
      const { row: selectedCellRow } = state.selectedCell;

      const data = Object.keys(activeSheetContentData)
        .sort(cellSorter)
        .reduceRight((sheetContentData: SheetContentData, cellId: CellId) => {
          const cell = new Cell(cellId);
          const isEqual: boolean = cell.row === selectedCellRow;
          const isGreater: boolean = cell.row > selectedCellRow;
          if (isEqual) {
            return {
              ...sheetContentData,
              [cellId]: new CellData({ id: cellId }),
            } as SheetContentData;
          } else if (isGreater) {
            const newCell = cell.getOffset(0, -1);
            const cellData = CellData.getOrNew(
              activeSheetContentData,
              cellId
            ).setId(newCell.id);
            return {
              ...sheetContentData,
              [cellId]: new CellData({ id: cellId }),
              [newCell.id]: cellData,
            } as SheetContentData;
          }
          return sheetContentData;
        }, activeSheetContentData);

      return {
        ...state,
        sheets: {
          ...state.sheets,
          [state.activeSheet]: {
            ...activeSheet,
            content: {
              ...activeSheetContent,
              data,
            } as SheetContent,
          },
        },
      };
    }

    case SheetAction.DELETE_COLUMN: {
      const { columnCharCode: selectedCellColumnCharCode } = state.selectedCell;

      const data = Object.keys(activeSheetContentData).reduce(
        (sheetContentData: SheetContentData, cellId: CellId) => {
          const cell = new Cell(cellId);
          const isGreater: boolean =
            cell.columnCharCode > selectedCellColumnCharCode;
          if (isGreater) {
            const newCell = cell.getOffset(-1, 0);
            const cellData = CellData.getOrNew(
              activeSheetContentData,
              cellId
            ).setId(newCell.id);

            return {
              ...sheetContentData,
              [cellId]: new CellData({ id: cellId }),
              [newCell.id]: cellData,
            } as SheetContentData;
          }
          return sheetContentData;
        },
        activeSheetContentData
      );

      return {
        ...state,
        sheets: {
          ...state.sheets,
          [state.activeSheet]: {
            ...activeSheet,
            content: {
              ...activeSheetContent,
              data,
            } as SheetContent,
          },
        },
      };
    }

    case SheetAction.SELECT_ALL: {
      const range = CellRange.createFlat(
        `A1`,
        `${SheetConfig.COLUMNS[state.maxColumns - 1]}${state.maxRows}`
      );
      return {
        ...state,
        highlighted: state.highlighted
          .setCells(setOf<CellId>(range.cellIds.flat()), activeSheetContentData)
          .setRows(setOf<RowId>(range.rows))
          .setColumns(setOf<ColumnId>(range.columns)),
      };
    }

    case SheetAction.RESET_HIGHLIGHT: {
      return {
        ...state,
        highlighted: new Highlight(),
      };
    }

    case SheetAction.SET_MOUSEDOWN: {
      return {
        ...state,
        mouseDown: action.payload,
      };
    }

    case SheetAction.SET_DRAGGING: {
      return {
        ...state,
        dragging: action.payload,
      };
    }

    case SheetAction.SET_FILLER_MODE: {
      return {
        ...state,
        fillerMode: action.payload,
      };
    }

    case SheetAction.RECALCULATE_FORMULAE: {
      console.log("Recalculation triggered");

      const formulaCells = Object.values(activeSheetContentData).filter(
        (cellData: CellData) => cellData.isFormulaCell
      );

      const data = formulaCells.reduce(
        (activeSheetContentData: SheetContentData, cellData: CellData) => ({
          ...activeSheetContentData,
          [cellData.id]: new CellData({ ...cellData }).evaluate(
            activeSheetContentData
          ),
        }),
        activeSheetContentData
      );

      const formulaTrackedCells: SetExtended<CellId> = formulaCells.reduce(
        (cellIds: SetExtended<CellId>, cellData: CellData) =>
          cellIds.mergeWith(cellData.referenceCells),
        setOf<CellId>()
      );

      return {
        ...state,
        formulaTrackedCells,
        sheets: {
          ...state.sheets,
          [state.activeSheet]: {
            ...activeSheet,
            content: {
              ...activeSheetContent,
              data,
            } as SheetContent,
          },
        },
      };
    }

    case SheetAction.AUTO_CALCULATE: {
      const { rows, columns, hasLength } = state.highlighted;
      const type = action.payload;
      const value = state.highlighted[type.toLowerCase() as AutoCalculate];

      const lastNotEmpty: Cell = state.highlighted.lastNotEmpty(
        activeSheetContentData
      );

      if (hasLength && lastNotEmpty) {
        const offset: Cell =
          rows.length > columns.length
            ? lastNotEmpty.getOffset(0, 1)
            : lastNotEmpty.getOffset(1, 0);

        const cellData = CellData.getOrNew(activeSheetContentData, offset.id);

        return {
          ...state,
          highlighted: state.highlighted.addCellAndRecalculate(
            offset.id,
            activeSheetContentData
          ),
          sheets: {
            ...state.sheets,
            [state.activeSheet]: {
              ...activeSheet,
              content: {
                ...activeSheetContent,
                data: {
                  ...activeSheetContentData,
                  [offset.id]: cellData.setValue(String(value)),
                },
              } as SheetContent,
            },
          },
        };
      }
      return state;
    }

    case SheetAction.SET_CELL_CONTENT: {
      const { value, cell: cellId } = action.payload;

      const formula = value.toUpperCase();
      const formulaMode = isFormula(formula);
      const formulaTrackedCells = getFormulaTrackedCells(
        formula,
        state.formulaTrackedCells
      );

      const cellData = CellData.getOrNew(
        activeSheetContentData,
        cellId
      ).setValue(value);

      return {
        ...state,
        formulaTrackedCells,
        formulaMode,
        sheets: {
          ...state.sheets,
          [state.activeSheet]: {
            ...activeSheet,
            content: {
              ...activeSheetContent,
              data: {
                ...activeSheetContentData,
                [cellId]: cellData,
              },
            } as SheetContent,
          },
        },
      };
    }

    case SheetAction.UPDATE_REFERENCE_CELLS: {
      const { values } = action.payload;
      const cellIds =
        values.length > 1
          ? CellRange.createFlat(values[0], values[1]).cellIds
          : values;

      const referenceCells = action.payload.replace
        ? setOf<CellId>(cellIds)
        : setOf<CellId>(
            [
              ...activeSheetContentData[action.payload.cell].referenceCells,
              ...cellIds,
            ].flat()
          );

      const cellData = CellData.getOrNew(
        activeSheetContentData,
        action.payload.cell
      );

      return {
        ...state,
        sheets: {
          ...state.sheets,
          [state.activeSheet]: {
            ...activeSheet,
            content: {
              ...activeSheetContent,
              data: {
                ...activeSheetContentData,
                [action.payload.cell]:
                  cellData.setReferenceCells(referenceCells),
              },
            } as SheetContent,
          },
        },
      };
    }

    case SheetAction.SET_CONTENT_BULK:
      const data = Object.keys(action.payload.data).reduce((acc, cur) => {
        return {
          ...acc,
          [cur]: new CellData(acc[cur]),
        };
      }, action.payload.data);

      return {
        ...state,
        sheets: {
          ...state.sheets,
          [state.activeSheet]: {
            ...activeSheet,
            content: {
              ...action.payload,
              data,
            },
          },
        },
      };

    case SheetAction.SET_CELL_FORMATTING: {
      const cellData = CellData.getOrNew(
        activeSheetContentData,
        selectedCellId
      );

      return {
        ...state,
        sheets: {
          ...state.sheets,
          [state.activeSheet]: {
            ...activeSheet,
            content: {
              ...activeSheetContent,
              data: {
                ...activeSheetContentData,
                [selectedCellId]: cellData.setFormatting(action.payload),
              },
            } as SheetContent,
          },
        },
      };
    }

    case SheetAction.SET_CELL_FORMATTING_BULK: {
      const formattedData = highlightedCells
        .toArray()
        .reduce(
          (
            sheetContentData: SheetContentData,
            cellId: CellId
          ): SheetContentData => {
            const cellData = CellData.getOrNew(activeSheetContentData, cellId);
            return {
              ...sheetContentData,
              [cellId]: cellData.setFormatting(action.payload),
            } as SheetContentData;
          },
          activeSheetContentData
        );
      return {
        ...state,
        sheets: {
          ...state.sheets,
          [state.activeSheet]: {
            ...activeSheet,
            content: {
              ...activeSheetContent,
              data: formattedData,
            } as SheetContent,
          },
        },
      };
    }

    case SheetAction.SET_CELL_BORDER_FORMATTING: {
      const cellData = CellData.getOrNew(
        activeSheetContentData,
        selectedCellId
      );

      return {
        ...state,
        sheets: {
          ...state.sheets,
          [state.activeSheet]: {
            ...activeSheet,
            content: {
              ...activeSheetContent,
              data: {
                ...activeSheetContentData,
                [selectedCellId]: cellData
                  .clearBorderFormatting()
                  .setFormatting(action.payload),
              },
            } as SheetContent,
          },
        },
      };
    }

    case SheetAction.SET_CELL_BORDER_FORMATTING_BULK: {
      const formattedData = highlightedCells
        .toArray()
        .reduce((sheetContentData: SheetContentData, cellId: CellId) => {
          const cellData = CellData.getOrNew(activeSheetContentData, cellId);
          return {
            ...sheetContentData,
            [cellId]: cellData
              .clearBorderFormatting()
              .setFormatting(action.payload),
          } as SheetContentData;
        }, activeSheetContentData);

      return {
        ...state,
        sheets: {
          ...state.sheets,
          [state.activeSheet]: {
            ...activeSheet,
            content: {
              ...activeSheetContent,
              data: formattedData,
            } as SheetContent,
          },
        },
      };
    }

    case SheetAction.SET_CELL_OUTSIDE_BORDER_FORMATTING: {
      const { first, last } = state.highlighted;

      let range = CellRange.createHorizontalSliced(first, last).cellIds;

      if (!range.length) {
        if (Cell.isValidId(selectedCellId)) {
          range = [[selectedCellId]];
        } else {
          return state;
        }
      }

      const applyBorder = (
        data: SheetContentData,
        cells: CellId[],
        border: BorderType
      ) => {
        return cells.reduce(
          (
            sheetContentData: SheetContentData,
            cellId: CellId
          ): SheetContentData => {
            const cellData = CellData.getOrNew(sheetContentData, cellId);
            return {
              ...sheetContentData,
              [cellId]: cellData.addBorderFormatting(action.payload, border),
            } as SheetContentData;
          },
          data
        );
      };

      const data = [
        { cells: range[0], border: BorderType.BORDER_TOP },
        { cells: range[range.length - 1], border: BorderType.BORDER_BOTTOM },
        { cells: range.map((row) => row[0]), border: BorderType.BORDER_LEFT },
        {
          cells: range.map((row) => row[row.length - 1]),
          border: BorderType.BORDER_RIGHT,
        },
      ].reduce(
        (data, { cells, border }) =>
          applyBorder(data, cells as CellId[], border),
        activeSheetContentData
      );

      return {
        ...state,
        sheets: {
          ...state.sheets,
          [state.activeSheet]: {
            ...activeSheet,
            content: {
              ...activeSheetContent,
              data,
            } as SheetContent,
          },
        },
      };
    }

    case SheetAction.CLEAR_CELL_FORMATTING: {
      if (state.highlighted.hasLength) {
        const data = highlightedCells
          .toArray()
          .reduce((sheetContentData: SheetContentData, cellId: CellId) => {
            const cellData = activeSheetContentData[cellId];
            if (cellData) {
              return {
                ...sheetContentData,
                [cellId]: cellData.clearFormatting(),
              } as SheetContentData;
            }
            return sheetContentData;
          }, activeSheetContentData);

        return {
          ...state,
          sheets: {
            ...state.sheets,
            [state.activeSheet]: {
              ...activeSheet,
              content: {
                ...activeSheetContent,
                data,
              } as SheetContent,
            },
          },
        };
      } else {
        const selectedCellData = CellData.getOrNew(
          activeSheetContentData,
          selectedCellId
        );
        return {
          ...state,
          sheets: {
            ...state.sheets,
            [state.activeSheet]: {
              ...activeSheet,
              content: {
                ...activeSheetContent,
                data: {
                  ...activeSheetContentData,
                  [selectedCellId]: selectedCellData.clearFormatting(),
                },
              } as SheetContent,
            },
          },
        };
      }
    }

    case SheetAction.SAVE_INITIAL_STATE: {
      return {
        ...state,
        sheets: {
          ...state.sheets,
          [state.activeSheet]: {
            ...activeSheet,
            initialContent: Object.freeze(cloneDeep(activeSheetContent)),
          },
        },
      };
    }

    case SheetAction.ADD_MEMENTO: {
      const delta = SheetContent.findDelta(
        activeSheet.initialContent,
        activeSheetContent
      );
      if (Object.keys(delta).length === 0) {
        return state;
      }

      const id = uniqueId("memento-");
      let memento = [
        ...state.memento.slice(
          0,
          state.memento.findIndex(
            (memento: Memento) => memento.id === state.currentMementoId
          ) + 1
        ),
        { id, delta },
      ];

      if (memento.length > state.maxUndos) {
        memento = memento.slice(1);
      }

      return {
        ...state,
        memento,
        currentMementoId: id,
      };
    }

    case SheetAction.UNDO_STATE: {
      const currentIndex = state.memento.findIndex(
        (memento: Memento) => memento.id === state.currentMementoId
      );

      if (currentIndex <= 0) return state;
      const previousMemento = state.memento[currentIndex - 1];

      let data = { ...activeSheet.initialContent.data };

      if (previousMemento.delta.data) {
        for (const cellId in previousMemento.delta.data) {
          data[cellId] = new CellData({
            ...previousMemento.delta.data[cellId],
            ...(data[cellId] || {}),
          }).setId(cellId);
        }
      }

      return {
        ...state,
        sheets: {
          ...state.sheets,
          [state.activeSheet]: {
            ...activeSheet,
            content: {
              ...activeSheetContent,
              ...previousMemento.delta,
              rowHeights: {
                ...activeSheetContent.rowHeights,
                ...previousMemento.delta.rowHeights,
              },
              columnWidths: {
                ...activeSheetContent.columnWidths,
                ...previousMemento.delta.columnWidths,
              },
              namedRanges: {
                ...activeSheetContent.namedRanges,
                ...previousMemento.delta.namedRanges,
              },
              data,
            } as SheetContent,
          },
        },
        currentMementoId: previousMemento.id,
      };
    }

    case SheetAction.REDO_STATE: {
      const currentIndex = state.memento.findIndex(
        (memento: Memento) => memento.id === state.currentMementoId
      );

      if (currentIndex === -1 || currentIndex >= state.memento.length - 1)
        return state;
      const nextMemento = state.memento[currentIndex + 1];

      let data = { ...activeSheet.initialContent.data };

      if (nextMemento.delta.data) {
        for (const cellId in nextMemento.delta.data) {
          data[cellId] = new CellData({
            ...nextMemento.delta.data[cellId],
            ...(data[cellId] || {}),
          }).setId(cellId);
        }
      }

      return {
        ...state,
        sheets: {
          ...state.sheets,
          [state.activeSheet]: {
            ...activeSheet,
            content: {
              ...activeSheetContent,
              ...nextMemento.delta,
              rowHeights: {
                ...activeSheetContent.rowHeights,
                ...nextMemento.delta.rowHeights,
              },
              columnWidths: {
                ...activeSheetContent.columnWidths,
                ...nextMemento.delta.columnWidths,
              },
              namedRanges: {
                ...activeSheetContent.namedRanges,
                ...nextMemento.delta.namedRanges,
              },
              data,
            } as SheetContent,
          },
        },
        currentMementoId: nextMemento.id,
      };
    }

    case SheetAction.RESET_STATE:
      return initialState;
    default:
      return state as never;
  }
  return state as never;
};
