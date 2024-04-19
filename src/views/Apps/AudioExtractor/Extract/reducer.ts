import { Action, State } from "../types";
import { ExtractAction } from "./actions";

export const initialState: State = {
  video: null,
  audio: null,
  format: "mp3",
  loading: false,
  updates: [],
  downloadBlob: null,
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ExtractAction.SET_VIDEO:
      return {
        ...state,
        video: action.payload,
      };

    case ExtractAction.SET_FORMAT:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case ExtractAction.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case ExtractAction.ADD_PROGRESS_UPDATE:
      return {
        ...state,
        updates: [...state.updates, action.payload],
      };

    case ExtractAction.SET_DOWNLOAD_BLOB:
      return {
        ...state,
        downloadBlob: URL.createObjectURL(action.payload),
        loading: false,
      };

    case ExtractAction.RESET_OUTPUT:
      return {
        ...state,
        updates: initialState.updates,
        downloadBlob: null,
      };

    case ExtractAction.RESET_STATE:
    default:
      return initialState;
  }
};
