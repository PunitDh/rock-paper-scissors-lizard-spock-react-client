import ConfirmationDialog from "../../../../../../../components/shared/ConfirmationDialog";

const ConfirmDeleteSheet = ({ sheetName, open, onCancel, onConfirm }) => (
  <ConfirmationDialog
    id="delete-sheet-confirmation-dialog"
    keepMounted
    open={open}
    onCancel={onCancel}
    onConfirm={onConfirm}
    value={open}
    title="Delete"
    confirmBtnText="Delete Sheet"
    content={`Are you sure you want to delete '${sheetName}'?`}
  />
);

export default ConfirmDeleteSheet;
