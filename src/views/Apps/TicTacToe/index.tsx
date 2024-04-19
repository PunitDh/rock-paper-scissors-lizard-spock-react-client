import { Box, Typography } from "@mui/material";
import PageContainer from "../../../components/container/PageContainer";

const NewGame = (): JSX.Element => (
  <PageContainer title="Tic Tac Toe" description="Tic tac toe home page">
    <Box>
      <Typography variant="h3" sx={{ mb: 6 }}>
        Coming Soon
      </Typography>
      <Typography variant="h5">(This app is under development)</Typography>
    </Box>
  </PageContainer>
);

export default NewGame;
