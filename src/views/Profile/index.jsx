import { Grid, Box } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import UpdateProfile from "./components/UpdateProfile";
import ChangePassword from "./components/ChangePassword";
import DeleteProfile from "./components/DeleteProfile";
import { useAPI } from "src/hooks";

const Profile = () => {
  const api = useAPI();

  return (
    <PageContainer title="Update Profile" description="Update player profile">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <UpdateProfile api={api} />
          </Grid>
          <Grid item xs={12} lg={12}>
            <ChangePassword api={api} />
          </Grid>
          <Grid item xs={12} lg={12}>
            <DeleteProfile api={api} />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Profile;
