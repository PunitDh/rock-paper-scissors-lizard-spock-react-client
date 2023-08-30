import { Box, Grid } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import Calculator from "./Calculator";

export default function ReactCalculator() {
  return (
    <PageContainer title="React Calculator">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Calculator />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
