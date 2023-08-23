import { useState } from "react";
import { Grid, Box } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import RecentGames from "../components/shared/RecentGames";
import OnlineUsers from "../components/shared/OnlineUsers";
import UserSearch from "../components/shared/SearchUser";

const Rpsls = () => {
  const [search, setSearch] = useState("");
  return (
    <PageContainer
      title="Rock Paper Scissors Lizard Spock"
      description="Rock Paper Scissors Lizard Spock Home Page"
    >
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

export default Rpsls;
