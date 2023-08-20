import { useState } from "react";
import { Grid, Box } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import RecentGames from "./components/RecentGames";
import UserSearch from "./components/SearchUser";
import OnlineUsers from "./components/OnlineUsers";

const NewGame = () => {
  const [search, setSearch] = useState("");
  return (
    <PageContainer title="Start New Game" description="Game page">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <UserSearch search={search} setSearch={setSearch} />
          </Grid>
          <Grid item xs={12} lg={8}>
            <OnlineUsers search={search} />
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
