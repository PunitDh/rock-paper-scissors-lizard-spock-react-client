import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGame } from "src/hooks";
import { useParams } from "react-router";
import PageContainer from "src/components/container/PageContainer";
import GameCard from "src/components/shared/GameCard";
import styled from "@emotion/styled";
import { Container } from "./components/styles";
import PlayButtons from "./components/PlayButtons";
import ResultTable from "./components/ResultTable";
import GameActions from "./components/GameActions";
import { calculateScore } from "src/utils";
import { Bold } from "src/components/shared/styles";
import GameTitle from "./components/GameTitle";

const ResultContainer = styled(Container)({
  height: "75%",
  flexDirection: "column",
});

const ScoreContainer = styled(Container)({
  height: "5%",
});

const Game = () => {
  const { gameId } = useParams();
  const game = useGame();
  const [maxRounds, setMaxRounds] = useState(3);
  const { currentGame } = useSelector((state) => state.game);

  useEffect(() => {
    game.getGame({ gameId });
  }, [gameId]);

  const score = currentGame.id && calculateScore(currentGame);

  const playerScores =
    currentGame.id &&
    Object.entries(score)
      .map(([player, score]) => `${player}: ${score}`)
      .join(", ");

  return (
    currentGame.id && (
      <PageContainer title={currentGame.name}>
        <GameCard
          title={<GameTitle currentGame={currentGame} />}
          action={
            <GameActions
              onMaxRoundsChange={setMaxRounds}
              maxRounds={maxRounds}
              gameId={gameId}
            />
          }
        >
          <ScoreContainer score={score}>
            <Bold>Score:</Bold> {playerScores}
          </ScoreContainer>
          <ResultContainer>
            <ResultTable
              rounds={currentGame.rounds?.filter((it) => it.moves.length > 0)}
              maxRounds={maxRounds}
              players={currentGame.players}
            />
          </ResultContainer>
          <PlayButtons id={gameId} />
        </GameCard>
      </PageContainer>
    )
  );
};

export default Game;
