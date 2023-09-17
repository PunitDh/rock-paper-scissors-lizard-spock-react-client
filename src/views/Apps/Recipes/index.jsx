import { Box, Grid } from "@mui/material";
import Picker from "./Picker";
import PageContainer from "../../../components/container/PageContainer";

export default function Recipes() {
  return (
    <PageContainer title="Recipes">
      <Box>
        <Grid>
          <Grid item xs={12} lg={12}>
            <Picker />
            {/* <Recipe recipe={recipe} /> */}
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
