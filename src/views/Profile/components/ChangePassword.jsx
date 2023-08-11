import DashboardCard from "../../../components/shared/DashboardCard";
import { Box, Stack } from "@mui/material";
import FormField from "src/components/shared/FormField";
import { TitledButton } from "src/components/shared/styles";

const ChangePassword = ({ player }) => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmNewPassword } = e.target;
    const payload = {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
      confirmNewPassword: confirmNewPassword.value,
    };
    player.updatePassword(payload);
  };

  return (
    <DashboardCard title="Change Password">
      <Box>
        <form onSubmit={handleSubmit}>
          <Stack mb={3}>
            <FormField type="password" label="Old Password" />
            <FormField type="password" label="New Password" />
            <FormField type="password" label="Confirm New Password" />
          </Stack>
          <TitledButton
            type="submit"
            color="primary"
            variant="contained"
            size="large"
            title="Change your password"
          >
            Change Password
          </TitledButton>
        </form>
      </Box>
    </DashboardCard>
  );
};

export default ChangePassword;
