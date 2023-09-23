import React from "react";
import ConfirmationDialog from "../../../../../../../components/shared/ConfirmationDialog";
import Protect from "./components/Protect";

const ConfirmProtectSheet = ({
  onConfirm,
  value,
  onCancel,
  credentials,
  setCredentials,
}) => (
  <ConfirmationDialog
    id="protect-sheet-confirmation-dialog"
    keepMounted
    onConfirm={onConfirm}
    onCancel={onCancel}
    open={value}
    value={value}
    title="Protect"
    confirmBtnText="Set Password"
    confirmdisabled={Number(
      credentials.password.length < 1 ||
        credentials.confirmPassword !== credentials.password
    )}
    content={
      <Protect
        credentials={credentials}
        setCredentials={setCredentials}
        onSubmit={onConfirm}
      />
    }
  />
);

export default ConfirmProtectSheet;
