import { Box, Grid, Typography } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import Convert from "./Convert";
import { useSelector } from "react-redux";

export default function VideoConverter() {
  const { videoConverter } = useSelector((state) => state.site.siteSettings);
  return (
    <PageContainer title="Video Subtitle Translator">
      {videoConverter ? (
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
      ) : (
        <Typography variant="h3">
          This feature is currently unavailable
        </Typography>
      )}
    </PageContainer>
  );
}
