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
import MaxRoundsSelect from "./components/MaxRoundsSelect";

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

  return (
    currentGame.id && (
      <PageContainer title={currentGame.name}>
        <GameCard
          title={currentGame.name}
          action={<MaxRoundsSelect onChange={setMaxRounds} value={maxRounds} />}
        >
          <ScoreContainer>Score</ScoreContainer>
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
