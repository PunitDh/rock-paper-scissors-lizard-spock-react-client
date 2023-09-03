import { createCellRange } from "../utils";
import { SheetAction } from "./actions";

export const initialState = {
  selected: "A1",
  editMode: false,
  shiftKey: false,
  hovered: "",
  highlighted: { anchor: null, current: null, cells: [] },
  content: {},
  mouseDown: false,
  inputText: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SheetAction.SET_SELECTED:
      return {
        ...state,
        selected: action.payload,
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

    case SheetAction.SET_HIGHLIGHTED_CELLS:
      return {
        ...state,
        highlighted: {
          ...state.highlighted,
          cells: [...new Set(action.payload)].flat().sort(),
        },
      };
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
              return `${state.content[group[1]]?.value || 0}${group[2]}`;
            })
            .join("");

          try {
            console.log({str});
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
          const range = createCellRange(start, end);
          const value = range.reduce(
            (a, c) => +a + parseFloat(state.content[c]?.value) || 0,
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
