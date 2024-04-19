import { Box, Grid } from "@mui/material";
import Extract from "./Extract";
import PageContainer from "../../../components/container/PageContainer";

const AudioExtractor = (): JSX.Element => (
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

export default AudioExtractor;
