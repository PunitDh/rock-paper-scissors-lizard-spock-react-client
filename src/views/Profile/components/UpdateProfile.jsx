import DashboardCard from "../../../components/shared/DashboardCard";
import { usePlayer, useToken } from "src/hooks";
import { Box, Button, Stack } from "@mui/material";
import FormField from "src/components/shared/FormField";
import AvatarSelectField from "../../../components/shared/AvatarSelectField";

const UpdateProfile = () => {
  const token = useToken();
  const player = usePlayer();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, avatar } = e.target;
    const payload = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      avatar: avatar.value,
    };
    player.updateProfile(payload);
  };

  return (
    <DashboardCard title="Update Profile">
      <Box>
        <form onSubmit={handleSubmit}>
          <Stack mb={3}>
            <FormField label="First Name" value={token.decoded.firstName} />
            <FormField label="Last Name" value={token.decoded.lastName} />
            <FormField label="Email" value={token.decoded.email} />
            <AvatarSelectField selected={token.decoded.avatar} />
          </Stack>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            size="large"
          >
            Update Profile
          </Button>
        </form>
      </Box>
    </DashboardCard>
  );
};

export default UpdateProfile;
