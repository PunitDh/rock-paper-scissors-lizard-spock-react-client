import { Action } from "../types";

export enum ConvertAction {
  SET_VIDEO,
  SET_LOADING,
  SET_OPTION,
  TOGGLE_DEBUG_MODE,
  SET_SUBTITLES,
  SET_PROGRESS_UPDATE,
  SET_DOWNLOAD_BLOB,
  RESET_OUTPUT,
  RESET_STATE,
}

export const setVideo = (payload): Action => ({
  type: ConvertAction.SET_VIDEO,
  payload,
});

export const setOption = (payload): Action => ({
  type: ConvertAction.SET_OPTION,
  payload,
});

export const toggleDebugMode = (): Action => ({
  type: ConvertAction.TOGGLE_DEBUG_MODE,
});

export const setLoading = (payload): Action => ({
  type: ConvertAction.SET_LOADING,
  payload,
});

export const setProgressUpdate = (payload): Action => ({
  type: ConvertAction.SET_PROGRESS_UPDATE,
  payload,
});

export const setSubtitles = (payload): Action => ({
  type: ConvertAction.SET_SUBTITLES,
  payload,
});

export const setDownloadBlob = (payload): Action => ({
  type: ConvertAction.SET_DOWNLOAD_BLOB,
  payload,
});

export const resetOutput = (): Action => ({
  type: ConvertAction.RESET_OUTPUT,
});

export const resetState = (): Action => ({
  type: ConvertAction.RESET_STATE,
});
