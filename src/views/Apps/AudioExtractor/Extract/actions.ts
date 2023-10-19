import { Action, AudioFormat } from "../types";

export enum ExtractAction {
  SET_VIDEO,
  SET_LOADING,
  SET_FORMAT,
  TOGGLE_DEBUG_MODE,
  ADD_PROGRESS_UPDATE,
  SET_DOWNLOAD_BLOB,
  RESET_OUTPUT,
  RESET_STATE,
}

export const setVideo = (payload: File): Action => ({
  type: ExtractAction.SET_VIDEO,
  payload,
});

export const setFormat = (payload: AudioFormat): Action => ({
  type: ExtractAction.SET_FORMAT,
  payload,
});

export const toggleDebugMode = (): Action => ({
  type: ExtractAction.TOGGLE_DEBUG_MODE,
});

export const setLoading = (payload: boolean): Action => ({
  type: ExtractAction.SET_LOADING,
  payload,
});

export const addProgressUpdate = (payload: string): Action => ({
  type: ExtractAction.ADD_PROGRESS_UPDATE,
  payload,
});

export const setDownloadBlob = (payload): Action => ({
  type: ExtractAction.SET_DOWNLOAD_BLOB,
  payload,
});

export const resetOutput = (): Action => ({
  type: ExtractAction.RESET_OUTPUT,
});

export const resetState = (): Action => ({
  type: ExtractAction.RESET_STATE,
});
