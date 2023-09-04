import { SheetConfig } from "../constants";
import Range from "../models/Range";
import { evaluateFormula, getId } from "../utils";
import { SheetAction } from "./actions";

export const initialState = {
  selected: { cell: "A1", row: 1, column: "A" },
  editMode: false,
  shiftKey: false,
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
  inputText: "",
  menuAnchorElement: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SheetAction.SET_SELECTED:
      const { row, column } = getId(action.payload);
      return {
        ...state,
        selected: {
          cell: action.payload,
          row: Number(row),
          column,
        },
      };
    case SheetAction.SET_INPUT_TEXT:
      return {
        ...state,
        inputText: action.payload,
      };
    case SheetAction.SET_EDIT_MODE:
      return {
        ...state,
        editMode: action.payload,
      };
    case SheetAction.SET_SHIFT_KEY:
      return {
        ...state,
        shiftKey: action.payload,
      };
    case SheetAction.SET_HOVERED:
      return {
        ...state,
        hovered: action.payload,
      };
    case SheetAction.SET_HIGHLIGHTED_ANCHOR:
      return {
        ...state,
        highlighted: {
          ...state.highlighted,
          anchor: action.payload,
        },
      };
    case SheetAction.SET_HIGHLIGHTED_CURRENT:
      return {
        ...state,
        highlighted: {
          ...state.highlighted,
          current: action.payload,
        },
      };

    case SheetAction.HIGHLIGHT_CELLS: {
      const range = Range.create(action.start, action.end);
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
    case SheetAction.DELETE_CELL_CONTENT: {
      const content = Object.keys(state.content)
        .filter((cell) => state.highlighted.cells.includes(cell))
        .reduce(
          (acc, cur) => ({
            ...acc,
            [cur]: { value: "", display: "" },
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
      // TODO
      return {
        ...state,
      };
    }
    case SheetAction.SET_MENU_ANCHOR_ELEMENT: {
      return {
        ...state,
        menuAnchorElement: action.payload,
      };
    }
    case SheetAction.SET_SELECTED_ROW: {
      const range = Range.create(
        `${SheetConfig.COLUMNS[0]}${action.payload}`,
        `${SheetConfig.COLUMNS[SheetConfig.MAX_COLUMNS]}${action.payload}`
      );

      return {
        ...state,
        selected: {
          ...state.selected,
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
      const range = Range.create(
        `${action.payload}1`,
        `${action.payload}${SheetConfig.MAX_ROWS}`
      );
      return {
        ...state,
        selected: {
          ...state.selected,
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
    case SheetAction.SET_SELECT_ALL: {
      const range = Range.create(
        `A1`,
        `${SheetConfig.COLUMNS[SheetConfig.MAX_COLUMNS - 1]}${
          SheetConfig.MAX_ROWS
        }`
      );
      return {
        ...state,
        selected: {
          ...state.selected,
        },
        highlighted: {
          ...state.highlighted,
          cells: range.ids,
          rows: range.rows,
          columns: range.columns,
        },
      };
    }
    case SheetAction.RESET_HIGHLIGHTED: {
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
    case SheetAction.CALCULATE_CONTENT_FORMULA: {
      const { cell, value: cellValue } = action.payload;
      const formulaCells = Object.keys(state.content).filter(
        (it) => state.content[it].formula
      );

      const recalculatedValues = formulaCells.reduce((acc, cur) => {
        const result = evaluateFormula(acc, cur, acc[cur].formula);
        return { ...acc, [cur]: result[cur] };
      }, state.content);

      if (cellValue?.startsWith("=")) {
        const newContent = evaluateFormula(state.content, cell, cellValue);

        return {
          ...state,
          content: { ...recalculatedValues, ...newContent },
        };
      }

      return {
        ...state,
        content: recalculatedValues,
      };
    }
    case SheetAction.SET_CONTENT:
      if (action.payload.value?.startsWith("=")) {
        return {
          ...state,
          content: {
            ...state.content,
            [action.payload.cell]: {
              formula: action.payload.value,
            },
          },
        };
      }
      // SUM(A1:A3)
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
