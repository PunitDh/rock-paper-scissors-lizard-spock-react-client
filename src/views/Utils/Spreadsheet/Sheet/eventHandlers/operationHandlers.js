import { addMemento, deleteCellContent, pasteCellContent } from "../actions";
import { generateClipboardContent } from "../utils/cellUtils";

export const handleCopyCaptureOperation = async (e, state, clipboard) => {
  e.preventDefault();
  const content = generateClipboardContent(state);
  await clipboard.copy(content);
};

export const handleCutCaptureOperation = (e, dispatch) => {
  handleCopyCaptureOperation(e);
  dispatch(deleteCellContent());
  dispatch(addMemento());
};

export const handlePasteCaptureOperation = async (e, clipboard, state, dispatch) => {
  e.preventDefault();
  const data = await clipboard.get();
  dispatch(pasteCellContent(state.selectedCell.id, data));
};
