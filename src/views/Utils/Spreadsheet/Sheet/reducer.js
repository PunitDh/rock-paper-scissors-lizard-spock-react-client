import { SheetConfig } from "./constants";
import { isFormula, typeInInputBox } from "./utils/cellUtils";
import { SheetAction } from "./actions";
import Cell from "./models/Cell";
import CellData, { getFormulaTrackedCells } from "./models/CellData";
import CellRange from "./models/CellRange";
import { isEqual, uniqueId } from "lodash";

export const initialState = {
  maxRows: SheetConfig.MAX_ROWS,
  maxColumns: SheetConfig.MAX_COLUMNS,
  inputRef: {},
  formulaFieldRef: {},
  defaultRowHeight: 24,
  defaultColumnWidth: 50,
  maxUndos: 32,
  selectedCell: new Cell("A1"), //{ cell: "A1", row: 1, column: "A", columnCharCode: 65 },
  editMode: false,
  formulaMode: false,
  hovered: "",
  highlighted: {
    rowAnchor: null,
    columnAnchor: null,
    cellAnchor: null,
    cells: [],
    rows: [],
    columns: [],
  },
  formulaTrackedCells: [],
  formulaHighlighted: [],
  content: {
    data: {},
    rowHeights: {},
    columnWidths: {},
  },
  mouseDown: false,
  inputBoxFocused: false,
  formulaFieldText: "",
  isFormulaFieldFocused: false,
  menuAnchorElement: null,
  memento: [],
  currentMementoId: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SheetAction.SET_SELECTED:
      return {
        ...state,
        selectedCell:
          typeof action.payload === "object" && action.payload instanceof Cell
            ? action.payload
            : new Cell(action.payload),
      };
    case SheetAction.SET_INPUT_REF:
      return {
        ...state,
        inputRef: action.payload,
      };
    case SheetAction.SET_FORMULA_FIELD_REF:
      return {
        ...state,
        formulaFieldRef: action.payload,
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
    case SheetAction.SET_INPUT_BOX_FOCUSED:
      return {
        ...state,
        inputBoxFocused: action.payload,
      };
    case SheetAction.RESET_FORMULA_FIELD:
      return {
        ...state,
        formulaFieldText: "",
        isFormulaFieldFocused: false,
        formulaMode: false,
      };
    case SheetAction.SET_EDIT_MODE:
      return {
        ...state,
        editMode: action.payload,
      };
    case SheetAction.SET_FORMULA_MODE:
      return {
        ...state,
        formulaMode: action.payload,
      };
    case SheetAction.SET_HOVERED_CELL:
      return {
        ...state,
        hovered: action.payload,
      };
    case SheetAction.SET_HIGHLIGHT_CELL_ANCHOR:
      return {
        ...state,
        highlighted: {
          ...state.highlighted,
          cellAnchor: action.payload,
        },
      };

    case SheetAction.SET_HIGHLIGHT_ROW_ANCHOR:
      return {
        ...state,
        highlighted: {
          ...state.highlighted,
          rowAnchor: action.payload,
          cellAnchor: null,
        },
      };

    case SheetAction.SET_HIGHLIGHT_COLUMN_ANCHOR:
      return {
        ...state,
        highlighted: {
          ...state.highlighted,
          columnAnchor: action.payload,
          cellAnchor: null,
        },
      };

    case SheetAction.HIGHLIGHT_CELLS: {
      const range = CellRange.createFlat(action.start, action.end);
      return {
        ...state,
        highlighted: {
          ...state.highlighted,
          cells: range.cellIds,
          rows: range.rows,
          columns: range.columns,
        },
        editMode: false,
      };
    }

    case SheetAction.FORMULA_HIGHLIGHT_CELLS: {
      return {
        ...state,
        formulaHighlighted: action.payload.flat(),
      };
    }

    case SheetAction.FORMULA_HIGHLIGHT_CELL_RANGE: {
      const range = CellRange.createFlat(action.payload.start, action.payload.end);
      return {
        ...state,
        formulaHighlighted: range.cellIds,
      };
    }

    case SheetAction.ADD_CELLS_TO_HIGHLIGHT: {
      const cells = action.payload.map((id) => new Cell(id));
      const rows = [...new Set(cells.map((it) => it.row))];
      const columns = [...new Set(cells.map((it) => it.column))];
      return {
        ...state,
        highlighted: {
          ...state.highlighted,
          cells: state.highlighted.cells.concat(action.payload),
          rows: state.highlighted.rows.concat(rows),
          columns: state.highlighted.columns.concat(columns),
        },
        editMode: false,
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
              [action.payload]: new CellData().setId(action.payload),
            },
          },
        };
      }

      const data = Object.keys(state.content.data)
        .filter((cell) => state.highlighted.cells.includes(cell))
        .reduce(
          (stateContentData, cell) => ({
            ...stateContentData,
            [cell]: new CellData({ id: cell }),
          }),
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
    case SheetAction.PASTE_CELL_CONTENT: {
      const { data, anchor } = action.payload;
      try {
        const parsed = JSON.parse(data);
        if (parsed.type === "_sheet") {
          const cellOffset = new Cell(anchor).getOffset(
            parsed.content[0].length - 1,
            parsed.content.length - 1
          );
          const range = CellRange.create(anchor, cellOffset.id);
          const updateObj = {};
          range.cells.forEach((row, rowIndex) =>
            row.forEach((cell, cellIndex) => {
              updateObj[cell.id] = new CellData({
                id: cell.id,
                ...parsed.content[rowIndex][cellIndex],
              });
            })
          );
          const data = Object.keys(updateObj).reduce((stateContent, cell) => {
            return {
              ...stateContent,
              [cell]: updateObj[cell],
            };
          }, state.content.data);
          return {
            ...state,
            content: {
              ...state.content,
              data,
            },
          };
        }
      } catch (e) {
        console.log(e);
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
        `${SheetConfig.COLUMNS[state.maxColumns]}${action.payload}`
      );

      return {
        ...state,
        selectedCell: {
          ...state.selectedCell,
          row: Number(action.payload),
        },
        highlighted: {
          ...state.highlighted,
          cells: range.cellIds,
          rows: range.rows,
          columns: range.columns,
        },
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
        highlighted: {
          ...state.highlighted,
          cells: range.cellIds,
          rows: range.rows,
          columns: range.columns,
        },
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
        editMode: false,
        highlighted: {
          ...state.highlighted,
          cells: range.cellIds,
          rows: range.rows,
          columns: range.columns,
        },
      };
    }
    case SheetAction.RESET_HIGHLIGHT: {
      return {
        ...state,
        highlighted: initialState.highlighted,
      };
    }
    case SheetAction.SET_MOUSEDOWN: {
      return {
        ...state,
        mouseDown: action.payload,
      };
    }
    case SheetAction.RECALCULATE_FORMULAE: {
      console.log("Recalculation triggered");
      const formulaCells = Object.values(state.content.data)
        .filter((cellContent) => cellContent.isFormulaCell)
        .map((cellContent) => cellContent.evaluate(state.content.data));

      const formulaTrackedCells = formulaCells
        .map((it) => it.referenceCells)
        .flat();

      return {
        ...state,
        formulaTrackedCells: [...new Set(formulaTrackedCells)],
      };
    }
    case SheetAction.SET_CONTENT_DATA: {
      const { value, cell: cellId } = action.payload;
      const formula = value.toUpperCase();
      const formulaMode = isFormula(formula);
      const formulaTrackedCells = getFormulaTrackedCells(
        formula,
        state.formulaTrackedCells
      );

      const cellData = CellData.getOrNew(state.content.data[cellId]).setValue(
        value
      );

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
    case SheetAction.SET_CELL_REF: {
      const cellData = CellData.getOrNew(
        state.content.data[action.payload.cellId]
      );

      return {
        ...state,
        content: {
          ...state.content,
          data: {
            ...state.content.data,
            [action.payload.cellId]: cellData.setRef(action.payload.ref),
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
        ? [...new Set(cellIds)]
        : [
            ...new Set(
              [
                ...state.content.data[action.payload.cell].referenceCells,
                ...cellIds,
              ].flat()
            ),
          ];

      const cellData =
        state.content.data[action.payload.cell] ||
        new CellData().setId(action.payload.cell);

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
        content: {
          rowHeights: state.rowHeights,
          columnWidths: state.columnWidths,
          data: action.payload,
        },
      };
    case SheetAction.SET_CELL_FORMATTING:
      const cellData =
        state.content.data[state.selectedCell.id] ||
        new CellData().setId(state.selectedCell.id);
      return {
        ...state,
        content: {
          ...state.content,
          data: {
            ...state.content.data,
            [state.selectedCell.id]: cellData.setFormatting({
              ...cellData.formatting,
              ...action.payload,
            }),
          },
        },
      };
    case SheetAction.SET_CELL_FORMATTING_BULK:
      const formattedData = state.highlighted.cells.reduce((acc, cur) => {
        return {
          ...acc,
          [cur]: {
            ...acc[cur],
            formatting: {
              ...acc[cur]?.formatting,
              ...action.payload,
            },
          },
        };
      }, state.content.data);
      return {
        ...state,
        content: {
          ...state.content,
          data: formattedData,
        },
      };
    case SheetAction.ADD_MEMENTO: {
      const currentMemento = state.memento.find(
        (m) => m.id === state.currentMementoId
      );
      if (currentMemento && isEqual(currentMemento.content, state.content)) {
        return state;
      }

      const id = uniqueId();
      let memento = [
        ...state.memento.slice(
          0,
          state.memento.findIndex((m) => m.id === state.currentMementoId) + 1
        ),
        { id, content: state.content },
      ];

      // Limit the number of mementos to 32. If there are more, remove the oldest.
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
      // Find the index of the current memento by ID.
      const currentIndex = state.memento.findIndex(
        (m) => m.id === state.currentMementoId
      );

      // If we're at the start of the memento list or couldn't find the current memento, just return the state.
      if (currentIndex <= 0) return state;

      // Get the previous memento.
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
        (m) => m.id === state.currentMementoId
      );

      // If we're at the end of the memento list or couldn't find the current memento, just return the state.
      if (currentIndex === -1 || currentIndex >= state.memento.length - 1)
        return state;

      // Get the next memento.
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
