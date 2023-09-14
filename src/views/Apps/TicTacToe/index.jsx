import { useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import UserSearchBar from "../components/shared/UserSearchBar";
import Users from "../components/shared/Users";
import RecentGames from "../components/shared/RecentGames";

const NewGame = () => {
  return (
    <PageContainer title="Tic Tac Toe" description="Tic tac toe home page">
      <Box>
        <Typography variant="h3" sx={{ mb: 6 }}>
          Coming Soon
        </Typography>
        <Typography variant="h5">(This app is under development)</Typography>
      </Box>
    </PageContainer>
  );
};

export default NewGame;
