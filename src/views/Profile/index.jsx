import { Grid, Box } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import UpdateProfile from "./components/UpdateProfile";
import ChangePassword from "./components/ChangePassword";
import DeleteProfile from "./components/DeleteProfile";
import { usePlayer } from "src/hooks";

const Profile = () => {
  const player = usePlayer();

  return (
    <PageContainer title="Update Profile" description="Update player profile">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <UpdateProfile player={player} />
          </Grid>
          <Grid item xs={12} lg={12}>
            <ChangePassword player={player} />
          </Grid>
          <Grid item xs={12} lg={12}>
            <DeleteProfile player={player} />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Profile;
