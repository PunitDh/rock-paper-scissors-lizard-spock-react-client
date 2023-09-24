import ConfirmationDialog from "../../../../../../../components/shared/ConfirmationDialog";
import EnterPassword from "./components/EnterPassword";

const PasswordPrompt = ({ open, onCancel, onConfirm, value, setValue }) => (
  <ConfirmationDialog
    id="sheet-password-prompt-confirmation-dialog"
    keepMounted
    open={open}
    onCancel={onCancel}
    onConfirm={onConfirm}
    value={value}
    title="Protected"
    confirmBtnText="Submit"
    content={
      <EnterPassword
        password={value}
        setPassword={setValue}
        onSubmit={onConfirm}
      />
    }
  />
);

export default PasswordPrompt;
