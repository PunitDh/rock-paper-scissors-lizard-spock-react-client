import { useState } from "react";
import { Grid, Box } from "@mui/material";
import RecentGames from "../components/shared/RecentGames";
import Users from "../components/shared/Users";
import UserSearchBar from "../components/shared/UserSearchBar";
import PageContainer from "../../../components/container/PageContainer";

const Rpsls = (): JSX.Element => {
  const [search, setSearch] = useState<string>("");

  return (
    <PageContainer
      title="Rock Paper Scissors Lizard Spock"
      description="Rock Paper Scissors Lizard Spock Home Page"
    >
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

export default Rpsls;
