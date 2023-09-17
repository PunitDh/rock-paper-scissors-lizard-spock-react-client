import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const ConfirmationDialog = ({
  onConfirm,
  onCancel,
  value: valueProp,
  open,
  title,
  content,
  confirmBtnText,
  ...other
}) => {
  const [value, setValue] = useState(valueProp);
  const radioGroupRef = useRef(null);

  const onHandleConfirm = () => {
    onConfirm();
    onCancel(value);
  };

  useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () =>
    radioGroupRef.current != null && (radioGroupRef.current as HTMLInputElement).focus();

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>

      <DialogActions>
        <Button autoFocus onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onHandleConfirm}>{confirmBtnText}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
