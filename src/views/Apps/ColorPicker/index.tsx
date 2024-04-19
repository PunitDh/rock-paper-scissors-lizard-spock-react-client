import { Box, Grid } from "@mui/material";
import Picker from "./Picker";
import PageContainer from "../../../components/container/PageContainer";

const ColorPicker = (): JSX.Element => (
  <PageContainer title="Color Picker" description="React color picker">
    <Box>
      <Grid>
        <Grid item xs={12} lg={12}>
          <Picker />
        </Grid>
      </Grid>
    </Box>
  </PageContainer>
);

export default ColorPicker;
