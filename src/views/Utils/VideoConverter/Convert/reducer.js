import { ConvertAction } from "./actions";

export const initialState = {
  video: null,
  language: "Spanish",
  format: "vtt",
  debugMode: true,
  loading: false,
  updates: [],
  subtitles: {},
  downloadBlob: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ConvertAction.SET_VIDEO:
      return {
        ...state,
        video: action.payload,
      };
    case ConvertAction.SET_OPTION:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case ConvertAction.TOGGLE_DEBUG_MODE:
      return {
        ...state,
        debugMode: !state.debugMode,
      };
    case ConvertAction.SET_SUBTITLES:
      return {
        ...state,
        subtitles: action.payload,
        loading: false,
      };
    case ConvertAction.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ConvertAction.SET_PROGRESS_UPDATE:
      return {
        ...state,
        updates: [...state.updates, action.payload],
      };
    case ConvertAction.SET_DOWNLOAD_BLOB:
      return {
        ...state,
        downloadBlob: URL.createObjectURL(action.payload),
      };
    case ConvertAction.RESET_OUTPUT:
      return {
        ...state,
        updates: [],
        subtitles: {},
      };
    case ConvertAction.RESET_STATE:
    default:
      return initialState;
  }
};
