import { Box, Stack } from "@mui/material";
import React from "react";
import FlexBox from "../../../../../../components/shared/FlexBox";
import PasswordField from "../../../../../../components/shared/PasswordField";

const Protect = ({ credentials, setCredentials }) => {
  const handleSetPassword = (e: React.ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setCredentials((credentials) => ({ ...credentials, [name]: value }));
  };

  return (
    <Stack>
      <FlexBox gap="0.5rem" flexDirection="column" alignItems="stretch">
        <Box>Enter a password to protect this sheet.</Box>
        <PasswordField
          name="password"
          value={credentials.password}
          onChange={handleSetPassword}
        />
        <PasswordField
          name="confirmPassword"
          value={credentials.confirmPassword}
          onChange={handleSetPassword}
        />
      </FlexBox>
    </Stack>
  );
};

export default Protect;
