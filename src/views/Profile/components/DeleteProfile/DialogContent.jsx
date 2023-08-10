import styled from "@emotion/styled";
import { Box, Stack } from "@mui/material";
import PasswordField from "src/components/shared/PasswordField";
import { FlexBox } from "src/components/shared/styles";

const RedBox = styled(Box)({
  color: "red",
});

const DialogContent = ({ password, setPassword }) => (
  <Stack>
    <FlexBox gap="0.5rem" direction="column">
      <Box>
        Permanently delete profile? This action will delete your player profile
        and all associated games. This action is irreversible.
      </Box>
      <RedBox>Enter your password below to delete your profile.</RedBox>
      <Box>
        <PasswordField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
    </FlexBox>
  </Stack>
);

export default DialogContent;
