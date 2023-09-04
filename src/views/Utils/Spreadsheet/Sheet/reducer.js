import { SheetConfig } from "../constants";
import Range from "../models/Range";
import { getId } from "../utils";
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

    case SheetAction.SET_HIGHLIGHTED_CELLS: {
      const range = action.payload;
      const cells = [...new Set(range.map((it) => it.id))].flat().sort();
      const rows = [...new Set(range.map((it) => Number(it.row)))];
      const columns = [...new Set(range.map((it) => it.column))];
      return {
        ...state,
        highlighted: {
          ...state.highlighted,
          cells,
          rows,
          columns,
        },
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
      const cells = range.map((it) => it.id);
      const rows = [...new Set(range.map((it) => Number(it.row)))];
      const columns = [...new Set(range.map((it) => it.column))];

      return {
        ...state,
        selected: {
          ...state.selected,
          row: Number(action.payload),
        },
        highlighted: {
          ...state.highlighted,
          cells,
          rows,
          columns,
        },
      };
    }
    case SheetAction.SET_SELECTED_COLUMN: {
      const range = Range.create(
        `${action.payload}1`,
        `${action.payload}${SheetConfig.MAX_ROWS}`
      );
      const cells = range.map((it) => it.id);
      const rows = [...new Set(range.map((it) => Number(it.row)))];
      const columns = [...new Set(range.map((it) => it.column))];
      return {
        ...state,
        selected: {
          ...state.selected,
          column: action.payload,
        },
        highlighted: {
          ...state.highlighted,
          cells,
          rows,
          columns,
        },
      };
    }
    case SheetAction.RESET_HIGHLIGHTED:
      return {
        ...state,
        highlighted: initialState.highlighted,
      };
    case SheetAction.SET_MOUSEDOWN:
      return {
        ...state,
        mouseDown: action.payload,
      };
    case SheetAction.SET_CONTENT:
      if (action.payload.value.startsWith("=")) {
        const simpleReg = /(\w+\d+)([+-/*]|$)/g;
        const simpleFormula = action.payload.value.matchAll(simpleReg);

        if (simpleReg.exec(action.payload.value)) {
          let str = "";
          str += [...simpleFormula]
            .map((group) => {
              return `${parseFloat(state.content[group[1]]?.value || 0)}${
                group[2]
              }`;
            })
            .join("");

          try {
            const value = eval(str);
            return {
              ...state,
              content: {
                ...state.content,
                [action.payload.cell]: {
                  formula: action.payload.value,
                  value,
                },
              },
            };
          } catch {}
        }

        const formulaTest = /(SUM|AVG)+(?:\()(\w+):(\w+)\)/g;
        const [string, formula, start, end] = [
          ...action.payload.value.matchAll(formulaTest),
        ].flat();

        if (string && formula && start && end) {
          const range = Range.create(start, end);
          const value = range.reduce(
            (a, c) => +a + parseFloat(state.content[c.id]?.value) || 0,
            0
          );
          return {
            ...state,
            content: {
              ...state.content,
              [action.payload.cell]: {
                formula: action.payload.value,
                value,
              },
            },
          };
        }
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
