import { Grid, Box } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import FeatureToggles from "./components/FeatureToggles";

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <FeatureToggles />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
