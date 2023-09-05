import { SheetConfig } from "../constants";
// import { updateStateContent } from "./utils/evalUtils";
import Cell from "../models/Cell";
import Range from "../models/Range";
import { getCellOffset, getId } from "./utils/cellUtils";
import { SheetAction } from "./actions";
import { updateStateContent } from "./utils/evalUtils2";

export const initialState = {
  selected: { cell: "A1", row: 1, column: "A", columnCharCode: 65 },
  editMode: false,
  formulaMode: false,
  shiftKey: false,
  commandKey: false,
  controlKey: false,
  altKey: false,
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
  inputTextFocused: false,
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
    case SheetAction.SET_INPUT_TEXT_FOCUSED:
      return {
        ...state,
        inputTextFocused: action.payload,
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
    case SheetAction.SET_SHIFT_KEY:
      return {
        ...state,
        shiftKey: action.payload,
      };
    case SheetAction.SET_COMMAND_KEY:
      return {
        ...state,
        commandKey: action.payload,
      };
    case SheetAction.SET_CONTROL_KEY:
      return {
        ...state,
        controlKey: action.payload,
      };
    case SheetAction.SET_ALT_KEY:
      return {
        ...state,
        altKey: action.payload,
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
    case SheetAction.DELETE_CELL_CONTENT: {
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

          console.log({
            ...state,
            content: newContent,
          });
          return {
            ...state,
            content: newContent,
          };
        }
      } catch (e) {
        console.error(e);
        return {
          ...state,
        };
      }
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
      const range = Range.createFlat(
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
      const range = Range.createFlat(
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
    case SheetAction.SELECT_ALL: {
      const range = Range.createFlat(
        `A1`,
        `${SheetConfig.COLUMNS[SheetConfig.MAX_COLUMNS - 1]}${
          SheetConfig.MAX_ROWS
        }`
      );
      return {
        ...state,
        editMode: false,
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

      // const recalculatedValues = formulaCells.reduce((acc, cur) => {
      //   const result = evaluateFormula(acc, cur, acc[cur].formula);
      //   return result ? { ...acc, [cur]: result[cur] } : acc;
      // }, state.content);

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
        console.log("Formula mode activated", action.payload.value);

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
