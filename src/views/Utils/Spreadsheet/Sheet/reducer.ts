import { FILE_TYPE, SheetConfig } from "./constants";
import { isFormula, typeInInputBox } from "./utils/cellUtils";
import { SheetAction } from "./actions";
import Cell from "./models/Cell";
import CellData, { getFormulaTrackedCells } from "./models/CellData";
import CellRange from "./models/CellRange";
import { isEqual, uniqueId } from "lodash";
import { AutoCalculate, BorderType } from "./components/Toolbar/constants";
import Highlight from "./models/Highlight";
import { Action, Memento, State } from "./types";
import StateContentData from "./models/StateContentData";
import { isInstance } from "../../../../utils";
import StateContent from "./models/StateContent";

export const initialState: State = {
  maxRows: SheetConfig.MAX_ROWS,
  maxColumns: SheetConfig.MAX_COLUMNS,
  inputRef: null,
  fillerRef: null,
  formulaFieldRef: null,
  defaultRowHeight: 24,
  defaultColumnWidth: 50,
  maxUndos: 32,
  selectedCell: new Cell("A1"),
  formulaMode: false,
  hovered: "",
  highlighted: new Highlight(),
  formulaTrackedCells: [],
  formulaHighlighted: [],
  content: new StateContent({}, {}, new StateContentData(), {}),
  mouseDown: false,
  dragging: false,
  fillerMode: false,
  formulaFieldText: "",
  isFormulaFieldFocused: false,
  menuAnchorElement: null,
  memento: [],
  currentMementoId: null,
};

