import { Grid, Box } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";

const Utils = () => (
  <PageContainer title="Utilities" description="Utilities dashboard">
    <Box>
      <Grid sx={{ mb: "1rem" }} container spacing={3}>
        <Grid item xs={12} lg={12}>
          Video Converter
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}></Grid>
      </Grid>
    </Box>
  </PageContainer>
);

export default Utils;
