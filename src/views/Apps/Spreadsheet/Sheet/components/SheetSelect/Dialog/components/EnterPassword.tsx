import { Box, Stack } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import FlexBox from "../../../../../../../../components/shared/FlexBox";
import PasswordField from "../../../../../../../../components/shared/PasswordField";

type Props = {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
};

const EnterPassword = ({ password, setPassword, onSubmit }: Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  return (
    <Stack>
      <FlexBox gap="0.5rem" flexDirection="column" alignItems="stretch">
        <Box>This sheet is protected. Enter password to view this sheet.</Box>
        <form onSubmit={handleSubmit}>
          <PasswordField value={password} onChange={handleChange} />
        </form>
      </FlexBox>
    </Stack>
  );
};

export default EnterPassword;
