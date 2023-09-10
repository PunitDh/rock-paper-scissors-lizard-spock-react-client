import { useEffect, useState } from "react";
import { useAPI, useCurrentGame, useToken } from "src/hooks";
import { useParams } from "react-router";
import PageContainer from "src/components/container/PageContainer";
import GameCard from "src/components/shared/GameCard";
import styled from "@emotion/styled";
import GameActions from "./components/GameActions";
import { FlexBox } from "src/components/shared/styles";
import GameTitle from "./components/GameTitle";
import LoadingScreen from "src/components/shared/LoadingScreen";

const ResultContainer = styled(FlexBox)({
  height: "80%",
  flexDirection: "column",
  justifyContent: "flex-start",
});

const Game = () => {
  const { gameId } = useParams();
  const currentGame = useCurrentGame();
  const [maxRounds, setMaxRounds] = useState(3);
  const token = useToken();
  const api = useAPI();

  useEffect(() => {
    api.getGame(gameId);
  }, [gameId]);

  const opponent = currentGame.players?.find(
    (player) => player.id !== token.decoded.id
  );

  return currentGame.id ? (
    <PageContainer title={currentGame.name}>
      <GameCard
        title={<GameTitle currentGame={currentGame} />}
        action={
          <GameActions
            onMaxRoundsChange={setMaxRounds}
            maxRounds={maxRounds}
            gameId={gameId}
            opponent={opponent}
          />
        }
      >
        <ResultContainer></ResultContainer>
      </GameCard>
    </PageContainer>
  ) : (
    <PageContainer title="Loading...">
      <LoadingScreen />
    </PageContainer>
  );
};

export default Game;
