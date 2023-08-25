import { useState } from "react";
import { Grid, Box } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import UserSearchBar from "../components/shared/UserSearchBar";
import Users from "../components/shared/Users";
import RecentGames from "../components/shared/RecentGames";

const NewGame = () => {
  const [search, setSearch] = useState("");
  return (
    <PageContainer title="Tic Tac Toe" description="Tic tac toe home page">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <UserSearchBar search={search} setSearch={setSearch} />
          </Grid>
          <Grid item xs={12} lg={8}>
            <Users search={search} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentGames />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default NewGame;
