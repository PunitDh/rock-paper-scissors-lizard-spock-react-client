import { Box, Grid } from "@mui/material";
import Picker from "./Picker";
import PageContainer from "../../../components/container/PageContainer";

export default function Recipes() {
  return (
    <PageContainer
      title="Flavor Match"
      description="Find your favourite recipe"
    >
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
