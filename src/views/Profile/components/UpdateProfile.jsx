import DashboardCard from "../../../components/shared/DashboardCard";
import { Box, Stack } from "@mui/material";
import FormField from "src/components/shared/FormField";
import AvatarSelectField from "../../../components/shared/AvatarSelectField";
import { FlexBox, TitledButton } from "src/components/shared/styles";
import { useToken } from "src/hooks";

const UpdateProfile = ({ player }) => {
  const token = useToken();

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
          <FlexBox flexDirection="column" alignItems="flex-start" gap="0.5rem">
            <FormField label="First Name" value={token.decoded.firstName} />
            <FormField label="Last Name" value={token.decoded.lastName} />
            <FormField
              label="Email"
              value={token.decoded.email}
              disabled={!token.decoded.isAdmin}
            />
            <AvatarSelectField selected={token.decoded.avatar} />
            <TitledButton
              title="Update your profile"
              type="submit"
              color="primary"
              variant="contained"
              size="large"
            >
              Update Profile
            </TitledButton>
          </FlexBox>
        </form>
      </Box>
    </DashboardCard>
  );
};

export default UpdateProfile;
