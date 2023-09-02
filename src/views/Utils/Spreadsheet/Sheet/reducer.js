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
      return {
        ...state,
        content: {
          ...state.content,
          [action.payload.cell]: action.payload.value,
        },
      };
    case SheetAction.RESET_STATE:
    default:
      return initialState;
  }
};
