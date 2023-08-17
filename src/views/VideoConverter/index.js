import { Box, Grid } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import Convert from "./Convert";

export default function VideoConverter() {
  return (
    <PageContainer title="Video Converter">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Convert />
          </Grid>
          <Grid item xs={12} lg={8}></Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}></Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}></Grid>
          <Grid item xs={12} lg={8}></Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
