import { useState } from "react";
import ConfirmationDialog from "../../../../../../../components/shared/ConfirmationDialog";
import EnterPassword from "./components/EnterPassword";
import { Sheet, State } from "../../../types";
import { useNotification } from "../../../../../../../hooks";
import { PasswordPromptProps } from "../types";

type Props = {
  passwordPrompt: PasswordPromptProps;
  onCancel: () => void;
  state: State;
};

const PasswordPrompt = ({ state, passwordPrompt, onCancel }: Props) => {
  const [password, setPassword] = useState<string>("");
  const notification = useNotification();

  const checkPassword = (): void => {
    if (passwordPrompt.sheetId) {
      const selectedSheet: Sheet = state.sheets[passwordPrompt.sheetId];
      if (password === selectedSheet.password) {
        passwordPrompt.onSuccess();
        if (passwordPrompt.successMessage) {
          notification.success(passwordPrompt.successMessage);
        }
      } else {
        notification.error("Wrong password entered");
      }
      setPassword("");
      onCancel();
    }
  };

  return (
    <ConfirmationDialog
      id="sheet-password-prompt-confirmation-dialog"
      keepMounted
      open={Boolean(passwordPrompt.sheetId)}
      onCancel={onCancel}
      onConfirm={checkPassword}
      value={password}
      title="Protected"
      confirmBtnText="Submit"
      content={
        <EnterPassword
          password={password}
          setPassword={setPassword}
          onSubmit={checkPassword}
        />
      }
    />
  );
};

export default PasswordPrompt;
