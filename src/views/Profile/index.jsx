import { Grid, Box } from "@mui/material";
import UpdateProfile from "./components/UpdateProfile";
import ChangePassword from "./components/ChangePassword";
import DeleteProfile from "./components/DeleteProfile";
import PageContainer from "../../components/container/PageContainer";

const Profile = () => {

  return (
    <PageContainer title="Update Profile" description="Update player profile">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <UpdateProfile />
          </Grid>
          <Grid item xs={12} lg={12}>
            <ChangePassword />
          </Grid>
          <Grid item xs={12} lg={12}>
            <DeleteProfile />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Profile;
