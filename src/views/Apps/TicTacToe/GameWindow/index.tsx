import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "@emotion/styled";
import GameActions from "./components/GameActions";
import GameTitle from "./components/GameTitle";
import FlexBox from "../../../../components/shared/FlexBox";
import { useAPI, useCurrentGame, useToken } from "../../../../hooks";
import PageContainer from "../../../../components/container/PageContainer";
import LoadingScreen from "../../../../components/shared/LoadingScreen";
import GameCard from "../../../../components/shared/GameCard";

const ResultContainer = styled(FlexBox)({
  height: "80%",
  flexDirection: "column",
  justifyContent: "flex-start",
});

const Game = (): JSX.Element => {
  const { gameId } = useParams();
  const currentGame = useCurrentGame();
  const [maxRounds, setMaxRounds] = useState(3);
  const token = useToken();
  const api = useAPI();

  useEffect(() => {
    if (gameId) api.getGame(gameId);
  }, [gameId]);

  const opponent = currentGame.players?.find(
    (player) => player.id !== token.decoded?.id
  );

  return currentGame.id ? (
    <PageContainer title={currentGame.name} description="Tic tac toe game">
      <GameCard
        title={<GameTitle />}
        action={
          opponent && (
            <GameActions
              onMaxRoundsChange={setMaxRounds}
              maxRounds={maxRounds}
              gameId={gameId}
              opponent={opponent}
            />
          )
        }
      >
        <ResultContainer></ResultContainer>
      </GameCard>
    </PageContainer>
  ) : (
    <PageContainer title="Loading..." description="Loading screen">
      <LoadingScreen />
    </PageContainer>
  );
};

export default Game;
