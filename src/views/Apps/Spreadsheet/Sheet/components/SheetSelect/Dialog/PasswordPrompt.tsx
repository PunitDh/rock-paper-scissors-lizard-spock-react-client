import { useState } from "react";
import ConfirmationDialog from "../../../../../../../components/shared/ConfirmationDialog";
import EnterPassword from "./components/EnterPassword";
import { Sheet, SheetId, State } from "../../../types";
import { useNotification } from "../../../../../../../hooks";

type Props = {
  open: SheetId | null;
  onCancel: () => void;
  onConfirm: (...args: any) => void;
  state: State;
};

const PasswordPrompt = ({ state, open, onCancel, onConfirm }: Props) => {
  const [password, setPassword] = useState<string>("");
  const notification = useNotification();

  const checkPassword = (): void => {
    if (open) {
      const selectedSheet: Sheet = state.sheets[open];
      if (password === selectedSheet.password) {
        onConfirm();
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
      open={Boolean(open)}
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
