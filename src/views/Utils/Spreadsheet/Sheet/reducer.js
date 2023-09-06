import { SheetConfig } from "../constants";
import Cell from "../models/Cell";
import Range from "../models/Range";
import { getCellOffset, typeInTextField } from "./utils/cellUtils";
import { SheetAction } from "./actions";
import { updateStateContent } from "./utils/evalUtils";

export const initialState = {
  maxRows: SheetConfig.MAX_ROWS,
  maxColumns: SheetConfig.MAX_COLUMNS,
  selectedCell: new Cell("A1"), //{ cell: "A1", row: 1, column: "A", columnCharCode: 65 },
  editMode: false,
  formulaMode: false,
  hovered: "",
  highlighted: {
    anchor: null,
    current: null,
    cells: [],
    rows: [],
    columns: [],
  },
  content: {},
  mouseDown: false,
  formulaFieldText: "",
  formulaFieldFocused: false,
  menuAnchorElement: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SheetAction.SET_SELECTED:
      return {
        ...state,
        selectedCell: new Cell(action.payload),
      };
    case SheetAction.SET_FORMULA_FIELD_TEXT:
      return {
        ...state,
        formulaFieldText: action.payload,
      };
    case SheetAction.SET_FORMULA_FIELD_FOCUSED:
      return {
        ...state,
        formulaFieldFocused: action.payload,
      };
    case SheetAction.RESET_FORMULA_FIELD:
      return {
        ...state,
        formulaFieldText: "",
        formulaFieldFocused: false,
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
    case SheetAction.SET_HOVERED:
      return {
        ...state,
        hovered: action.payload,
      };
    case SheetAction.SET_HIGHLIGHT_ANCHOR:
      return {
        ...state,
        highlighted: {
          ...state.highlighted,
          anchor: action.payload,
        },
      };
    case SheetAction.SET_HIGHLIGHT_CURRENT:
      return {
        ...state,
        highlighted: {
          ...state.highlighted,
          current: action.payload,
        },
      };

    case SheetAction.HIGHLIGHT_CELLS: {
      const range = Range.createFlat(action.start, action.end);
      return {
        ...state,
        highlighted: {
          ...state.highlighted,
          cells: range.ids,
          rows: range.rows,
          columns: range.columns,
        },
        editMode: false,
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
            [action.payload]: { value: null, display: null, formula: null },
          },
        };
      }

      const content = Object.keys(state.content)
        .filter((cell) => state.highlighted.cells.includes(cell))
        .reduce(
          (acc, cur) => ({
            ...acc,
            [cur]: { value: null, display: null, formula: null },
          }),
          state.content
        );

      return {
        ...state,
        content,
      };
    }
    case SheetAction.CUT_CELL_CONTENT: {
      // TODO
      return {
        ...state,
      };
    }
    case SheetAction.COPY_CELL_CONTENT: {
      // TODO
      return {
        ...state,
      };
    }
    case SheetAction.PASTE_CELL_CONTENT: {
      const { data, anchor } = action.payload;
      try {
        const parsed = JSON.parse(data);
        if (parsed.type === "_sheet") {
          const cellOffset = getCellOffset(
            new Cell(anchor.id),
            parsed.content[0].length - 1,
            parsed.content.length - 1
          );
          const range = Range.create(anchor.id, cellOffset);
          const updateObj = {};
          range.cells.forEach((row, rowIndex) =>
            row.forEach((cell, cellIndex) => {
              updateObj[cell.id] = parsed.content[rowIndex][cellIndex];
            })
          );
          const newContent = Object.keys(updateObj).reduce((acc, cur) => {
            return {
              ...acc,
              [cur]: {
                value: updateObj[cur].value,
                display: updateObj[cur].display,
                formula: updateObj[cur].formula,
              },
            };
          }, state.content);
          return {
            ...state,
            content: newContent,
          };
        }
      } catch (e) {
        const value = typeInTextField(
          `${action.payload.anchor.id}-input`,
          action.payload.data
        );
        return {
          ...state,
          content: {
            ...state.content,
            [action.payload.anchor.id]: {
              value,
            },
          },
        };
      }
      break;
    }

    case SheetAction.SET_MENU_ANCHOR_ELEMENT: {
      return {
        ...state,
        menuAnchorElement: action.payload,
      };
    }
    case SheetAction.SET_SELECTED_ROW: {
      const range = Range.createFlat(
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
          cells: range.ids,
          rows: range.rows,
          columns: range.columns,
        },
      };
    }
    case SheetAction.SET_SELECTED_COLUMN: {
      const range = Range.createFlat(
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
          cells: range.ids,
          rows: range.rows,
          columns: range.columns,
        },
      };
    }
    case SheetAction.SELECT_ALL: {
      const range = Range.createFlat(
        `A1`,
        `${SheetConfig.COLUMNS[state.maxColumns - 1]}${state.maxRows}`
      );
      return {
        ...state,
        editMode: false,
        highlighted: {
          ...state.highlighted,
          cells: range.ids,
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
      const formulaCells = Object.keys(state.content).filter(
        (it) => state.content[it].formula?.length > 0
      );

      const recalculatedValues = formulaCells.reduce((acc, cur) => {
        const result = updateStateContent(acc, cur, acc[cur].formula);
        return result ? { ...acc, [cur]: result[cur] } : acc;
      }, state.content);

      return {
        ...state,
        content: recalculatedValues,
      };
    }
    case SheetAction.SET_CONTENT:
      if (action.payload.value?.startsWith("=")) {
        return {
          ...state,
          formulaMode: true,
          content: {
            ...state.content,
            [action.payload.cell]: {
              formula: action.payload.value,
            },
          },
        };
      }

      return {
        ...state,
        content: {
          ...state.content,
          [action.payload.cell]: {
            value: action.payload.value,
            display: action.payload.value,
          },
        },
      };
    case SheetAction.RESET_STATE:
    default:
      return initialState;
  }
};
