import DashboardCard from "../../../components/shared/DashboardCard";
import { Box, Button, Stack } from "@mui/material";
import FormField from "src/components/shared/FormField";
import { usePlayer } from "src/hooks";

const ChangePassword = () => {
  const player = usePlayer();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmNewPassword } = e.target;
    const payload = {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
      confirmNewPassword: confirmNewPassword.value,
    };
    // player.updatePassword(payload);
    console.log(payload);
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
          <Button
            type="submit"
            color="primary"
            variant="contained"
            size="large"
          >
            Change Password
          </Button>
        </form>
      </Box>
    </DashboardCard>
  );
};

export default ChangePassword;
