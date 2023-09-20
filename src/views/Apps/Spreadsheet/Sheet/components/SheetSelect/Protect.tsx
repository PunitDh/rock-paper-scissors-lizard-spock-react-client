import { Box, Stack } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import FlexBox from "../../../../../../components/shared/FlexBox";
import PasswordField from "../../../../../../components/shared/PasswordField";
import { Credentials } from "./types";

type Props = {
  credentials: Credentials;
  setCredentials: Dispatch<SetStateAction<Credentials>>;
  onSubmit: () => void;
};

const Protect = ({ credentials, setCredentials, onSubmit }: Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((credentials: Credentials) => ({
      ...credentials,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <FlexBox gap="0.5rem" flexDirection="column" alignItems="stretch">
          <Box>Enter a password to protect this sheet.</Box>
          <PasswordField
            name="password"
            value={credentials.password}
            onChange={handleSetPassword}
            placeholder="Enter a password"
            autoComplete="off"
          />
          <PasswordField
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleSetPassword}
            placeholder="Confirm password"
            autoComplete="off"
          />
          <input type="submit" style={{ display: "none" }} />
        </FlexBox>
      </Stack>
    </form>
  );
};

export default Protect;
