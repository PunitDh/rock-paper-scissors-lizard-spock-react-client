import { Box, Grid } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import Picker from "./Picker";

export default function ColorPicker() {
  return (
    <PageContainer title="Color Picker">
      <Box>
        <Grid>
          <Grid item xs={12} lg={12}>
            <Picker />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
