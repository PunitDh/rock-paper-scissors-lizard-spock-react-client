import { Box, Grid } from "@mui/material";
import Extract from "./Extract";
import PageContainer from "../../../components/container/PageContainer";

export default function AudioExtractor() {
  return (
    <PageContainer
      title="Audio Extractor"
      description="Extract audio from a video file"
    >
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Extract />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
