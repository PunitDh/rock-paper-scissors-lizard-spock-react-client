import { FILE_TYPE, SheetConfig } from "./constants";
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
  InsertColumnLocation,
  InsertRowLocation,
  Memento,
  State,
} from "./types";
import StateContentData from "./models/StateContentData";
import { isInstance } from "../../../../utils";
import StateContent from "./models/StateContent";
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
      content: new StateContent(),
      initialContent: new StateContent(),
      protected: false,
    },
  },
  formulaTrackedCells: setOf<string>(),
  formulaHighlighted: setOf<string>(),
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
  const activeSheet = state.sheets[state.activeSheet];
  // action.type !== SheetAction.SET_HOVERED && console.log(action);
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

    case SheetAction.SET_INPUT_REF:
      return {
        ...state,
        inputRef: action.payload,
      };

    case SheetAction.SET_FILLER_REF:
      return {
        ...state,
        fillerRef: action.payload,
      };

    case SheetAction.SET_FORMULA_FIELD_REF:
      return {
        ...state,
        formulaFieldRef: action.payload,
      };

    case SheetAction.ADD_NAMED_RANGE:
      return {
        ...state,
        sheets: {
          ...state.sheets,
          [state.activeSheet]: {
            ...activeSheet,
            content: {
              ...activeSheet.content,
              namedRanges: {
                ...activeSheet.content.namedRanges,
                [action.payload]: state.highlighted.hasLength
                  ? state.highlighted.cells
                  : [state.selectedCell.id],
              },
            } as StateContent,
          },
        },
      };

    case SheetAction.SET_FORMULA_FIELD_TEXT:
      return {
        ...state,
        formulaFieldText: action.payload,
      };

    case SheetAction.SET_FORMULA_FIELD_FOCUSED:
      return {
        ...state,
        isFormulaFieldFocused: action.payload,
      };

    case SheetAction.RESET_FORMULA_FIELD:
      return {
        ...state,
        formulaFieldText: "",
        isFormulaFieldFocused: false,
        formulaMode: false,
      };

    case SheetAction.SET_FORMULA_MODE:
      return {
        ...state,
        formulaMode: action.payload,
      };

    case SheetAction.SET_HOVERED: {
      if (Cell.isValidId(action.payload))
        return {
          ...state,
          hovered: action.payload,
        };
      return state;
    }

    case SheetAction.SET_HIGHLIGHT_CELL_ANCHOR:
      return {
        ...state,
        highlighted: state.highlighted.setCellAnchor(action.payload),
      };

    case SheetAction.SET_HIGHLIGHT_ROW_ANCHOR:
      return {
        ...state,
        highlighted: state.highlighted
          .setRowAnchor(action.payload)
          .setCellAnchor(null),
      };

    case SheetAction.SET_HIGHLIGHT_COLUMN_ANCHOR:
      return {
        ...state,
        highlighted: state.highlighted
          .setColumnAnchor(action.payload)
          .setCellAnchor(null),
      };

    case SheetAction.HIGHLIGHT_CELLS: {
      const range = CellRange.createFlat(
        action.payload.start,
        action.payload.end
      );

      return {
        ...state,
        highlighted: state.highlighted
          .setCells(setOf(range.cellIds.flat()), activeSheet.content.data)
          .setRows(setOf(range.rows))
          .setColumns(setOf(range.columns))
          .setRangeStart(action.payload.start)
          .setRangeEnd(action.payload.end),
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
        content: new StateContent(),
        initialContent: new StateContent(),
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
      const sheets = {};

      sheetIds
        .filter((sheetId) => sheetId !== action.payload)
        .forEach((sheetId) => {
          sheets[sheetId] = state.sheets[sheetId];
        });

      return {
        ...state,
        sheets: reIndexSheets(sheets),
        activeSheet: sheetIds[index - 1],
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
        formulaHighlighted: toList(range.cellIds).toSetExtended(),
      };
    }

    case SheetAction.ADD_CELLS_TO_HIGHLIGHT: {
      const rows = setOf<number>();
      const columns = setOf<string>();
      const cells = setOf<string>(state.highlighted.cells);

      action.payload.cellIds.forEach((id: string) => {
        const cell = new Cell(id);
        cells.add(cell.id);
        rows.add(cell.row);
        columns.add(cell.column);
      });

      return {
        ...state,
        highlighted: state.highlighted
          .setCells(cells, activeSheet.content.data)
          .setRows(state.highlighted.rows.mergeWith(rows))
          .setColumns(state.highlighted.columns.mergeWith(columns))
          .setMultiSelect(action.payload.multiSelect),
      };
    }

    case SheetAction.REMOVE_CELLS_FROM_HIGHLIGHT: {
      const rowsToRemove = setOf<number>();
      const columnsToRemove = setOf<string>();
      const updatedCells = setOf<string>(state.highlighted.cells);
      action.payload.forEach((cellId: string) => {
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
              .some((cellId: string) => new Cell(cellId).row === row);
          }
          return true;
        });

      const newHighlightedColumns: SetExtended<string> =
        state.highlighted.columns.filter((column: string) => {
          if (columnsToRemove.has(column)) {
            // Check if there are other highlighted cells in this column
            return !updatedCells
              .toArray()
              .some(
                (cellId: string): boolean =>
                  (new Cell(cellId).column === column) as boolean
              );
          }
          return true;
        });

      return {
        ...state,
        highlighted: state.highlighted
          .setCells(updatedCells, activeSheet.content.data)
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
                ...activeSheet.content,
                data: {
                  ...activeSheet.content.data,
                  [action.payload]: new CellData({ id: action.payload }),
                } as StateContentData,
              } as StateContent,
            },
          },
        };
      }

      const data = Object.keys(activeSheet.content.data)
        .filter((cell) => state.highlighted.includes(cell))
        .reduce((stateContentData, cell) => {
          return {
            ...stateContentData,
            [cell]: new CellData({ id: cell }),
          } as StateContentData;
        }, activeSheet.content.data);

      return {
        ...state,
        sheets: {
          ...state.sheets,
          [state.activeSheet]: {
            ...activeSheet,
            content: {
              ...activeSheet.content,
              data,
            } as StateContent,
          },
        },
      };
    }

    case SheetAction.PASTE_CELL_CONTENT: {
      const { data, anchor } = action.payload;
      try {
        const parsed = JSON.parse(data);
        if (parsed.type === FILE_TYPE) {
          const cellOffset = new Cell(anchor).getOffset(
            parsed.content[0].length - 1,
            parsed.content.length - 1,
            false
          );
          const range = CellRange.createHorizontalSliced(anchor, cellOffset.id);
          const updateObj: { [key: string]: CellData } = {};
          (range.cells as Cell[][]).forEach((row: Cell[], rowIndex: number) =>
            row.forEach((cell: Cell, cellIndex: number) => {
              updateObj[cell.id] = new CellData({
                id: cell.id,
                ...parsed.content[rowIndex][cellIndex],
              });
            })
          );
          const data = Object.keys(updateObj).reduce(
            (stateContentData: StateContentData, cell: string) => {
              return {
                ...stateContentData,
                [cell]: updateObj[cell],
              } as StateContentData;
            },
            activeSheet.content.data
          );
          return {
            ...state,
            sheets: {
              ...state.sheets,
              [state.activeSheet]: {
                ...activeSheet,
                content: {
                  ...activeSheet.content,
                  data,
                } as StateContent,
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
                ...activeSheet.content,
                data: {
                  ...activeSheet.content.data,
                  [action.payload.anchor.id]: {
                    value,
                  },
                } as StateContentData,
              } as StateContent,
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
          .setCells(setOf(range.cellIds.flat()), activeSheet.content.data)
          .setRows(setOf(range.rows))
          .setColumns(setOf(range.columns)),
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
              ...activeSheet.content,
              rowHeights: {
                ...activeSheet.content.rowHeights,
                [action.payload.row]: action.payload.height,
              },
            } as StateContent,
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
          .setCells(setOf(range.cellIds.flat()), activeSheet.content.data)
          .setRows(setOf(range.rows))
          .setColumns(setOf(range.columns)),
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
              ...activeSheet.content,
              columnWidths: {
                ...activeSheet.content.columnWidths,
                [action.payload.column]: action.payload.width,
              },
            } as StateContent,
          },
        },
      };
    }

    case SheetAction.INSERT_ROW: {
      const { row: selectedCellRow } = state.selectedCell;
      const location: InsertRowLocation = action.payload;

      const data = Object.keys(activeSheet.content.data).reduceRight(
        (stateContentData: StateContentData, cellId: string) => {
          const cell = new Cell(cellId);
          const isGreater: boolean =
            location === "above"
              ? cell.row >= selectedCellRow
              : cell.row > selectedCellRow;
          if (isGreater) {
            const newCell = cell.getOffset(0, 1, false);
            const cellData = CellData.getOrNew(
              activeSheet.content.data,
              cellId
            ).setId(newCell.id);
            return {
              ...stateContentData,
              [cellId]: new CellData({ id: cellId }),
              [newCell.id]: cellData,
            } as StateContentData;
          }
          return stateContentData;
        },
        activeSheet.content.data
      );

      return {
        ...state,
        sheets: {
          ...state.sheets,
          [state.activeSheet]: {
            ...activeSheet,
            content: {
              ...activeSheet.content,
              data,
            } as StateContent,
          },
        },
      };
    }

    case SheetAction.INSERT_COLUMN: {
      const { columnCharCode: selectedCellColumnCharCode } = state.selectedCell;
      const location: InsertColumnLocation = action.payload;

      const data = Object.keys(activeSheet.content.data).reduceRight(
        (stateContentData: StateContentData, cellId: string) => {
          const cell = new Cell(cellId);
          const isGreater: boolean =
            location === "left"
              ? cell.columnCharCode >= selectedCellColumnCharCode
              : cell.columnCharCode > selectedCellColumnCharCode;
          if (isGreater) {
            const newCell = cell.getOffset(1, 0, false);
            const cellData = CellData.getOrNew(
              activeSheet.content.data,
              cellId
            ).setId(newCell.id);
            return {
              ...stateContentData,
              [cellId]: new CellData({ id: cellId }),
              [newCell.id]: cellData,
            } as StateContentData;
          }
          return stateContentData;
        },
        activeSheet.content.data
      );

      return {
        ...state,
        sheets: {
          ...state.sheets,
          [state.activeSheet]: {
            ...activeSheet,
            content: {
              ...activeSheet.content,
              data,
            } as StateContent,
          },
        },
      };
    }

    case SheetAction.DELETE_ROW: {
      const { row: selectedCellRow } = state.selectedCell;

      const data = Object.keys(activeSheet.content.data)
        .sort(cellSorter)
        .reduceRight((stateContentData: StateContentData, cellId: string) => {
          const cell = new Cell(cellId);
          const isEqual: boolean = cell.row === selectedCellRow;
          const isGreater: boolean = cell.row > selectedCellRow;
          if (isEqual) {
            return {
              ...stateContentData,
              [cellId]: new CellData({ id: cellId }),
            } as StateContentData;
          } else if (isGreater) {
            const newCell = cell.getOffset(0, -1);
            const cellData = CellData.getOrNew(
              activeSheet.content.data,
              cellId
            ).setId(newCell.id);
            return {
              ...stateContentData,
              [cellId]: new CellData({ id: cellId }),
              [newCell.id]: cellData,
            } as StateContentData;
          }
          return stateContentData;
        }, activeSheet.content.data);

      return {
        ...state,
        sheets: {
          ...state.sheets,
          [state.activeSheet]: {
            ...activeSheet,
            content: {
              ...activeSheet.content,
              data,
            } as StateContent,
          },
        },
      };
    }

    case SheetAction.DELETE_COLUMN: {
      const { columnCharCode: selectedCellColumnCharCode } = state.selectedCell;

      const data = Object.keys(activeSheet.content.data).reduce(
        (stateContentData: StateContentData, cellId: string) => {
          const cell = new Cell(cellId);
          const isGreater: boolean =
            cell.columnCharCode > selectedCellColumnCharCode;
          if (isGreater) {
            const newCell = cell.getOffset(-1, 0);
            const cellData = CellData.getOrNew(
              activeSheet.content.data,
              cellId
            ).setId(newCell.id);

            return {
              ...stateContentData,
              [cellId]: new CellData({ id: cellId }),
              [newCell.id]: cellData,
            } as StateContentData;
          }
          return stateContentData;
        },
        activeSheet.content.data
      );

      return {
        ...state,
        sheets: {
          ...state.sheets,
          [state.activeSheet]: {
            ...activeSheet,
            content: {
              ...activeSheet.content,
              data,
            } as StateContent,
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
          .setCells(setOf(range.cellIds.flat()), activeSheet.content.data)
          .setRows(setOf(range.rows))
          .setColumns(setOf(range.columns)),
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
      const formulaTrackedCells: SetExtended<string> = Object.values(
        activeSheet.content.data
      )
        .filter((cellData) => (cellData as CellData).isFormulaCell)
        .map((cellData) =>
          (cellData as CellData).evaluate(activeSheet.content.data)
        )
        .reduce((acc: SetExtended<string>, cur: CellData) => {
          return acc.mergeWith(cur.referenceCells);
        }, setOf<string>());

      return {
        ...state,
        formulaTrackedCells,
      };
    }

    case SheetAction.AUTO_CALCULATE: {
      const { rows, columns, last, hasLength } = state.highlighted;
      const type = action.payload;

      const value = state.highlighted[type.toLowerCase() as AutoCalculate];

      if (hasLength && last) {
        const offset: Cell =
          rows.length > columns.length
            ? new Cell(last).getOffset(0, 1)
            : new Cell(last).getOffset(1, 0);

        const cellData = CellData.getOrNew(activeSheet.content.data, offset.id);

        return {
          ...state,
          highlighted: state.highlighted.addCellAndRecalculate(
            offset.id,
            activeSheet.content.data
          ),
          sheets: {
            ...state.sheets,
            [state.activeSheet]: {
              ...activeSheet,
              content: {
                ...activeSheet.content,
                data: {
                  ...activeSheet.content.data,
                  [offset.id]: cellData.setValue(String(value)),
                },
              } as StateContent,
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
        activeSheet.content.data,
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
              ...activeSheet.content,
              data: {
                ...activeSheet.content.data,
                [cellId]: cellData,
              },
            } as StateContent,
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
        ? setOf<string>(cellIds)
        : setOf<string>(
            [
              ...activeSheet.content.data[action.payload.cell].referenceCells,
              ...cellIds,
            ].flat()
          );

      const cellData = CellData.getOrNew(
        activeSheet.content.data,
        action.payload.cell
      );

      return {
        ...state,
        sheets: {
          ...state.sheets,
          [state.activeSheet]: {
            ...activeSheet,
            content: {
              ...activeSheet.content,
              data: {
                ...activeSheet.content.data,
                [action.payload.cell]:
                  cellData.setReferenceCells(referenceCells),
              },
            } as StateContent,
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
        activeSheet.content.data,
        state.selectedCell.id
      );

      return {
        ...state,
        sheets: {
          ...state.sheets,
          [state.activeSheet]: {
            ...activeSheet,
            content: {
              ...activeSheet.content,
              data: {
                ...activeSheet.content.data,
                [state.selectedCell.id]: cellData.setFormatting(action.payload),
              },
            } as StateContent,
          },
        },
      };
    }

    case SheetAction.SET_CELL_FORMATTING_BULK: {
      const formattedData = state.highlighted.cells
        .toArray()
        .reduce(
          (
            stateContentData: StateContentData,
            cellId: string
          ): StateContentData => {
            const cellData = CellData.getOrNew(
              activeSheet.content.data,
              cellId
            );
            return {
              ...stateContentData,
              [cellId]: cellData.setFormatting(action.payload),
            } as StateContentData;
          },
          activeSheet.content.data
        );
      return {
        ...state,
        sheets: {
          ...state.sheets,
          [state.activeSheet]: {
            ...activeSheet,
            content: {
              ...activeSheet.content,
              data: formattedData,
            } as StateContent,
          },
        },
      };
    }

    case SheetAction.SET_CELL_BORDER_FORMATTING: {
      const cellData = CellData.getOrNew(
        activeSheet.content.data,
        state.selectedCell.id
      );

      return {
        ...state,
        sheets: {
          ...state.sheets,
          [state.activeSheet]: {
            ...activeSheet,
            content: {
              ...activeSheet.content,
              data: {
                ...activeSheet.content.data,
                [state.selectedCell.id]: cellData
                  .clearBorderFormatting()
                  .setFormatting(action.payload),
              },
            } as StateContent,
          },
        },
      };
    }

    case SheetAction.SET_CELL_BORDER_FORMATTING_BULK: {
      const formattedData = state.highlighted.cells
        .toArray()
        .reduce((stateContentData: StateContentData, cellId: string) => {
          const cellData = CellData.getOrNew(activeSheet.content.data, cellId);
          return {
            ...stateContentData,
            [cellId]: cellData
              .clearBorderFormatting()
              .setFormatting(action.payload),
          } as StateContentData;
        }, activeSheet.content.data);

      return {
        ...state,
        sheets: {
          ...state.sheets,
          [state.activeSheet]: {
            ...activeSheet,
            content: {
              ...activeSheet.content,
              data: formattedData,
            } as StateContent,
          },
        },
      };
    }

    case SheetAction.SET_CELL_OUTSIDE_BORDER_FORMATTING: {
      const { first, last } = state.highlighted;

      let range = CellRange.createHorizontalSliced(first, last).cellIds;

      if (!range.length) {
        if (Cell.isValidId(state.selectedCell.id)) {
          range = [[state.selectedCell.id]];
        } else {
          return state;
        }
      }

      const applyBorder = (
        data: StateContentData,
        cells: string[],
        border: BorderType
      ) => {
        return cells.reduce(
          (
            stateContentData: StateContentData,
            cellId: string
          ): StateContentData => {
            const cellData = CellData.getOrNew(stateContentData, cellId);
            return {
              ...stateContentData,
              [cellId]: cellData.addBorderFormatting(action.payload, border),
            } as StateContentData;
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
          applyBorder(data, cells as string[], border),
        activeSheet.content.data
      );

      return {
        ...state,
        sheets: {
          ...state.sheets,
          [state.activeSheet]: {
            ...activeSheet,
            content: {
              ...activeSheet.content,
              data,
            } as StateContent,
          },
        },
      };
    }

    case SheetAction.CLEAR_CELL_FORMATTING: {
      if (state.highlighted.hasLength) {
        const data = state.highlighted.cells
          .toArray()
          .reduce((stateContentData: StateContentData, cellId: string) => {
            const cellData = activeSheet.content.data[cellId];
            if (cellData) {
              return {
                ...stateContentData,
                [cellId]: cellData.clearFormatting(),
              } as StateContentData;
            }
            return stateContentData;
          }, activeSheet.content.data);

        return {
          ...state,
          sheets: {
            ...state.sheets,
            [state.activeSheet]: {
              ...activeSheet,
              content: {
                ...activeSheet.content,
                data,
              } as StateContent,
            },
          },
        };
      } else {
        const selectedCellData = CellData.getOrNew(
          activeSheet.content.data,
          state.selectedCell.id
        );
        return {
          ...state,
          sheets: {
            ...state.sheets,
            [state.activeSheet]: {
              ...activeSheet,
              content: {
                ...activeSheet.content,
                data: {
                  ...activeSheet.content.data,
                  [state.selectedCell.id]: selectedCellData.clearFormatting(),
                },
              } as StateContent,
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
            initialContent: Object.freeze(cloneDeep(activeSheet.content)),
          },
        },
      };
    }

    case SheetAction.ADD_MEMENTO: {
      const delta = StateContent.findDelta(
        activeSheet.initialContent,
        activeSheet.content
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
              ...activeSheet.content,
              ...previousMemento.delta,
              rowHeights: {
                ...activeSheet.content.rowHeights,
                ...previousMemento.delta.rowHeights,
              },
              columnWidths: {
                ...activeSheet.content.columnWidths,
                ...previousMemento.delta.columnWidths,
              },
              namedRanges: {
                ...activeSheet.content.namedRanges,
                ...previousMemento.delta.namedRanges,
              },
              data,
            } as StateContent,
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
              ...activeSheet.content,
              ...nextMemento.delta,
              rowHeights: {
                ...activeSheet.content.rowHeights,
                ...nextMemento.delta.rowHeights,
              },
              columnWidths: {
                ...activeSheet.content.columnWidths,
                ...nextMemento.delta.columnWidths,
              },
              namedRanges: {
                ...activeSheet.content.namedRanges,
                ...nextMemento.delta.namedRanges,
              },
              data,
            } as StateContent,
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
