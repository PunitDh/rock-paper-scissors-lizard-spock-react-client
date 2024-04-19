import { useEffect, useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

type Props = {
  onConfirm: (...args: any[]) => void;
  onCancel: (...args: any[]) => void;
  value?: string;
  open: boolean;
  title: string;
  content: string | JSX.Element;
  confirmBtnText: string;
  confirmdisabled?: boolean;
  [x: string]: any;
};

const ConfirmationDialog = ({
  onConfirm,
  onCancel,
  value: valueProp,
  open,
  title,
  content,
  confirmBtnText,
  confirmdisabled,
  ...other
}: Props) => {
  const [value, setValue] = useState(valueProp);
  const radioGroupRef = useRef<HTMLInputElement | null>(null);

  const onHandleConfirm = () => {
    onConfirm();
    onCancel(value);
  };

  useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => radioGroupRef.current?.focus();

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
        <Button type="button" autoFocus onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={onHandleConfirm}
          disabled={confirmdisabled}
        >
          {confirmBtnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
