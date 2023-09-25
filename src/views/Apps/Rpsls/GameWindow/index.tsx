import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "@emotion/styled";
import PlayButtons from "./components/PlayButtons";
import ResultTable from "./components/ResultTable";
import GameActions from "./components/GameActions";
import GameTitle from "./components/GameTitle";
import FlexBox from "../../../../components/shared/FlexBox";
import { useAPI, useCurrentGame, useToken } from "../../../../hooks";
import PageContainer from "../../../../components/container/PageContainer";
import LoadingScreen from "../../../../components/shared/LoadingScreen";
import GameCard from "../../../../components/shared/GameCard";
import { GameRound, PlayerType } from "../../types";

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
    if (gameId) api.getGame(gameId);
  }, [gameId]);

  const lastRound =
    currentGame.rounds && currentGame.rounds[currentGame.rounds.length - 1];

  const opponent = currentGame.players?.find(
    (player: PlayerType) => player.id !== token.decoded?.id
  );

  return currentGame.id ? (
    <PageContainer
      title={currentGame.name}
      description="Rock Paper Scissors Lizard Spock game"
    >
      <GameCard
        title={<GameTitle />}
        action={
          <GameActions
            onMaxRoundsChange={setMaxRounds}
            maxRounds={maxRounds}
            gameId={gameId!}
            opponent={opponent!}
          />
        }
      >
        <ResultContainer>
          <ResultTable
            rounds={currentGame.rounds?.filter(
              (it: GameRound) => it.moves.length > 0
            )}
            maxRounds={maxRounds}
            players={currentGame.players}
            score={currentGame.score}
          />
        </ResultContainer>
        <PlayButtons
          id={gameId!}
          playerId={token.decoded?.id!}
          lastRound={lastRound}
          opponent={opponent}
        />
      </GameCard>
    </PageContainer>
  ) : (
    <PageContainer title="Loading..." description="Loading screen">
      <LoadingScreen />
    </PageContainer>
  );
};

export default Game;
