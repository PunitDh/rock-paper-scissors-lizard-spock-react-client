import { SheetId } from "../../types";

export type Credentials = {
  password: string;
  confirmPassword: string;
};

export type PasswordPromptProps = {
  sheetId: SheetId | null;
  onSuccess: () => void;
};