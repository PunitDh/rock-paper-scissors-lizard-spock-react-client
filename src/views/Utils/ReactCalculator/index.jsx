import { Grid } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import Calculator from "./Calculator";

const ReactCalculator = () => (
  <PageContainer title="React Calculator">
    <Grid>
      <Grid item xs={12} lg={12}>
        <Calculator />
      </Grid>
    </Grid>
  </PageContainer>
);

export default ReactCalculator;
