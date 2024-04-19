import { Grid } from "@mui/material";
import Calculator from "./Calculator";
import PageContainer from "../../../components/container/PageContainer";

const ReactCalculator = (): JSX.Element => (
  <PageContainer
    title="React Calculator"
    description="A calculator build with react"
  >
    <Grid gap={3}>
      <Grid item xs={12} lg={12}>
        <Calculator />
      </Grid>
    </Grid>
  </PageContainer>
);

export default ReactCalculator;
