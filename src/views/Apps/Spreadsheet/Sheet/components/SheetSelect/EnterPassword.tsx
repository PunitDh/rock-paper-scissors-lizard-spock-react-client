import { Box, Stack } from "@mui/material";
import React from "react";
import FlexBox from "../../../../../../components/shared/FlexBox";
import PasswordField from "../../../../../../components/shared/PasswordField";

const EnterPassword = ({ password, setPassword }) => {
  const handleChange = (e: React.ChangeEvent) => {
    e.preventDefault();
    setPassword((e.target as HTMLInputElement).value);
  };
  return (
    <Stack>
      <FlexBox gap="0.5rem" flexDirection="column" alignItems="stretch">
        <Box>This sheet is protected. Enter password to view this sheet.</Box>
        <PasswordField
          value={password}
          onChange={handleChange}
        />
      </FlexBox>
    </Stack>
  );
};

export default EnterPassword;
