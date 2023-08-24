import { Grid, Box } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import FeatureToggles from "./components/FeatureToggles";
import APILogs from "./components/APILogs";

const Dashboard = () => {
  return (
    <PageContainer title="Admin Dashboard" description="Admin dashboard">
      <Box>
        <Grid sx={{ mb: "1rem" }} container spacing={3}>
          <Grid item xs={12} lg={12}>
            <FeatureToggles />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <APILogs />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
