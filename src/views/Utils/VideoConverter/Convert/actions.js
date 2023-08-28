export const ConvertAction = Object.freeze({
  SET_VIDEO: "SET_VIDEO",
  SET_LOADING: "SET_LOADING",
  SET_OPTION: "SET_OPTION",
  TOGGLE_DEBUG_MODE: "TOGGLE_DEBUG_MODE",
  SET_SUBTITLES: "SET_SUBTITLES",
  SET_PROGRESS_UPDATE: "SET_PROGRESS_UPDATE",
  SET_DOWNLOAD_BLOB: "SET_DOWNLOAD_BLOB",
  RESET_OUTPUT: "RESET_OUTPUT",
  RESET_STATE: "RESET_STATE",
});

export const setVideo = (payload) => ({
  type: ConvertAction.SET_VIDEO,
  payload,
});

export const setOption = (payload) => ({
  type: ConvertAction.SET_OPTION,
  payload,
});

export const toggleDebugMode = () => ({
  type: ConvertAction.TOGGLE_DEBUG_MODE,
});

export const setLoading = (payload) => ({
  type: ConvertAction.SET_LOADING,
  payload,
});

export const setProgressUpdate = (payload) => ({
  type: ConvertAction.SET_PROGRESS_UPDATE,
  payload,
});

export const setSubtitles = (payload) => ({
  type: ConvertAction.SET_SUBTITLES,
  payload,
});

export const setDownloadBlob = (payload) => ({
  type: ConvertAction.SET_DOWNLOAD_BLOB,
  payload,
});

export const resetOutput = () => ({
  type: ConvertAction.RESET_OUTPUT,
});

export const resetState = () => ({
  type: ConvertAction.RESET_STATE,
});
