export const ConvertAction = Object.freeze({
  SET_VIDEO: "SET_VIDEO",
  SET_LOADING: "SET_LOADING",
  SET_LANGUAGE: "SET_LANGUAGE",
  SET_FORMAT: "SET_FORMAT",
  SET_DEBUG_MODE: "SET_DEBUG_MODE",
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

export const setLanguage = (payload) => ({
  type: ConvertAction.SET_LANGUAGE,
  payload,
});

export const setFormat = (payload) => ({
  type: ConvertAction.SET_FORMAT,
  payload,
});

export const setDebugMode = (payload) => ({
  type: ConvertAction.SET_DEBUG_MODE,
  payload,
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
