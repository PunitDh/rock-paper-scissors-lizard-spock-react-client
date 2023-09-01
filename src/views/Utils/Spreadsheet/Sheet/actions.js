export const SheetAction = Object.freeze({
  SET_SELECTED: "SET_SELECTED",
  SET_HIGHLIGHTED_CELLS: "SET_HIGHLIGHTED_CELLS",
  SET_HIGHLIGHTED_ANCHOR: "SET_HIGHLIGHTED_ANCHOR",
  SET_HIGHLIGHTED_CURRENT: "SET_HIGHLIGHTED_CURRENT",
  SET_HIGHLIGHTED_DESTINATION: "SET_HIGHLIGHTED_DESTINATION",
  RESET_HIGHLIGHTED: "RESET_HIGHLIGHTED",
  SET_MOUSEDOWN: "SET_MOUSEDOWN",
  SET_CONTENT: "SET_CONTENT",
  RESET_STATE: "RESET_STATE",
});

export const setSelected = (payload) => ({
  type: SheetAction.SET_SELECTED,
  payload,
});

export const setHighlightedAnchor = (payload) => ({
  type: SheetAction.SET_HIGHLIGHTED_ANCHOR,
  payload,
});

export const setHighlightedDestination = (payload) => ({
  type: SheetAction.SET_HIGHLIGHTED_DESTINATION,
  payload,
});

export const setHighlightedCurrent = (payload) => ({
  type: SheetAction.SET_HIGHLIGHTED_CURRENT,
  payload,
});

export const setHighlightedCells = (payload) => ({
  type: SheetAction.SET_HIGHLIGHTED_CELLS,
  payload,
});

export const resetHighlighted = () => ({
  type: SheetAction.RESET_HIGHLIGHTED,
});

export const setMouseDown = (payload) => ({
  type: SheetAction.SET_MOUSEDOWN,
  payload,
});

export const setContent = (payload) => ({
  type: SheetAction.SET_CONTENT,
  payload,
});

export const resetState = () => ({
  type: SheetAction.RESET_STATE,
});
