import PageContainer from "src/components/container/PageContainer";
import LinkCard from "./components/LinkCard";
import { ResponsiveFlexBox } from "../Utils/VideoConverter/styles";

const Games = () => (
  <PageContainer title="Games" description="Games dashboard">
    <ResponsiveFlexBox
      width="100%"
      height="50dvh"
      gap="2rem"
      flexWrap="wrap"
      reversed
    >
      <LinkCard
        to="/games/rpsls"
        title="Rock Paper Scissors Lizard Spock"
        image=""
        description="Rock Paper Scissors Lizard Spock"
      />
      <LinkCard
        to="/games/tictactoe"
        title="Tic Tac Toe"
        image=""
        description="Tic Tac Toe (coming soon)"
      />
    </ResponsiveFlexBox>
  </PageContainer>
);

export default Games;
