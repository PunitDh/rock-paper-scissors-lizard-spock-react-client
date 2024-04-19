import DashboardCard from "../../../components/shared/DashboardCard";
import { Box, Stack } from "@mui/material";
import { useAPI } from "../../../hooks";
import TitledButton from "../../../components/shared/TitledButton";
import FormField from "../../../components/shared/FormField";

const ChangePassword = (): JSX.Element => {
  const api = useAPI();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmNewPassword } = e.target as HTMLFormElement;
    const payload = {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
      confirmNewPassword: confirmNewPassword.value,
    };
    api.updatePassword(payload);
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