export const reducer = (state: State, action: Action) => {
  // action.type !== SheetAction.SET_HOVERED && console.log(action);

  switch (action.type) {
    case SheetAction.SET_SELECTED: {
      let selectedCell: string | Cell;
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
        content: {
          ...state.content,
          namedRanges: {
            ...state.content.namedRanges,
            [action.payload]: state.highlighted.hasLength
              ? state.highlighted.cells
              : [state.selectedCell.id],
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
          .setCells(range.cellIds.flat(), state.content.data)
          .setRows(range.rows)
          .setColumns(range.columns)
          .setRangeStart(action.payload.start)
          .setRangeEnd(action.payload.end),
      };
    }

    case SheetAction.FORMULA_HIGHLIGHT_CELLS: {
      return {
        ...state,
        formulaHighlighted: action.payload.flat(),
      };
    }

    case SheetAction.FORMULA_HIGHLIGHT_CELL_RANGE: {
      const range = CellRange.createFlat(
        action.payload.start,
        action.payload.end
      );
      return {
        ...state,
        formulaHighlighted: range.cellIds,
      };
    }

    case SheetAction.ADD_CELLS_TO_HIGHLIGHT: {
      const rowsSet = new Set();
      const columnsSet = new Set();
      const cellsSet = new Set(state.highlighted.cells);
      action.payload.forEach((id: string) => {
        const cell = new Cell(id);
        cellsSet.add(cell.id);
        rowsSet.add(cell.row);
        columnsSet.add(cell.column);
      });
      const rows = Array.from(rowsSet) as number[];
      const columns = Array.from(columnsSet) as string[];

      return {
        ...state,
        highlighted: state.highlighted
          .setCells(Array.from(cellsSet), state.content.data)
          .setRows(state.highlighted.rows.concat(rows))
          .setColumns(state.highlighted.columns.concat(columns)),
      };
    }

    case SheetAction.REMOVE_CELLS_FROM_HIGHLIGHT: {
      const rowsToRemove = new Set();
      const columnsToRemove = new Set();
      const updatedCells = new Set(state.highlighted.cells);
      action.payload.forEach((cellId: string) => {
        const cell = new Cell(cellId);
        if (state.highlighted.cells.includes(cellId)) {
          updatedCells.delete(cellId);
          rowsToRemove.add(cell.row);
          columnsToRemove.add(cell.column);
        }
      });

      const newHighlightedCells = Array.from(updatedCells) as string[];

      const newHighlightedRows = state.highlighted.rows.filter(
        (row: number): boolean => {
          if (rowsToRemove.has(row)) {
            return !newHighlightedCells.some(
              (cellId: string) => new Cell(cellId).row === row
            );
          }
          return true;
        }
      );

      const newHighlightedColumns = state.highlighted.columns.filter(
        (column: string) => {
          if (columnsToRemove.has(column)) {
            // Check if there are other highlighted cells in this column
            return !newHighlightedCells.some(
              (cellId: string): boolean =>
                (new Cell(cellId).column === column) as boolean
            );
          }
          return true;
        }
      );

      return {
        ...state,
        highlighted: state.highlighted
          .setCells(newHighlightedCells, state.content.data)
          .setRows(newHighlightedRows)
          .setColumns(newHighlightedColumns),
      };
    }

    case SheetAction.DELETE_CELL_CONTENT: {
      if (action.payload) {
        return {
          ...state,
          content: {
            ...state.content,
            data: {
              ...state.content.data,
              [action.payload]: new CellData({ id: action.payload }),
            },
          },
        };
      }

      const data = Object.keys(state.content.data)
        .filter((cell) => state.highlighted.cells.includes(cell))
        .reduce((stateContentData, cell) => {
          return {
            ...stateContentData,
            [cell]: new CellData({ id: cell }),
          } as StateContentData;
        }, state.content.data);

      return {
        ...state,
        content: {
          ...state.content,
          data,
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
          const range = CellRange.createHorizontalSliced(
            anchor,
            cellOffset!.id
          );
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
            state.content.data
          );
          return {
            ...state,
            content: {
              ...state.content,
              data,
            },
          };
        }
      } catch (e) {
        const value = typeInInputBox(action.payload.data);
        return {
          ...state,
          content: {
            ...state.content,
            data: {
              ...state.content.data,
              [action.payload.anchor.id]: {
                value,
              },
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
        selectedCell: {
          ...state.selectedCell,
          row: Number(action.payload),
        },
        highlighted: state.highlighted
          .setCells(range.cellIds.flat(), state.content.data)
          .setRows(range.rows)
          .setColumns(range.columns),
      };
    }
    case SheetAction.SET_ROW_HEIGHT: {
      return {
        ...state,
        content: {
          ...state.content,
          rowHeights: {
            ...state.content.rowHeights,
            [action.payload.row]: action.payload.height,
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
        selectedCell: {
          ...state.selectedCell,
          column: action.payload,
        },
        highlighted: state.highlighted
          .setCells(range.cellIds.flat(), state.content.data)
          .setRows(range.rows)
          .setColumns(range.columns),
      };
    }
    case SheetAction.SET_COLUMN_WIDTH: {
      return {
        ...state,
        content: {
          ...state.content,
          columnWidths: {
            ...state.content.columnWidths,
            [action.payload.column]: action.payload.width,
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
          .setCells(range.cellIds.flat(), state.content.data)
          .setRows(range.rows)
          .setColumns(range.columns),
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
      const formulaCells: CellData[] = Object.values(state.content.data)
        .filter((cellData) => (cellData as CellData).isFormulaCell)
        .map((cellData) => (cellData as CellData).evaluate(state.content.data));

      const formulaTrackedCells = formulaCells
        .filter((it) => !it.error)
        .map((it) => it.referenceCells)
        .flat();

      return {
        ...state,
        formulaTrackedCells: Array.from(new Set(formulaTrackedCells)),
      };
    }
    case SheetAction.AUTO_CALCULATE: {
      const { rows, columns, last, hasLength } = state.highlighted;
      const type = action.payload;

      const value = state.highlighted[type.toLowerCase() as AutoCalculate];

      if (hasLength && last) {
        const offset: Cell = (
          rows.length > columns.length
            ? new Cell(last).getOffset(0, 1)
            : new Cell(last).getOffset(1, 0)
        )!;

        const cellData = CellData.getOrNew1(state.content.data, offset.id);

        return {
          ...state,
          highlighted: state.highlighted.addCellAndRecalculate(
            offset.id,
            state.content.data
          ),
          content: {
            ...state.content,
            data: {
              ...state.content.data,
              [offset.id]: cellData.setValue(String(value)),
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
        state.content.data[cellId],
        cellId
      ).setValue(value);

      return {
        ...state,
        formulaTrackedCells,
        formulaMode,
        content: {
          ...state.content,
          data: {
            ...state.content.data,
            [cellId]: cellData,
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
        ? Array.from(new Set(cellIds))
        : Array.from(
            new Set(
              [
                ...state.content.data[action.payload.cell].referenceCells,
                ...cellIds,
              ].flat()
            )
          );

      const cellData = CellData.getOrNew(
        state.content.data[action.payload.cell],
        action.payload.cell
      );

      return {
        ...state,
        content: {
          ...state.content,
          data: {
            ...state.content.data,
            [action.payload.cell]: cellData.setReferenceCells(referenceCells),
          },
        },
      };
    }
    case SheetAction.SET_CONTENT_BULK:
      return {
        ...state,
        content: action.payload,
      };
    case SheetAction.SET_CELL_FORMATTING: {
      const cellData = CellData.getOrNew(
        state.content.data[state.selectedCell.id],
        state.selectedCell.id
      );

      return {
        ...state,
        content: {
          ...state.content,
          data: {
            ...state.content.data,
            [state.selectedCell.id]: cellData.setFormatting(action.payload),
          },
        },
      };
    }

    case SheetAction.SET_CELL_FORMATTING_BULK: {
      const formattedData = state.highlighted.cells.reduce(
        (
          stateContentData: StateContentData,
          cellId: string
        ): StateContentData => {
          const cellData = CellData.getOrNew(
            state.content.data[cellId],
            state.selectedCell.id
          );
          return {
            ...stateContentData,
            [cellId]: cellData.setFormatting(action.payload),
          } as StateContentData;
        },
        state.content.data
      );
      return {
        ...state,
        content: {
          ...state.content,
          data: formattedData,
        },
      };
    }

    case SheetAction.SET_CELL_BORDER_FORMATTING: {
      const cellData = CellData.getOrNew(
        state.content.data[state.selectedCell.id],
        state.selectedCell.id
      );

      return {
        ...state,
        content: {
          ...state.content,
          data: {
            ...state.content.data,
            [state.selectedCell.id]: cellData
              .clearBorderFormatting()
              .setFormatting(action.payload),
          },
        },
      };
    }

    case SheetAction.SET_CELL_BORDER_FORMATTING_BULK: {
      const formattedData = state.highlighted.cells.reduce(
        (stateContentData: StateContentData, cellId: string) => {
          const cellData = CellData.getOrNew1(state.content.data, cellId);
          return {
            ...stateContentData,
            [cellId]: cellData
              .clearBorderFormatting()
              .setFormatting(action.payload),
          } as StateContentData;
        },
        state.content.data
      );
      return {
        ...state,
        content: {
          ...state.content,
          data: formattedData,
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
            const cellData = CellData.getOrNew1(stateContentData, cellId);
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
        state.content.data
      );

      return {
        ...state,
        content: {
          ...state.content,
          data,
        },
      };
    }

    case SheetAction.CLEAR_CELL_FORMATTING: {
      if (state.highlighted.hasLength) {
        const data = state.highlighted.cells.reduce(
          (stateContentData: StateContentData, cellId: string) => {
            const cellData = state.content.data[cellId];
            if (cellData) {
              return {
                ...stateContentData,
                [cellId]: cellData.clearFormatting(),
              } as StateContentData;
            }
            return stateContentData;
          },
          state.content.data
        );

        return {
          ...state,
          content: {
            ...state.content,
            data,
          },
        };
      } else {
        const selectedCellData = CellData.getOrNew1(
          state.content.data,
          state.selectedCell.id
        );
        return {
          ...state,
          content: {
            ...state.content,
            data: {
              ...state.content.data,
              [state.selectedCell.id]: selectedCellData.clearFormatting(),
            },
          },
        };
      }
    }

    case SheetAction.ADD_MEMENTO: {
      const currentMemento = state.memento.find(
        (memento: Memento) => memento.id === state.currentMementoId
      );
      if (currentMemento && isEqual(currentMemento.content, state.content)) {
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
        { id, content: state.content },
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

      return {
        ...state,
        content: {
          ...previousMemento.content,
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

      return {
        ...state,
        content: {
          ...nextMemento.content,
        },
        currentMementoId: nextMemento.id,
      };
    }
    case SheetAction.RESET_STATE:
    default:
      return initialState;
  }
};
