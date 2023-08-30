import { Box, Grid } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import Picker from "./Picker";

export default function VideoConverter() {
  return (
    <PageContainer title="Video Subtitle Generator">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Picker />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
