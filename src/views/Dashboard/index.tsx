import React from "react";
import { Grid, Box } from "@mui/material";
import FeatureToggles from "./components/FeatureToggles";
import APILogs from "./components/APILogs";
import PageContainer from "../../components/container/PageContainer";

const Dashboard = () => (
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

export default Dashboard;
