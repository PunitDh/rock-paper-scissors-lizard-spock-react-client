import DashboardCard from "../../../components/shared/DashboardCard";
import { Box } from "@mui/material";
import AvatarSelectField from "../../../components/shared/AvatarSelectField";
import { useAPI, useToken } from "../../../hooks";
import FlexBox from "../../../components/shared/FlexBox";
import TitledButton from "../../../components/shared/TitledButton";
import FormField from "../../../components/shared/FormField";

const UpdateProfile = (): JSX.Element => {
  const api = useAPI();
  const token = useToken();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { firstName, lastName, email, avatar } = e.target as HTMLFormElement;
    const payload = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      avatar: avatar.value,
    };
    api.updateProfile(payload);
  };

  return (
    <DashboardCard title="Update Profile">
      <Box>
        <form onSubmit={handleSubmit}>
          {token.decoded && (
            <FlexBox flexDirection="column" alignItems="flex-start">
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
          )}
        </form>
      </Box>
    </DashboardCard>
  );
};

export default UpdateProfile;
