import React from "react";
import styled from "@emotion/styled";
import { Box, Stack } from "@mui/material";
import FlexBox from "../../../../components/shared/FlexBox";
import PasswordField from "../../../../components/shared/PasswordField";

type Props = {
  password: string;
  setPassword: (password: string) => void;
}

const RedBox = styled(Box)({
  color: "red",
});

const DialogContent = ({ password, setPassword }: Props) => (
  <Stack>
    <FlexBox gap="0.5rem" flexDirection="column" alignItems="stretch">
      <Box>
        Permanently delete profile? This action will delete your player profile
        and all associated games. This action is irreversible.
      </Box>
      <RedBox>Enter your password below to delete your profile.</RedBox>
      <PasswordField
        value={password}
        onChange={(e: React.ChangeEvent) => setPassword((e.target as HTMLInputElement).value)}
      />
    </FlexBox>
  </Stack>
);

export default DialogContent;
